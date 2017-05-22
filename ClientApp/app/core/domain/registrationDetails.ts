export class RegistrationDetails {
    FirstName: string;
    LastName: string;
    Phone: string;
    BirthDate:string;
    Photo: string;
    About: string;
    constructor(firstName: string,
        lastName: string,
        phone: string,
        birthDate: string,
        photo: string,
        about: string) {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Phone = phone;
        this.BirthDate = birthDate;
        this.Photo = photo;
        this.About = about;
    }
}