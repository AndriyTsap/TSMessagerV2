export interface UsersSignalR extends SignalR {
    broadcaster: UsersProxy
}

export interface UsersProxy {
    client: UsersClient;
    server: UsersServer;
}

export interface UsersClient {
    setConnectionId: (id: string) => void;
    addUser: (user: User) => void;
    addChatMessage: (chatMessage: Message) => void;
}

export interface UsersServer {
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