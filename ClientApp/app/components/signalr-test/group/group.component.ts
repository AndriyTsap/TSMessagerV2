import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Message, Chat } from '../../../shared/interfaces';
import { UsersService } from '../../../shared/services/users.service';
import { DataServiceSR } from '../../../shared/services/data.service';

@Component({
    selector: 'group',
    templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {

    @Input() chat: Chat;
    @Output() updateSubscription = new EventEmitter();
    subscribed: boolean;
    chatMessage: string = '';

    constructor(private dataService: DataServiceSR) { }

    ngOnInit() { }

    setSubscription(val: boolean) {
        this.subscribed = val;
        let subscription =
            {
                subscribe: val,
                chatId: this.chat.id
            }
        
        console.log(subscription);

        this.updateSubscription.emit(subscription);
    }

    addChatMessage(userId: number) {
        let self = this;
        let messageToSend: Message = {
            Id: self.chat.id + userId + (new Date(Date.now())).getTime(),
            ChatId: self.chat.id,
            Text: self.chatMessage,
            Date: (new Date(Date.now())).toString(),
            SenderId: userId
        };

        this.dataService.addChatMessage(messageToSend)
            .subscribe(() => {
                // Nothing to do here
                // Since is subscribed, caller will also receive the message
                console.log('message sent..');
            },
            error => {
                console.log(error);
            });

        self.chatMessage = '';
    }
}