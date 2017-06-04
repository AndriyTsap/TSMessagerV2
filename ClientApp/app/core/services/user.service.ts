import { Http, Response, Request } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { DataService } from './data.service';
import { User } from '../domain/user';
import { UserFull } from '../domain/user-full';

@Injectable()
export class UserService {
    private _userGetAllAPI: string = 'api/user?offset=';
    private _userGetByIdAPI: string = 'api/user/getById?id=';
    private _userGetByTokenAPI: string = 'api/user/getByToken';
    private _userDelete: string = 'api/user/delete';
    private _friendsGetAPI: string = 'api/user/friends?offset=';
    private _userEditPersonalDataAPI: string = 'api/user/editPersonalData';
    private _searchAPI: string = 'api/user/search?username=';
    private _searchFriendsAPI: string = 'api/user/friend/search?username=';
    private _checkOnFriendshipAPI: string = 'api/user/checkOnFriendship?id=';
    private _uploadPhotoAPI: string = "api/photos/upload";


    constructor( @Inject(DataService) public dataService: DataService) { }

    public getAll(offset: number) {
        this.dataService.set(this._userGetAllAPI + offset);
        return this.dataService.get();
    }

    public getFriends(token: string, offset: number) {
        this.dataService.set(this._friendsGetAPI + offset);
        return this.dataService.getAuthenticate(token)
    }

    public getById(id: number) {

        this.dataService.set(this._userGetByIdAPI + id);
        return this.dataService.get();;
    }

    public getByToken(token: string) {
        this.dataService.set(this._userGetByTokenAPI);
        return this.dataService.getAuthenticate(token);
    }

    public update(token: string, user: UserFull) {

        this.dataService.set(this._userEditPersonalDataAPI);
        return this.dataService.putAuthenticate(token, user);;
    }

    public delete(token: string) {

        this.dataService.set(this._userDelete);
        return this.dataService.delete(token);
    }

    public uploadPhoto(photo: any) {
        this.dataService.set(this._uploadPhotoAPI);
        return this.dataService.upload(photo);
    }

    public search(username: string) {
        this.dataService.set(this._searchAPI + username);
        return this.dataService.get();
    }

    public searchFriends(username: string, token: string) {
        this.dataService.set(this._searchFriendsAPI + username);
        return this.dataService.getAuthenticate(token);
    }

    public checkOnFriendship(token: string, id: number) {
        this.dataService.set(this._searchAPI + id);
        return this.dataService.getAuthenticate(token);
    }
}