import { Component, OnInit, Inject } from '@angular/core';
import { UserFull } from "../../core/domain/user-full";
import { UserService } from "../../core/services/user.service";
import { Router } from '@angular/router';

@Component({
    selector: 'friends',
    templateUrl: './friends.component.html',
    styleUrls: ['../../css/friends.component.css']
})

export class FriendsComponent {
    friends: UserFull[];
    twentyOrMoreFriends: boolean;
    offset: number;
    constructor( @Inject(UserService) public userService: UserService,
        public router: Router) {
        this.friends = []
        this.twentyOrMoreFriends = false;
        this.offset = 0;
    }

    ngOnInit() {
        this.getFriends(this.offset);
    }

    getFriends(offset: number) {
        this.userService.getFriends(localStorage.getItem("token"), offset)
            .subscribe(res => {
                var data = res.json();
                this.twentyOrMoreFriends = (data.length >= 20);
                data.forEach((user) => {
                    this.friends.push({
                        "Id": user.id,
                        "Username": user.username,
                        "Password": "",
                        "Email": user.email,
                        "FirstName": user.firstName,
                        "LastName": user.lastName,
                        "Phone": user.phone,
                        "BirthDate": user.birthDate,
                        "Photo":  user.photo,
                        "About": user.about
                    });
                })
                this.friends.reverse();
            })
    }

    search(username: string) {
        if (username == "") {
            this.friends = [];
            this.getFriends(this.offset)
        }
        else {
            this.userService.searchFriends(username, localStorage.getItem("token")).subscribe(res => {
                var data = res.json();
                this.friends = [];
                this.twentyOrMoreFriends = (data.length >= 20);
                data.forEach((user) => {
                    this.friends.push({
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
                this.friends.reverse();
            })
        }
    }

    getMoreFriends() {
        this.offset += 20;
        this.getFriends(this.offset)
    }

    goToChat(id: number) {
        if (localStorage.getItem("currentChatId")) {
            this.router.navigate(['messages']);
        }
    }
}