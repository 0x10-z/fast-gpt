import os
import openai
from models import MessageList, Message, Role

message_list = MessageList()

class OpenAI:
    
    def __init__(self):
      self.openai = openai
      self.openai.organization = "org-keCQjcMENEnF0JDMPkPFs9YC"
      self.openai.api_key = os.getenv("OPENAI_API_KEY")
    
    def completion(self, content):
      message_list.messages.append(Message(role=Role.USER, content=content))
      
      try:
        openai_response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                            messages=message_list.to_gpt(),
                                            temperature=0,
                                            max_tokens=100)

        message_list.messages.append(Message(**openai_response.choices[0].message))
        
        return message_list.messages
      except openai.error.AuthenticationError as ex:
        message_list.messages.pop()
        raise ex
