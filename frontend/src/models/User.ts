import { Message } from "models/Message";

export interface UserProps {
  id: number;
  api_key: string;
  created_at: Date;
  username: string;
  tokens_available: number;
  messages: Message[]
}

export class User {
  id: number;
  api_key: string;
  created_at: Date;
  username: string;
  tokens_available: number;
  messages: Message[]

  constructor(id: number, api_key: string, created_at: Date, username: string, tokens_available: number, messages: Message[]) {
    this.id = id;
    this.api_key = api_key;
    this.created_at = created_at;
    this.username = username;
    this.tokens_available = tokens_available;
    this.messages = messages;
  }

  resetSession() {
    this.messages = [];
  }

  static from_dict(user_dict: UserProps | null): User | null {
    if(user_dict){
      console.log(user_dict);
      return new User(
        user_dict.id,
        user_dict.api_key,
        new Date(user_dict.created_at),
        user_dict.username,
        user_dict.tokens_available,
        Message.list_from_dict(user_dict.messages)!
    );
    }else{
      return null;
    }
  }

  static from_string(user_string: string | null): User | null {
    if(user_string){
      const user_dict = JSON.parse(user_string);
      return this.from_dict(user_dict);
    }else{
      return null;
    }
  }
  
  toDict(): any {
    return {
      id: this.id,
      api_key: this.api_key,
      created_at: this.created_at.toISOString(),
      username: this.username,
      tokens_available: this.tokens_available,
      messages: this.messages
    };
  }
}
