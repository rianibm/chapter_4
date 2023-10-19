// Abstract class UserRepository
class UserRepository {
  constructor() {
    if (new.target === UserRepository) {
      throw new Error("Cannot instantiate an abstract class.");
    }
    this.users = [];
  }

  // first function
  getAll = () => this.users;

  // second function
  add = (user) => {
    this.users.push(user);
  };

  // third function
  getByID = (id) => this.users.find((user) => user.id === id);

  // fourth function
  deleteByID = (id) => {
    this.users = this.users.filter((user) => user.id !== id);
  };
}

// Child class UserRepositoryPostgres
class UserRepositoryPostgres extends UserRepository {
  constructor(users) {
    super();
    this.users = users;
  }
}

// Example usage
const usersData = [
  {
    id: 1,
    name: "Agus",
  },
  {
    id: 2,
    name: "NHK",
  },
];

const userRepository = new UserRepositoryPostgres(usersData);

console.log("All Users:");
console.log(userRepository.getAll());

const newUser = {
  id: 3,
  name: "John",
};

userRepository.add(newUser);

console.log("Users after adding John:");
console.log(userRepository.getAll());

const userIdToFind = 2;
console.log(`User with ID ${userIdToFind}:`);
console.log(userRepository.getByID(userIdToFind));

const userIdToDelete = 1;
userRepository.deleteByID(userIdToDelete);

console.log(`Users after deleting user with ID ${userIdToDelete}:`);
console.log(userRepository.getAll());
