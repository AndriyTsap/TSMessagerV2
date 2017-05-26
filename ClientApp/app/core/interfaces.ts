export interface FeedSignalR extends SignalR {
    broadcaster: FeedProxy
}

export interface FeedProxy {
    client: FeedClient;
    server: FeedServer;
}

export interface FeedClient {
    setConnectionId: (id: string) => void;
    addUser: (user: User) => void;
    addChatMessage: (chatMessage: Message) => void;
}

export interface FeedServer {
    subscribe(chatId: number): void;
    unsubscribe(chatId: number): void;
}

export enum SignalRConnectionStatus {
    Connected = 1,
    Disconnected = 2,
    Error = 3
}

/* LiveGameFeed related interfaces */
export interface Chat {
    id: number;
    name: string;
    dateCreated: string;
    type: string;
    users: User[];
}

export interface User {
    Id: number;
    Username: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Phone: string;
    BirthDate: string;
    IsLocked: boolean;
    DateCreated: Date;
    Photo: string;
    About: string;
    ChatUsers: ChatUser[];
}

export interface ChatUser {
    Id: number;
    UserId: number;
    ChatId: number;
}

export interface Message {
    Id: number;
    Text: string;
    Date: string;
    ChatId: number;
    SenderId: number;
}