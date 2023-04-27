import uvicorn
from fastapi import FastAPI, Query

from openai_utils import OpenAI

app = FastAPI()

open_ai = OpenAI()

@app.get("/")
def index(message: str = Query(None, min_length=1, max_length=250)):
    response = {"success": False}
    if message:
        response = process_message(message, response)
    else:
        response["error"] = "Please, add message parameter ?message=<your message>"
    return response


def process_message(message, response):
    try:
        context = open_ai.completion(message)
        response["data"] = context
        response["success"] = True
    except Exception as ex:
        response["error"] = str(ex)
    
    return response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)

