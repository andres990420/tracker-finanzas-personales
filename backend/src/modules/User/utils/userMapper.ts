import User from "../entity/user.ts"

export interface IUserForm{
    username: string
    email: string,
    password: string
}

export function formToEntityUser(dataUser: IUserForm): User{
    return new User(
        dataUser.email,
        dataUser.password
    )
}