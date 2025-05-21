import User from "../entity/user.ts";
import UserRepository from "../repository/userRepository.ts";

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUserById(userData: User) {
    return await this.userRepository.getUserById(userData);
  }

  public async saveUser(usarData: User) {
    return await this.userRepository.registerNewUser(usarData);
  }
}
