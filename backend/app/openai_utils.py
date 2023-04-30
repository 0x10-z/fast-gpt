import os
import time

import openai
from fastapi import Depends

from models import Message, MessageList, Role

message_list = MessageList()


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
    def __init__(self, openai_wrapper: OpenAIWrapper = Depends(OpenAIWrapper)):
        self.openai_wrapper = openai_wrapper

    def completion(self, content):
        message_list.messages.append(Message(role=Role.USER, content=content))

        try:
            print("Request sent to OpenAI...")
            start = time.time()
            openai_response = self.retry_completion(2)
            end = time.time()
            print("Response received after {} seconds.".format(end - start))
            if openai_response:
                message_list.messages.append(
                    Message(**openai_response.choices[0].message)
                )
            else:
                raise Exception("OpenAI maximum retries exceeded. Please try again.")

            return message_list.messages
        except openai.error.AuthenticationError as ex:
            message_list.messages.pop()
            raise ex

    def retry_completion(self, retries):
        success = False
        openai_response = None
        while not success and retries > 0:
            try:
                openai_response = self.openai_wrapper.completion(message_list.to_gpt())

                success = True
            except Exception as ex:
                retries -= 1
                print(
                    "OPENAI Exception.\nAvailable Retries: {}\nError: {}".format(
                        retries, ex
                    )
                )

        return openai_response
