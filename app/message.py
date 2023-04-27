from enum import Enum
import json
from pydantic import BaseModel, PrivateAttr
from typing import List, Optional
from datetime import datetime
import uuid

class Role(str, Enum):
    ASSISTANT = "assistant"
    USER = "user"

class Message(BaseModel):
    _id: Optional[str] = str(uuid.uuid4)
    role: Role
    content: str
    timestamp: Optional[str] = datetime.now().strftime("%Y/%m/%d %H:%M:%S")

    class Config:  
        use_enum_values = True

class MessageList():
    messages: List[Message]

    def __init__(self,):
        self.messages = []

    def to_gpt(self,):
        temp_messages = []
        for message in self.messages:
            dict_message = message.dict()
            dict_message.pop("timestamp")
            temp_messages.append(dict_message)
        
        return temp_messages