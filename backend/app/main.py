import os

import uvicorn
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security.api_key import APIKey
from pydantic import BaseModel

import auth
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


class Login(BaseModel):
    user: str
    password: str


class ResponseMessage(BaseModel):
    message: str


@app.post("/login")
def login(credentials: Login):
    response = {"success": False}
    if credentials and credentials.user == "user" and credentials.password == "user":
        response["success"] = True
        response["token"] = 1234
    else:
        response["error"] = "Please, add message parameter ?message=<your message>"
    return response


@app.post("/")
def index(
    response_message: ResponseMessage,
    openai: OpenAI = Depends(OpenAI),
    api_key: APIKey = Depends(auth.get_api_key),
):
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
