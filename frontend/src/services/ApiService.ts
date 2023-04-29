import { API_URL } from "Globals";
import { Message, Sender } from "components/Message";

export class ApiService{
  
  async chatGpt(message: string): Promise<Message> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return Message.createMessage(data.last_response, Sender.Assistant);
      } else {
        throw new Error(data.error);
      }
    } else {
      throw new Error(
        `Error sending message: ${response.status} ${response.statusText}`
      );
    }
  }

}
