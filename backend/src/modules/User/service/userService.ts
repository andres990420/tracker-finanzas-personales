import { error } from "console";
import User from "../entity/user.ts";
import UserRepository from "../repository/userRepository.ts";

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUserById(userData: User) {
    try{
    return await this.userRepository.getUserById(userData);
    } catch (error){
      console.error('Error en metodo getUserById:', error)
      throw new Error('Un error ocurrio al intentar obtener el usuario')
    }
  }

  public async saveUser(usarData: User) {
    try{
    return await this.userRepository.registerNewUser(usarData);
      } catch(error){
        console.error('Error en saveUser:', error)
        throw new Error('Un error ocurrio durante el registro de un nuevo usuario')
      }
  }
}
