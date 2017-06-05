export class  Chat {
    id:number;
    name:string;
    isSubscribed:boolean;
    constructor(id:number, name:string, isSubscribed:boolean) {
        this.id=id;
        this.name=name;
        this.isSubscribed=isSubscribed;
    }
}