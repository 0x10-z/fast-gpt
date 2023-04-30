import { Globals } from "Globals";
import { Message, Sender } from "components/Message";
import { showErrorNotification } from "utils/utils";

export class ApiService{

  API_URL = Globals.API_URL;
  
  async chatGpt(message: string, userToken: string): Promise<Message> {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    });

    const response = await fetch(this.API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ message: message }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
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

  async login(username: string, password: string): Promise<string | null> {
    const response = await fetch(this.API_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return data.token;
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
