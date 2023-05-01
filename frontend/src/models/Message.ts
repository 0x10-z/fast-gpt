export enum Sender {
  User = 'user',
  Assistant = 'assistant',
} 

export interface MessageProps {
  id: string;
  content: string;
  role: Sender;
  timestamp: Date;
}

export class Message {
  id: string;
  content: string;
  role: Sender;
  timestamp: Date;

  constructor(id: string, content: string, role: Sender, timestamp: Date) {
    this.id = id;
    this.content = content;
    this.role = role;
    this.timestamp = timestamp;
  }

  static createMessage(content: string, role: Sender): Message {
    const id = generateGUID();
    const timestamp = new Date();
    return new Message(id, content, role, timestamp);
  }

  static list_from_dict(messages_dict: MessageProps[] |null): Message[] | null {
    if (messages_dict){
      const messages: Message[] = [];
      const messages_list = messages_dict;
      for (const message of messages_list) {
        messages.push(this.from_dict(message)!)
      }
      return messages;
    }else{
      return null;
    }
  }

  static from_dict(message_dict: MessageProps | null): Message | null {
    if(message_dict){
      return new Message(
        message_dict.id,
        message_dict.content,
        message_dict.role,
        message_dict.timestamp
    );
    }else{
      return null;
    }
  }
}

/* eslint-disable no-mixed-operators */

function generateGUID() {
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
    d += performance.now();
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c==='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}