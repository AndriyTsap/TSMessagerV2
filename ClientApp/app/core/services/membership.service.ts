import { Http, Response, Request, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Registration } from '../domain/registration';
import { User } from '../domain/user';

@Injectable()
export class MembershipService {

    private _accountRegisterAPI: string = 'api/account/register';
    private _accountLoginAPI: string = 'token';
    private _accountLogoutAPI: string = 'api/account/logout';

    constructor(public accountService: DataService) { }

    register(newUser: Registration) {

        this.accountService.set(this._accountRegisterAPI);
        return this.accountService.post(JSON.stringify(newUser));
    }

    login(creds: User) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', creds.Username);
        urlSearchParams.append('password', creds.Password);
        let body = urlSearchParams.toString();
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.accountService.set(this._accountLoginAPI);
        return this.accountService.postForToken(body, headers);
    }

    logout() {
        this.accountService.set(this._accountLogoutAPI);
        return this.accountService.post( null, false);
    }

    isUserAuthenticated(): boolean {
        var _user  = localStorage.getItem('user');
        if (_user != null)
            return true;
        else
            return false;
    }

    getLoggedInUser(): User {
        var _user: User;

        if (this.isUserAuthenticated()) {
            var _userData = JSON.parse(localStorage.getItem('user'));
            _user = new User(_userData.Username, _userData.Password);
        }

        return _user;
    }
}