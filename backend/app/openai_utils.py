import os
import time

import openai
from fastapi import Depends
from sqlalchemy.orm import Session
from dependencies import get_db
from models import User

class OpenAIWrapper:
    def __init__(
        self,
    ):
        self.openai = openai
        self.openai.organization = "org-keCQjcMENEnF0JDMPkPFs9YC"
        self.openai.api_key = os.getenv("OPENAI_API_KEY")
        self.max_tokens = int(os.getenv("MAX_TOKENS", 1000))

    def completion(self, messages):
        return openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0,
            max_tokens=self.max_tokens,
        )


class OpenAI:
    def __init__(self, openai_wrapper: OpenAIWrapper = Depends(OpenAIWrapper), db: Session = Depends(get_db)):
        self.openai_wrapper = openai_wrapper
        self.db = db

    def completion(self, user: User, content):
        user.user_write(self.db, content)
        try:
            print("Request sent to OpenAI...")
            start = time.time()
            openai_response = self.retry_completion(user, 2)
            end = time.time()
            print("Response received after {} seconds.".format(end - start))
            if openai_response:
                user.assistant_write(self.db, openai_response.choices[0].message["content"])
            else:
                raise Exception("OpenAI maximum retries exceeded. Please try again.")

            return user.messages_2_dict()
        except openai.error.AuthenticationError as ex:
            user.delete_last_message()
            raise ex

    def retry_completion(self, user, retries):
        success = False
        openai_response = None
        while not success and retries > 0:
            try:
                openai_response = self.openai_wrapper.completion(user.messages_to_gpt())

                success = True
            except Exception as ex:
                retries -= 1
                print(
                    "OPENAI Exception.\nAvailable Retries: {}\nError: {}".format(
                        retries, ex
                    )
                )

        return openai_response
