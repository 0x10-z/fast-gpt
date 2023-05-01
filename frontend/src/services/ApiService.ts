import { Globals } from "Globals";
import { Message, Sender } from "components/Message";
import { User } from "models/User";
import { showErrorNotification } from "utils/utils";

export class ApiService{

  API_URL = Globals.API_URL;
  
  async chatGpt(message: string, user: User): Promise<Message> {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.api_key}`,
    });

    const response = await fetch(this.API_URL + "chatgpt", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ message: message }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        user.tokens_available = data.user.tokens_available;
        return Message.createMessage(data.last_response, Sender.Assistant);
      } else {
        showErrorNotification("El backend parece no estar funcionando...");
        throw new Error(data.error);
      }
    } else {
      switch(response.status){
        case 403:
          showErrorNotification("El API key que tienes asignado es invalido.");
          break;
        case 401:
          showErrorNotification("La cabecera con el API key es invalida.");
          break;
      }
      throw new Error(
        `Error sending message: ${response.status} ${response.statusText}`
      );
    }
  }

  async resetSession(user: User): Promise<boolean> {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.api_key}`,
    });

    const response = await fetch(this.API_URL + "reset", {
      method: "POST",
      headers: headers
    });
    if (response.ok) {
      const data = await response.json();
      return data.success;
    } else {
      switch(response.status){
        case 403:
          showErrorNotification("El API key que tienes asignado es invalido.");
          break;
        case 401:
          showErrorNotification("La cabecera con el API key es invalida.");
          break;
      }
      throw new Error(
        `Error sending message: ${response.status} ${response.statusText}`
      );
    }
  }

  async login(username: string, password: string): Promise<User | null> {
    const response = await fetch(this.API_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return User.from_dict(data.user);
      } else {
        return null;
      }
    } else {
      throw new Error(
        `Error sending message: ${response.status} ${response.statusText}`
      );
    }
  }

  async getBackendVersion(): Promise<string | null> {
    const response = await fetch(this.API_URL + "version", {
      method: "GET"
    });
    if (response.ok) {
      const data = await response.json();
      return data.version;
    } else {
      throw new Error(
        `Error sending message: ${response.status} ${response.statusText}`
      );
    }
  }

}
