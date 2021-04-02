import { User } from "../model/User";

interface ICreateUserDTO {
  name: string;
  email: string;
}

interface IUsersRepository {
  create({ name, email }: ICreateUserDTO): User;
  findById(id: string): User | undefined;
  findByEmail(email: string): User | undefined;
  turnAdmin(receivedUser: string): User;
  list(user_id: string | string[]): User[];
}

export { IUsersRepository, ICreateUserDTO };
