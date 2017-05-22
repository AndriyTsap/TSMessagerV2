import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { UserFull } from "../core/domain/user-full";
import { OperationResult } from "../core/domain/operationResult";
import { UserService } from "../core/services/user.service";
import { NotificationService } from '../core/services/notification.service';
import { MembershipService } from '../core/services/membership.service';
import { Router } from '@angular/router';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../css/profile.component.css'],
})

export class ProfileComponent implements OnInit {

    @ViewChild("photo") photo;
    user: UserFull;

    constructor(public userService: UserService,
        public membershipService: MembershipService,
        public notificationService: NotificationService,
        public router: Router) {
        this.user = new UserFull(null, '', '', '', '', '', '', '', '', '');
    }

    ngOnInit() {
        this.userService.getByToken(localStorage.getItem("token"))
            .subscribe(res => {
                this.user = res.json();
            },
            error => {
                if (error.status == 401 || error.status == 404) {
                    this.notificationService.printErrorMessage('User don\'t exist');
                }
            });
    }

    addPhoto(): string {
        let photo = this.photo.nativeElement;
        if (photo.files && photo.files[0]) {
            this.userService.uploadPhoto(photo.files[0])
                .subscribe(res => {
                    if (res.status == 200) {
                        console.log("images/" + photo.files[0].name)
                    }
                },
                err => {
                    this.notificationService.printSuccessMessage('Dear ' + this.user.Username + ', your photo not upload');
                });
            return "images/" + photo.files[0].name;
        }
        return "images/";
    }

    save() {
        let _updateResult: OperationResult = new OperationResult(false, '');
        let tempPhotoPath = this.addPhoto();
        if (tempPhotoPath != "images/") {
            this.user.Photo = tempPhotoPath;
        }
        this.userService.update(localStorage.getItem("token"), this.user)
            .subscribe(res => {
                _updateResult.Succeeded = true;
                _updateResult.Message = res.text.toString();
            },
            error => console.error('Error: ' + error),
            () => {
                if (_updateResult.Succeeded) {
                    this.notificationService.printSuccessMessage('Dear ' + this.user.Username + ', your date updated');
                }
                else {
                    console.log(_updateResult.Message)
                    //this.notificationService.printErrorMessage(_updateResult.Message);
                }
            });
    }

    delete() {
        var _removeResult: OperationResult = new OperationResult(false, '');
        this.notificationService.printConfirmationDialog('Are you sure you want to delete the account?',
            () => {
                this.userService.delete(localStorage.getItem("token"))
                    .subscribe(res => {
                        _removeResult.Succeeded = res.Succeeded;
                        _removeResult.Message = res.Message;
                    },
                    error => console.error('Error: ' + error),
                    () => {
                        if (_removeResult.Succeeded) {
                            this.notificationService.printSuccessMessage('Your account removed!');
                            this.membershipService.logout()
                                .subscribe(res => {
                                    localStorage.removeItem('user');
                                    localStorage.removeItem('token');
                                },
                                error => console.error('Error: ' + error),
                                () => { });
                            this.router.navigate(['home']);
                        }
                        else {
                            this.notificationService.printErrorMessage('Failed to remove account');
                        }
                    });
            });
    }

}

