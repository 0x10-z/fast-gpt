import os
import uvicorn
from typing import Union

import openai
from fastapi import FastAPI, Query

from message import Message, Role, MessageList

openai.organization = "org-keCQjcMENEnF0JDMPkPFs9YC"
openai.api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = "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"

app = FastAPI()

message_list = MessageList()

@app.get("/")
def index(message: str = Query(None, min_length=1, max_length=250)):
    response = {"detail": "Please, add message parameter ?message=<your message>"}
    if message:
        message_list.messages.append(Message(role=Role.USER, content=message))
        response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                                messages=message_list.to_gpt(),
                                                temperature=0,
                                                max_tokens=100)
        message_list.messages.append(Message(**response.choices[0].message))
        print(message_list.messages)
        
    return message_list.messages


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)

