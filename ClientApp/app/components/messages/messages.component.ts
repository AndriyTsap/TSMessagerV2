import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from '../../core/services/message.service';
import { UserService } from '../../core/services/user.service';
import { NotificationService } from '../../core/services/notification.service';
import { OperationResult } from "../../core/domain/operationResult";
import { Message } from "../../core/domain/message";
import { Chat } from "../../core/domain/chat";
//import { SignalRConnectionStatus, MessageR, ChatR } from './../../core/interfaces';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['../../css/messages.component.css'],
})

export class MessagesComponent {
    @ViewChild('scrollChat') private chatScrollContainer: ElementRef;
    @ViewChild("attachment") private attachment;
    imageFormats = "jpg, jpeg, png,gif";
    musicFormats = "mp3, ogg, wav";
    videoFormats = "mp4, webm, avi, 3gp";
    chats: Chat[];
    messages: Message[];
    currentChatId: number;
    messageOffset: number;
    chatOffset: number;
    cleanVar: string = "";

    //subscribed: boolean;
    //connectionId: string;

    constructor(public messageService: MessageService,
        public userService: UserService,
        public notificationService: NotificationService) {
        this.chats = [];
        this.messages = [];
        this.messageOffset = 0;
        this.currentChatId = +localStorage.getItem("currentChatId");
        this.chatOffset = 0;
    }

    ngOnInit() {
        this.messageService.setToken(localStorage.getItem("token"));
        this.getChats();
        //for signalR

        /*
       this.messageService.start(true).subscribe(
           null,
           error => console.log('Error on init: ' + error));
   
       //
       this.listenForConnection();

      
       this.messageService.connectionState
           .subscribe(
           connectionState => {
               if (connectionState == SignalRConnectionStatus.Connected) {
                   console.log('Connected!');
                   //self.getChats();
               } else {
                   console.log(connectionState.toString());
               }
           },
           error => {
               console.log(error);
           });*/
        //    
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.chatScrollContainer.nativeElement.scrollTop = 10000000000;//this.chatScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    getChats() {
        this.messageService.getChats(this.chatOffset)
            .subscribe(res => {
                this.chats = res.json();
                console.log(this.chats[0].id);
                console.log(res.json());
                this.getMessage(this.chats[0].id);
            },
            error => {
                if (error.status == 401 || error.status == 404) {
                    console.log(error)
                }
            });
    }

    getMessage(currentChatId: number) {
        this.messages = [];
        this.messageService.getMessageByChatId(currentChatId, this.messageOffset)
            .subscribe(res => {
                let data = res.json();
                let theSameSenderInLine = false;
                this.messages.push({
                    Id: data[0].id,
                    ChatId: data[0].chatId,
                    Date: data[0].date,
                    SenderId: data[0].senderId,
                    Text: (!data[0].text.includes("/#/")) ? data[0].Text : this.parse(data[0].Text),
                    SenderFirstName: data[0].firstName,
                    SenderLastName: data[0].lastName,
                    Photo: data[0].photo
                });
                for (let i = 1; i < data.length; i++) {
                    theSameSenderInLine = (data[i - 1].SenderId == data[i].SenderId);
                    this.messages.push({
                        Id: data[i].id,
                        ChatId: data[i].chatId,
                        Date: theSameSenderInLine ? null : data[i].date,
                        SenderId: data[i].senderId,
                        Text: (!data[i].text.includes("/#/")) ? data[i].text : this.parse(data[i].text),
                        SenderFirstName: theSameSenderInLine ? null : data[i].firstName,
                        SenderLastName: theSameSenderInLine ? null : data[i].lastName,
                        Photo: theSameSenderInLine ? null : data[i].photo
                    })
                }
            },
            error => {
                if (error.status == 401 || error.status == 404) {
                    console.log(error)
                }
            });

    }

    searchChat(name: string) {
        if (name != "") {
            this.messageService.searchChat(name)
                .subscribe(res => {
                    this.chats = res.json();
                })
        }
        else {
            this.getChats()
        }

    }

    sendMessage(newMessage: string) {
        let pathToAttachment = this.addAttachment();
        if (pathToAttachment) {
            newMessage += "/#/" + pathToAttachment;
        }
        if (newMessage.length >= 1 && newMessage != " ") {
            var _sendResult: OperationResult = new OperationResult(false, '');
            this.messageService.send(newMessage, +this.currentChatId)
                .subscribe(res => {
                    _sendResult.Succeeded = true;
                    _sendResult.Message = res.text.toString();

                    if (_sendResult.Succeeded) {
                        this.getMessage(this.currentChatId)
                        this.cleanVar = " ";
                    }
                    else {
                        console.log(_sendResult.Message)
                        this.notificationService.printErrorMessage(_sendResult.Message);
                    }
                },
                error => console.error('Error: ' + error));
            this.cleanVar = " ";
        }
    }

    getMoreMessages() {
        this.messageOffset += 20;
        this.getMessage(this.currentChatId);
    }
    getMoreChats() {
        this.chatOffset += 20;
        this.getChats();
    }

    onSelect(chatId: number) {
        this.currentChatId = chatId;
    }

    addAttachment(): string {
        let attachment = this.attachment.nativeElement;
        if (attachment.files && attachment.files[0]) {
            this.messageService.uploadFile(attachment.files[0])
                .subscribe(res => { },
                err => {
                    this.notificationService.printSuccessMessage('Dear ' + "" + ', your photo not upload');
                });
            return "attachments/" + attachment.files[0].size + "!!!" + attachment.files[0].name;
        }
    }

    parse(message: string) {
        let splitedMessage = message.split("/#/");
        let output = "";
        if (splitedMessage[0]) {
            output += "<span>" + splitedMessage[0] + "</span><br>";
        }
        let format = splitedMessage[1].substr(splitedMessage[1].length - 5).split(".")[1];
        console.log()
        if (this.imageFormats.includes(format.toLowerCase())) {
            output += "<a class='fancybox' rel='gallery' href='" + splitedMessage[1] + "'>" +
                "<img class='img-responsive thumbnail' src='" + splitedMessage[1] + "'></a>";
        } else if (this.musicFormats.includes(format.toLowerCase())) {

            output += "<span>" + splitedMessage[1].split("!!!")[1] + "</span><br>" +
                "<audio style='width:100%'  controls>" +
                "<source src='" + splitedMessage[1] + "'></audio>";
        }
        else if (this.videoFormats.includes(format.toLowerCase())) {

            output += "<span>" + splitedMessage[1].split("!!!")[1] + "</span><br>" +
                "<video width='100%' controls>" +
                "<source src='" + splitedMessage[1] + "'></video>";
        }
        else {
            output += " <a href='" + splitedMessage[1] + "' download>" + splitedMessage[1].split("!!!")[1] + "</a>";
        }
        return output
    }

    updateMessage() {
        this.getMessage(this.currentChatId);
    }

    /*
    //for signalR
    listenForConnection() {
        // Listen for connected / disconnected events
        this.messageService.setConnectionId.subscribe(
            id => {
                console.log(id);
                this.connectionId = id;
            }
        );
    }

    listenForMessages(){//only in console
        this.messageService.addMessage.subscribe(
            message => {
                console.log('received message..');
                console.log(message);
                //update view
            }
        )
    }

    listenForChats(){//only in console
        this.messageService.addChat.subscribe(
            chat => {
                console.log('received chat..');
                console.log(chat);
                //update view
            }
        )
    }*/
}