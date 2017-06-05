import { Component, OnInit, Input } from '@angular/core';

import { Message, Chat } from '../../../core/interfaces';
import { FeedService } from '../../../core/services/feed.service';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

    @Input() chats: Chat[];
    @Input() connection: string;
    messages: Message[];

    constructor(private feedService: FeedService) { }

    ngOnInit(): void {
        let self = this;

        self.feedService.addChatMessage.subscribe(
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