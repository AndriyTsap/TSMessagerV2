export class  Message {
    Id:number;
    ChatId:number;
    Date: string;
    SenderId:number;
    Text:string;
    SenderFirstName: string;
    SenderLastName:string;
    Photo:string;
    constructor(id:number, chatId:number, date:string, senderId:number, text:string, senderFirstName:string,
      senderLastName:string, senderPhoto:string) {
        this.Id=id;
        this.ChatId=chatId;
        this.Date=date;
        this.SenderId=senderId;
        this.Text=text,
        this.SenderFirstName=senderFirstName
        this.SenderLastName=senderLastName;
        this.Photo=senderPhoto;
    }
}