import { Injectable } from '@angular/core';
declare var alertify:any 
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }
  message(message:string, options:Partial<AlertifyOptions>){
    alertify.set('notifier', 'position', options.position)
    alertify.set('notifier', 'delay', options.delay)
    const msg = alertify[options.messageType](message);
    if(options.dismissOthers)
      msg.dismissOthers();
  }
  dismiss(){
    alertify.dismissAll();
  }
  
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomRight;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum MessageType{
  Error = "error",
  Message = "message",
  Success = "success",
  Warning = "warning",
  Notify = "notify"
}

export enum Position{
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left"
}
