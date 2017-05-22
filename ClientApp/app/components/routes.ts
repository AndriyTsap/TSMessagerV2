import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { PhotosComponent } from './photos/photos.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumPhotosComponent } from './album-photos/album-photos.component';
import { ProfileComponent } from './profile.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendsSearchComponent } from './friends-search/friends-search.component';
import { MessagesComponent } from './messages/messages.component';
import { accountRoutes, accountRouting } from './account/routes';
import { SignalRTestComponent } from "./signalr-test/signalr-test.component";


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'search',
        component: FriendsSearchComponent
    },
    {
        path: 'friends',
        component: FriendsComponent
    },
    {
        path: 'photos',
        component: PhotosComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'albums',
        component: AlbumsComponent
    },
    {
        path: 'messages',
        component: MessagesComponent
    },
    {
        path: 'albums/:id/photos',
        component: AlbumPhotosComponent
    },
    {   path: 'signalr-test', 
        component: SignalRTestComponent 
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
