import { Http, Response, Request } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { DataService } from './data.service';
import { User } from '../domain/user';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

//import { FeedSignalR, Proxy, Client, Server, SignalRConnectionStatus, ChatR, MessageR } from '../../interfaces';

@Injectable()
export class MessageService {
    private _messagesGetAllAPI: string = 'api/messages';
    private _chatsGetAllAPI: string = 'api/messages/chats';
    private _messagesGetByChatIdAPI:string= "api/messages/getByChatId?chatId=";
    private _searchChatAPI: string = 'api/messages/chats/search?name=';
    private _createChatAPI:string ='api/messages/createChat?id='
    private _addAttachmentAPI:string ='api/attachments'
    private _token: string;
    
    //for signalR
    /*
    currentState = SignalRConnectionStatus.Disconnected;
    connectionState: Observable<SignalRConnectionStatus>;

        setConnectionId: Observable<string>;
    addChat: Observable<ChatR>;
    addMessage: Observable<MessageR>;

    private connectionStateSubject = new Subject<SignalRConnectionStatus>();
    
    private setConnectionIdSubject = new Subject<string>();
    private addChatSubject = new Subject<ChatR>();
    private addMessageSubject = new Subject<MessageR>();
    //private server: Server;
    */
    constructor(@Inject(DataService) public dataService: DataService,
                private http: Http) {
        /*this.connectionState = this.connectionStateSubject.asObservable();

        this.setConnectionId = this.setConnectionIdSubject.asObservable();
        this.addChat = this.addChatSubject.asObservable();
        this.addMessage = this.addMessageSubject.asObservable();*/
    
    }


    public setToken(token: string){
        this._token = token;
    }

    public send(text:string, ChatId:number){
        this.dataService.set(this._messagesGetAllAPI);
        return this.dataService.postAuthenticate(this._token,{text, ChatId });    
    }

    public createChat(id:number,name:string,type:string){
        this.dataService.set(this._createChatAPI+id+"&name="+name+"&type="+type);
        return this.dataService.postAuthenticate(this._token);
    }

    public getChats(offset:number){
        this.dataService.set(this._chatsGetAllAPI+"?offset="+offset);
        return this.dataService.getAuthenticate(this._token);
    }

    public searchChat(username:string){
        this.dataService.set(this._searchChatAPI+username);
        return this.dataService.getAuthenticate(this._token);
    }

    public getMessageByChatId(id:number,offset:number){
        this.dataService.set(this._messagesGetByChatIdAPI+id+"&offset="+offset);
        return this.dataService.getAuthenticate(this._token);
    }

     public uploadFile(file: any){
        this.dataService.set(this._addAttachmentAPI);
        return this.dataService.upload(file); 
    }
    /*
    //for signalR
    
    
    start(debug: boolean): Observable<SignalRConnectionStatus> {

        $.connection.hub.logging = debug;
        
        let connection = <FeedSignalR>$.connection;
        // reference signalR hub named 'broadcaster'
        let feedHub = connection.broadcaster;
        //this.server = feedHub.server;

        // setConnectionId method called by server
        feedHub.client.setConnectionId = id => this.onSetConnectionId(id);

        // updateMatch method called by server
        feedHub.client.addChat = chat => this.onAddChat(chat);

        feedHub.client.addMessage = message => this.onAddMessage(message);

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

    private onAddChat(chat: ChatR) {
        this.addChatSubject.next(chat);
    }

    private onAddMessage(message: MessageR) {
        this.addMessageSubject.next(message);
    }
    /*
    // Server side methods /don't know ho to use
    public subscribeToFeed(matchId: number) {
        this.server.subscribe(matchId);
    }
    /*don't need
    public unsubscribeFromFeed(matchId: number) {
        this.server.unsubscribe(matchId);
    }
    */

    

}