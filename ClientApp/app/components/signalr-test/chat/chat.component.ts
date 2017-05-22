import { Component, OnInit, Input } from '@angular/core';

import { Message, Chat } from '../../../shared/interfaces';
import { UsersService } from '../../../shared/services/users.service';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

    @Input() chats: Chat[];
    @Input() connection: string;
    messages: Message[];

    constructor(private usersService: UsersService) { }

    ngOnInit(): void {
        let self = this;

        self.usersService.addChatMessage.subscribe(
            message => {
                console.log('received..');
                console.log(message);
                if(!self.messages)
                    self.messages = new Array<Message>();
                self.messages.unshift(message);
            }
        )
    }

}