var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.getAll = function () {
        throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    };
    UserRepository.prototype.add = function (user) {
        throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    };
    UserRepository.prototype.getByID = function (id) {
        throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    };
    UserRepository.prototype.deleteByID = function (id) {
        throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    };
    return UserRepository;
}());
var UserRepositoryPostgres = /** @class */ (function (_super) {
    __extends(UserRepositoryPostgres, _super);
    function UserRepositoryPostgres(users) {
        if (users === void 0) { users = []; }
        var _this = _super.call(this) || this;
        _this.users = users;
        return _this;
    }
    UserRepositoryPostgres.prototype.getAll = function () {
        return this.users;
    };
    UserRepositoryPostgres.prototype.add = function (user) {
        this.users.push(user);
        return this.users;
    };
    UserRepositoryPostgres.prototype.getByID = function (id) {
        var user = this.users.find(function (user) { return user.id === id; });
        if (user == null) {
            return "user not found";
        }
        return user;
    };
    UserRepositoryPostgres.prototype.deleteByID = function (id) {
        this.users = this.users.filter(function (user) { return user.id !== id; });
        return "user with id ".concat(id, " deleted successfully");
    };
    return UserRepositoryPostgres;
}(UserRepository));
// Implementation
var users = [
    {
        id: 1,
        name: "John",
    },
];
var userPostgres = new UserRepositoryPostgres(users);
console.log("[userRepositoryPostgres] getAll(): " + JSON.stringify(userPostgres.getAll()));
console.log("[userRepositoryPostgres] add(): " +
    JSON.stringify(userPostgres.add({
        id: 2,
        name: "Danto",
    })));
console.log("[userRepositoryPostgres] getByID(): " +
    JSON.stringify(userPostgres.getByID(1)));
console.log("[userRepositoryPostgres] deleteByID(): " +
    JSON.stringify(userPostgres.deleteByID(1)));
console.log("[userRepositoryPostgres] getAll(): " + JSON.stringify(userPostgres.getAll()));
