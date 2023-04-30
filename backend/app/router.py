from fastapi import APIRouter, Depends
from fastapi.security.api_key import APIKey
from pydantic import BaseModel

from core import VERSION
from dependencies import get_api_key
from openai_utils import OpenAI

router = APIRouter()


class Login(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(credentials: Login):
    response = {"success": False}
    if (
        credentials
        and credentials.username == "user"
        and credentials.password == "user"
    ):
        response["success"] = True
        response["token"] = 1234
    else:
        response["error"] = "Please, add message parameter ?message=<your message>"
    return response


@router.get("/version")
def version():
    return {"version": VERSION}


class ResponseMessage(BaseModel):
    message: str


@router.post("/")
def index(
    response_message: ResponseMessage,
    openai: OpenAI = Depends(OpenAI),
    api_key: APIKey = Depends(get_api_key),
):
    response = {"success": False}
    if response_message:
        response = process_message(openai, response_message.message, response)
    else:
        response["error"] = "Please, add message parameter ?message=<your message>"
    return response


def process_message(openai, message, response):
    try:
        print(openai)
        context = openai.completion(message)
        response["context"] = context
        print(context[-1].content)
        response["last_response"] = context[-1].content
        response["success"] = True
    except Exception as ex:
        response["error"] = str(ex)

    return response


@router.get("/")
def index_method_not_allowed():
    return {"detail": "Method Now Allowed", "message": "Please, use POST method"}
