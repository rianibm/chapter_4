class UserRepository {
  getAll(): any[] {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  add(user: any): any[] {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  getByID(id: number): any {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  deleteByID(id: number): string {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

interface User {
  id: number;
  name: string;
}

class UserRepositoryPostgres extends UserRepository {
  private users: User[];

  constructor(users: User[] = []) {
    super();
    this.users = users;
  }

  getAll(): User[] {
    return this.users;
  }

  add(user: User): User[] {
    this.users.push(user);
    return this.users;
  }

  getByID(id: number): User | string {
    const user = this.users.find((user) => user.id === id);

    if (user == null) {
      return "user not found";
    }

    return user;
  }

  deleteByID(id: number): string {
    this.users = this.users.filter((user) => user.id !== id);
    return `user with id ${id} deleted successfully`;
  }
}

// Implementation
const users: User[] = [
  {
    id: 1,
    name: "John",
  },
];

const userPostgres = new UserRepositoryPostgres(users);

console.log(
  "[userRepositoryPostgres] getAll(): " + JSON.stringify(userPostgres.getAll())
);
console.log(
  "[userRepositoryPostgres] add(): " +
    JSON.stringify(
      userPostgres.add({
        id: 2,
        name: "Danto",
      })
    )
);
console.log(
  "[userRepositoryPostgres] getByID(): " +
    JSON.stringify(userPostgres.getByID(1))
);
console.log(
  "[userRepositoryPostgres] deleteByID(): " +
    JSON.stringify(userPostgres.deleteByID(1))
);
console.log(
  "[userRepositoryPostgres] getAll(): " + JSON.stringify(userPostgres.getAll())
);
