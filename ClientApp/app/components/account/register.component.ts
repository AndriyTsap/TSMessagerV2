﻿import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Registration } from '../../core/domain/registration';
import { OperationResult } from '../../core/domain/operationResult';
import { MembershipService } from '../../core/services/membership.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
    selector: 'register',
    providers: [MembershipService, NotificationService],
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    private _newUser: Registration;

    constructor(public membershipService: MembershipService,
                public notificationService: NotificationService,
                public router: Router) { }

    ngOnInit() {
        this._newUser = new Registration('', '', '');
    }

    register(): void {
        var _registrationResult: OperationResult = new OperationResult(false, '');
        this.membershipService.register(this._newUser)
            .subscribe(res => {
                _registrationResult.Succeeded = true;
                //_registrationResult.Message = res.text.toString(); розкоментувати при закінченні з signalR
                

            },
            error => console.error('Error: ' + error),
            () => {
                if (_registrationResult.Succeeded) {
                    this.notificationService.printSuccessMessage('Dear ' + this._newUser.Username + ' your registration was successful, please login with your credentials');
                    this.router.navigate(['account/login']);
                }
                else {
                    this.notificationService.printErrorMessage(_registrationResult.Message);
                }
            });
        };
}