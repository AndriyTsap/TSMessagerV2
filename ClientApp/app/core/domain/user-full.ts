import { RegistrationDetails } from "./registrationDetails";
export class UserFull extends RegistrationDetails {
    Id:number;
    Username:string;
    Password:string;
    Email:string;

    constructor(id:number,
        username: string,
        password: string,
        email:string,
        firstName: string,
        lastName: string,
        phone: string,
        birthDate: string,
        photo: string,
        about: string) {
        super(firstName, lastName, phone, birthDate, photo, about);
        this.Id=id;
        this.Username = username;
        this.Password = password;
        this.Email = email;
    }
}