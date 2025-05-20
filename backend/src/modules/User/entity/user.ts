interface IUser{
    id?: string
    email: string
    password: string
    profilePhoto: string
}

export default class User implements IUser{
    public id?: string
    public email: string
    public password: string
    public profilePhoto: string

    constructor(
        email: string,
        password: string,
        profilePhoto: string,
        id?: string
    ){
        this.id = id
        this.email = email
        this.password = password
        this.profilePhoto = profilePhoto
    }
}