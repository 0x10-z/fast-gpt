export enum Sender {
  User = 'user',
  Assistant = 'assistant',
} 

export class Message {
  id: string;
  content: string;
  sender: Sender;
  timestamp: Date;

  constructor(id: string, content: string, sender: Sender, timestamp: Date) {
    this.id = id;
    this.content = content;
    this.sender = sender;
    this.timestamp = timestamp;
  }

  static createMessage(content: string, sender: Sender): Message {
    const id = generateGUID();
    const timestamp = new Date();
    return new Message(id, content, sender, timestamp);
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