export class Photo {
    id: number;
    title: string;
    uri: string;
    albumId: number;
    albumTitle: string;
    dateUploaded: Date

    constructor(id: number,
        title: string,
        uri: string,
        albumId: number,
        albumTitle: string,
        dateUploaded: Date) {
        this.id = id;
        this.title = title;
        this.uri = uri;
        this.albumId = albumId;
        this.albumTitle = albumTitle;
        this.dateUploaded = dateUploaded;
    }
}