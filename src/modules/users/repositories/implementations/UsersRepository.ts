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

  findById(id: string): User | undefined {
    const element = this.users.find((user) => user.id === id);

    return element;
  }

  findByEmail(email: string): User | undefined {
    const element = this.users.find((user) => user.email === email);

    return element;
  }

  turnAdmin(receivedUser: User): User {
    Object.assign(receivedUser, {
      admin: true,
    });

    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
