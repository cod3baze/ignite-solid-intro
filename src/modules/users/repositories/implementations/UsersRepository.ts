import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const element = new User();
    Object.assign(element, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(element);

    return element;
  }

  findById(id: string | string[]): User | undefined {
    const element = this.users.find((user) => user.id === id);

    return element;
  }

  findByEmail(email: string): User | undefined {
    const element = this.users.find((user) => user.email === email);

    return element;
  }

  turnAdmin(receivedUser: User): User {
    const userExists = this.findById(receivedUser.id);

    if (!userExists) {
      throw new Error(`User ${receivedUser} do not exists`);
    }

    return userExists;
  }

  list(user_id: string): User[] {
    const isAdmin = this.findById(user_id);
    if (!isAdmin.admin) {
      throw new Error(`User ${user_id} is not a admin`);
    }

    return this.users;
  }
}

export { UsersRepository };
