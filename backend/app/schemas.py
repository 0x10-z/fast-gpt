from pydantic import BaseModel, validator
from typing import List, Optional
import uuid
from datetime import datetime
from enum import Enum

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
        orm_mode = True


# class MessageList:
#     messages: List[Message]

#     def __init__(
#         self,
#     ):
#         self.messages = []

#     def to_gpt(
#         self,
#     ):
#         temp_messages = []
#         for message in self.messages:
#             dict_message = message.dict()
#             dict_message.pop("id")
#             dict_message.pop("timestamp")
#             temp_messages.append(dict_message)

#         return temp_messages
