import { Component, OnInit, Inject } from '@angular/core';
import { UserFull } from "../../core/domain/user-full";
import { UserService } from "../../core/services/user.service";
import { MessageService } from "../../core/services/message.service";
import { NotificationService } from "../../core/services/notification.service";
import { OperationResult } from "../../core/domain/operationResult";
import { Router } from '@angular/router';

@Component({
    selector: 'friends-search',
    templateUrl: './friends-search.component.html',
    styleUrls: ['../../css/friends.component.css']
})

export class FriendsSearchComponent {
    randomPeople: UserFull[];
    twentyOrMorePeople: boolean;
    offset: number;

    constructor( @Inject(UserService) public userService: UserService,
        public messageService: MessageService,
        public notificationService: NotificationService,
        public router: Router) {
        this.randomPeople = [];
        this.twentyOrMorePeople = false;
        this.offset = 0;
    }

    ngOnInit() {
        this.getPeople(this.offset);
    }

    search(username: string) {
        ;
        if (username == "") {
            this.randomPeople = [];
            this.getPeople(this.offset)
        }
        else {
            this.userService.search(username)
                .subscribe(res => {
                    var data = res.json();
                    this.randomPeople = [];
                    this.twentyOrMorePeople = (data.length >= 20 + this.offset);
                    data.forEach((user) => {
                        this.randomPeople.push({
                            "Id": user.id,
                            "Username": user.username,
                            "Password": "",
                            "Email": user.email,
                            "FirstName": user.firstName,
                            "LastName": user.lastName,
                            "Phone": user.phone,
                            "BirthDate": user.birthDate,
                            "Photo": user.photo,
                            "About": user.about
                        });
                    })
                })
        }
    }

    getPeople(offset: number) {
        this.userService.getAll(offset).subscribe(res => {
            var data = res.json();
            var user: any;
            this.twentyOrMorePeople = (data.length >= 20 + this.offset);
            data.forEach((user) => {
                this.randomPeople.push({
                    "Id": user.id,
                    "Username": user.username,
                    "Password": "",
                    "Email": user.email,
                    "FirstName": user.firstName,
                    "LastName": user.lastName,
                    "Phone": user.phone,
                    "BirthDate": user.birthDate,
                    "Photo": user.photo,
                    "About": user.about
                });
            })
        })
    }

    getMorePeople() {
        this.offset += 20;
        this.getPeople(this.offset)
    }

    createChat(id: number, name: string) {
        var chatName = JSON.parse(localStorage.getItem("user")).Username + "-" + name;
        this.messageService.setToken(localStorage.getItem("token"));
        let _updateResult: OperationResult = new OperationResult(false, '');
        this.messageService.createChat(id, chatName, "dialog")
            .subscribe(res => {
                _updateResult.Succeeded = true;
                _updateResult.Message = res.text.toString();
            },
            error => console.error('Error: ' + error),
            () => {
                if (_updateResult.Succeeded) {
                    this.notificationService.printSuccessMessage('Chat with ' + name + ' created!');
                    localStorage.setItem("currentChatId", _updateResult.Message)
                    this.router.navigate(['messages']);
                }
                else {
                    console.log(_updateResult.Message)
                    this.notificationService.printErrorMessage("Chat isn't created!");
                }
            });
    }
}