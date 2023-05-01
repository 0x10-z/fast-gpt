import binascii
import enum
import hashlib
import os
import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Session, relationship
from sqlalchemy.types import Enum

from database import Base


def generate_uuid():
    return str(uuid.uuid4())


class Role(enum.Enum):
    ASSISTANT = "assistant"
    USER = "user"

    def __str__(self):
        return str(self.value)


class Message(Base):
    __tablename__ = "messages"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(Integer, ForeignKey("users.id"))
    role = Column(Enum(Role))
    content = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow())
    # user = relationship("User", back_populates="messages")

    def __init__(
        self,
        role: Role,
        content: str,
        timestamp: datetime = None,
    ):
        self.role = role
        self.content = content
        self.timestamp = timestamp or datetime.utcnow()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(128), nullable=False)
    api_key = Column(String(36), unique=True, index=True, default=generate_uuid)
    tokens_available = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login_at = Column(DateTime, default=None)

    messages = relationship("Message", backref="user")

    def messages_2_dict(
        self,
    ):
        messages_dict = []
        for message in self.messages:
            message_dict = {
                "id": message.id,
                "role": str(message.role),
                "content": message.content,
                "timestamp": message.timestamp.strftime("%m/%d/%Y, %H:%M:%S"),
            }
            messages_dict.append(message_dict)

        return messages_dict

    def messages_to_gpt(
        self,
    ):
        temp_messages = []
        for message in self.messages:
            temp_messages.append(
                {"content": message.content, "role": str(message.role)}
            )

        return temp_messages

    def delete_last_message(self, db: Session):
        self.messages.pop()
        db.commit()

    def reset_session(self, db: Session):
        db.query(Message).filter(Message.user_id == self.id).delete()
        db.commit()

    def user_write(self, db: Session, content: str):
        message = Message(Role.USER, content=content)
        self.messages.append(message)
        db.commit()

    def delete_duplicates(self, db: Session):
        query = (
            db.query(Message.content, func.count(Message.content))
            .group_by(Message.content)
            .having(func.count(Message.content) > 1)
            .subquery()
        )

        to_delete = (
            db.query(Message)
            .join(User)
            .filter(Message.content == query.c.content)
            .filter(User.id == self.id)  # supongamos que el usuario es el de id=1
            .order_by(Message.timestamp.desc())  # seleccionar el mensaje más reciente
            .offset(1)  # saltar el primer mensaje (el más reciente)
            .all()
        )

        for message in to_delete:
            db.delete(message)

        db.commit()

    def assistant_write(self, db: Session, content: str):
        try:
            message = Message(Role.ASSISTANT, content=content)
            self.messages.append(message)
            db.commit()
        except Exception as ex:
            print("Error persisting information: {}".format(ex))

    def to_sanitized_dict(self):
        return {
            "id": self.id,
            "api_key": self.api_key,
            "created_at": self.created_at,
            "username": self.username,
            "tokens_available": self.tokens_available,
            "messages": self.messages,
        }

    def subtract_tokens(self, db: Session, message_length):
        success = False
        if self.tokens_available > message_length:
            success = True
            self.tokens_available = round(self.tokens_available - message_length, 2)
            self.last_used_at = datetime.now()
            db.commit()
        return success

    @classmethod
    def authenticate(cls, db: Session, username: str, password: str):
        user = db.query(cls).filter(cls.username == username).first()
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        user.last_login_at = datetime.now()
        db.commit()
        return user

    @classmethod
    def exists(cls, db: Session) -> bool:
        return db.query(cls).first() is not None

    @staticmethod
    def create_user(db: Session, username: str, password: str, tokens_available: int):
        hashed_password = get_password_hash(password)
        user = User(
            username=username,
            hashed_password=hashed_password,
            tokens_available=tokens_available,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user


def get_password_hash(password: str) -> str:
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode("ascii")
    pwdhash = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode("ascii")


def verify_password(password: str, hashed_password: str) -> bool:
    salt = hashed_password[:64]
    stored_password = hashed_password[64:]
    pwdhash = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt.encode("ascii"), 100000
    )
    pwdhash = binascii.hexlify(pwdhash).decode("ascii")
    return pwdhash == stored_password


def create_initial_users(db: Session):
    if not User.exists(db):
        User.create_user(
            db, username="user", password="user", tokens_available=1000000
        ),
        User.create_user(
            db, username="linkedin", password="chatgpt", tokens_available=1000
        ),
        print("Initial users created.")
    else:
        print("There are users in the database, initial users not created.")
