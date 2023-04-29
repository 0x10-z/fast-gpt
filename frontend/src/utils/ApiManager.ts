import { API_URL } from "../Globals";
import Message from "../components/Message";

export class ApiManager{
  
  async chatGpt(message: string): Promise<Message> {
    const response = await fetch(API_URL + "?message=" + message, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ message }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return createMessage(data.last_response, "assistant");
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

function createMessage(content: string, sender: "user" | "assistant"): Message {
  return {
    id: "",
    content,
    sender,
    timestamp: new Date(),
  };
}