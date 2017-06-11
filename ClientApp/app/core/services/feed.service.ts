import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { FeedSignalR, FeedProxy, FeedClient, FeedServer, SignalRConnectionStatus, Message, Chat, User } from '../interfaces';

@Injectable()
export class FeedService {
    imageFormats = "jpg, jpeg, png,gif";
    musicFormats = "mp3, ogg, wav";
    videoFormats = "mp4, webm, avi, 3gp";

    currentState = SignalRConnectionStatus.Disconnected;
    connectionState: Observable<SignalRConnectionStatus>;

    setConnectionId: Observable<string>;
    addUser: Observable<User>;
    addChatMessage: Observable<Message>;

    private connectionStateSubject = new Subject<SignalRConnectionStatus>();
    
    private setConnectionIdSubject = new Subject<string>();
    private addUserSubject = new Subject<User>();
    private addChatMessageSubject = new Subject<Message>();

    private server: FeedServer;

    constructor(private http: Http) {
        this.connectionState = this.connectionStateSubject.asObservable();
        this.setConnectionId = this.setConnectionIdSubject.asObservable();
        this.addUser = this.addUserSubject.asObservable();
        this.addChatMessage = this.addChatMessageSubject.asObservable();
    }

    start(debug: boolean): Observable<SignalRConnectionStatus> {

        $.connection.hub.logging = debug;
        
        let connection = <FeedSignalR>$.connection;

        // reference signalR hub named 'broadcaster'
        let hub = connection.broadcaster;
        this.server = hub.server;

        // setConnectionId method called by server
        hub.client.setConnectionId = id => this.onSetConnectionId(id);

        // addFeed method called by server
        hub.client.addUser = user => this.onAddUser(user);

        hub.client.addChatMessage = chatMessage => this.onAddChatMessage(chatMessage);

        // start the connection
        $.connection.hub.start()
            .done(response => this.setConnectionState(SignalRConnectionStatus.Connected))
            .fail(error => this.connectionStateSubject.error(error));

        return this.connectionState;
    }

    private setConnectionState(connectionState: SignalRConnectionStatus) {
        console.log('connection state changed to: ' + connectionState);
        this.currentState = connectionState;
        this.connectionStateSubject.next(connectionState);
    }

    // Client side methods
    private onSetConnectionId(id: string) {
        this.setConnectionIdSubject.next(id);
    }

    private onAddUser(user: User) {
        console.log(user);
        this.addUserSubject.next(user);
    }

    private onAddChatMessage(chatMessage: Message) {
        let newChatMessage= chatMessage;
        newChatMessage.Text= this.parse(chatMessage.Text);
        this.addChatMessageSubject.next(chatMessage);
    }

    // Server side methods
    public subscribeToChat(chatId: number) {
        this.server.subscribe(chatId);
    }

    public unsubscribeFromChat(chatId: number) {
        this.server.unsubscribe(chatId);
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

}