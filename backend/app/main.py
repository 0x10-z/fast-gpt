import os

import uvicorn
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from openai_utils import OpenAI

app = FastAPI()

origins = [
    os.getenv("CORS_ORIGINS"),
]

print("ORIGINS: {}".format(origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ResponseMessage(BaseModel):
    message: str


@app.post("/")
def index(response_message: ResponseMessage, openai: OpenAI = Depends(OpenAI)):
    response = {"success": False}
    if response_message:
        response = process_message(openai, response_message.message, response)
    else:
        response["error"] = "Please, add message parameter ?message=<your message>"
    return response

@app.get("/")
def index_method_not_allowed():
    return {"detail": "Method Now Allowed", "message": "Please, use POST method"}

def process_message(openai, message, response):
    try:
        context = openai.completion(message)
        response["context"] = context
        print(context[-1].content)
        response["last_response"] = context[-1].content
        response["success"] = True
    except Exception as ex:
        response["error"] = str(ex)

    return response


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)
