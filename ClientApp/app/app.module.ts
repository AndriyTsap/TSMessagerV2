import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Headers, RequestOptions, BaseRequestOptions, HttpModule } from '@angular/http';

import { AccountModule } from './components/account/account.module';
import { AppComponent } from './components/app/app.component';
import { AlbumPhotosComponent } from './components/album-photos/album-photos.component';
import { HomeComponent } from './components/home.component';
import { PhotosComponent } from './components/photos/photos.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { ProfileComponent } from './components/profile.component';
import { FriendsComponent } from './components/friends/friends.component';
import { FriendsSearchComponent } from './components/friends-search/friends-search.component';
import { MessagesComponent } from './components/messages/messages.component';

import { routing } from './components/routes';

import { DataService } from './core/services/data.service';

import { MembershipService } from './core/services/membership.service';
import { UtilityService } from './core/services/utility.service';
import { NotificationService } from './core/services/notification.service';
import { UserService } from './core/services/user.service';
import { MessageService } from './core/services/message.service';

import { ChatComponent } from './components/signalr-test/chat/chat.component';
import { GroupComponent } from './components/signalr-test/group/group.component';
import { SignalRTestComponent } from './components/signalr-test/signalr-test.component';

import { ConfigService } from './shared/services/config.service';
import { DataServiceSR } from './shared/services/data.service';
import { UsersService } from './shared/services/users.service';

class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers();

    constructor() {
        super();
        this.headers.append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    imports: [
        UniversalModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'search', component: FriendsSearchComponent },
            { path: 'friends', component: FriendsComponent },
            { path: 'photos', component: PhotosComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'albums', component: AlbumsComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'albums/:id/photos', component: AlbumPhotosComponent },
            { path: 'signalr-test', component: SignalRTestComponent }
            //{ path: '**', redirectTo: 'home' }
        ]),
        AccountModule,
        HttpModule
    ],
    declarations: [AppComponent, AlbumPhotosComponent, HomeComponent, ProfileComponent,
        MessagesComponent, PhotosComponent, FriendsComponent, FriendsSearchComponent, AlbumsComponent, ChatComponent, GroupComponent, SignalRTestComponent],
    providers: [DataService, MembershipService, UtilityService, NotificationService, UserService, MessageService, ConfigService, DataServiceSR, UsersService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: RequestOptions, useClass: AppBaseRequestOptions }],
    bootstrap: [AppComponent]
})
export class AppModule { }

