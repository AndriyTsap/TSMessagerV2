import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../shared/services/users.service';
import { Chat, User } from '../../shared/interfaces';
import { DataServiceSR } from '../../shared/services/data.service';
import { SignalRConnectionStatus } from '../../shared/interfaces';

@Component({
    selector: 'signalr-test',
    templateUrl: './signalr-test.component.html'
})
export class SignalRTestComponent implements OnInit {

    chats: Chat[];
    connectionId: string;
    error: any;

    constructor(private dataService: DataServiceSR,
        private usersService: UsersService) { }

    ngOnInit(): void {
        let self = this;

        self.listenForConnection();

        this.usersService.start(true).subscribe(
            null,
            error => console.log('Error on init: ' + error));

        self.usersService.connectionState
            .subscribe(
            connectionState => {
                if (connectionState == SignalRConnectionStatus.Connected) {
                    console.log('Connected!');
                    self.loadChats();
                } else {
                    console.log(connectionState.toString());
                }
            },
            error => {
                this.error = error;
                console.log(error);
            })
    }

    loadChats(): void {
        let self = this;
        this.dataService.getChats()
            .subscribe((res: Chat[]) => {
                self.chats = res;
                
                console.log(res);

                // Listen for subscribed feed updates..
                self.usersService.addUser.subscribe(
                    user => {
                        console.log(user);
                        for (var i = 0; i < self.chats.length; i++) {
                            if (user.ChatUsers.map(cu => cu.ChatId).includes(self.chats[i].id)) {
                                if (!self.chats[i].users) {
                                    self.chats[i].users = new Array<User>();
                                }
                                self.chats[i].users.unshift(user);
                            }
                        }
                    }
                );
            },
            error => {
                console.log(error);
            });
    }

    listenForConnection() {
        let self = this;
        // Listen for connected / disconnected events
        self.usersService.setConnectionId.subscribe(
            id => {
                console.log(id);
                self.connectionId = id;
            }
        );
    }

    updateSubscription(subscription: any) {
        if (<boolean>subscription.subscribe === true)
            this.usersService.subscribeToChat(<number>subscription.chatId);
        else
            this.usersService.unsubscribeFromChat(<number>subscription.chatId);
    }

}
