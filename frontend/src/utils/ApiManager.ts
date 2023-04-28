import { API_URL } from "../Globals";

export class ApiManager{
  
  async chatGpt(message: string): Promise<Response> {
    return await fetch(API_URL + "?message=" + message, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ message }),
    });
  }

}
