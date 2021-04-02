import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const element = this.usersRepository.findById(user_id);
    if (!element) {
      throw new Error(`User ${element} not found`);
    }

    return element;
  }
}

export { ShowUserProfileUseCase };
