import uuid
from datetime import datetime
from enum import Enum
from typing import List, Optional
from datetime import datetime
import os
from pydantic import BaseModel, validator
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import hashlib
from database import Base
import binascii

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(128), nullable=False)
    api_key = Column(String(36), unique=True, index=True, default=generate_uuid)
    tokens_available = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login_at = Column(DateTime, default=None)

    def reset_session(self, db: Session):
        pass
    
    def to_sanitized_dict(self):
        return {
            "id": self.id,
            "api_key": self.api_key,
            "created_at": self.created_at,
            "username": self.username,
            "tokens_available": self.tokens_available
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
        user = User(username=username, hashed_password=hashed_password, tokens_available=tokens_available)
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
    pwdhash = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("ascii"), 100000)
    pwdhash = binascii.hexlify(pwdhash).decode("ascii")
    return pwdhash == stored_password

class Role(str, Enum):
    ASSISTANT = "assistant"
    USER = "user"


class Message(BaseModel):
    id: Optional[str]
    role: Role
    content: str
    timestamp: Optional[str]

    @validator("id", pre=True, always=True)
    def default_id(cls, value):
        return value or str(uuid.uuid4())

    @validator("timestamp", pre=True, always=True)
    def default_timestamp(cls, value):
        return value or datetime.now().strftime("%Y/%m/%d %H:%M:%S")

    class Config:
        use_enum_values = True


class MessageList:
    messages: List[Message]

    def __init__(
        self,
    ):
        self.messages = []

    def to_gpt(
        self,
    ):
        temp_messages = []
        for message in self.messages:
            dict_message = message.dict()
            dict_message.pop("id")
            dict_message.pop("timestamp")
            temp_messages.append(dict_message)

        return temp_messages

def create_initial_users(db: Session):
    if not User.exists(db):
        User.create_user(db, username="user", password="user", tokens_available=1000000),
        User.create_user(db, username="linkedin", password="chatgpt", tokens_available=1000),
        print("Initial users created.")
    else:
        print("There are users in the database, initial users not created.")