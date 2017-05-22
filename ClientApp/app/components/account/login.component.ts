import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/domain/user';
import { OperationResult } from '../../core/domain/operationResult';
import { MembershipService } from '../../core/services/membership.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
    selector: 'albums',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    private _user: User;

    constructor(public membershipService: MembershipService,
                public notificationService: NotificationService,
                public router: Router) { }

    ngOnInit() {
        this._user = new User('', '');
    }

    login() {
        this.membershipService.login(this._user)
            .then(data => { this.storeJWT(data);},
                err => { this.notificationService.printErrorMessage("Invalid username or password!");})
    }

    storeJWT(data: any) {
        let token=JSON.parse(data);
        localStorage.setItem('token', token.access_token);
        localStorage.setItem('user', JSON.stringify(this._user));
        this.notificationService.printSuccessMessage('Welcome back ' + this._user.Username + '!');
        this.router.navigate(['home']);
    }
}