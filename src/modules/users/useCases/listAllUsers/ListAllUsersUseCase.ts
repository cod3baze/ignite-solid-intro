import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const isAdmin = this.usersRepository.findById(user_id);
    if (!isAdmin.admin) {
      throw new Error(`User ${user_id} is not a admin`);
    }

    return this.usersRepository.list(user_id);
  }
}

export { ListAllUsersUseCase };
