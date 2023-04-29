import uvicorn
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from openai_utils import OpenAI

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

open_ai = OpenAI()

class ResponseMessage(BaseModel):
    message: str

@app.post("/")
def index(response_message: ResponseMessage):
    response = {"success": False}
    if response_message:
        response = process_message(response_message.message, response)
    else:
        response["error"] = "Please, add message parameter ?message=<your message>"
    return response


def process_message(message, response):
    try:
        context = open_ai.completion(message)
        response["context"] = context
        print(context[-1].content)
        response["last_response"] = context[-1].content
        response["success"] = True
    except Exception as ex:
        response["error"] = str(ex)
    
    return response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)

