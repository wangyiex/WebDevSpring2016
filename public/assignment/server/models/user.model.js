var users = require("./user.mock.json");
module.exports = function (app) {

    var api = {
        findUserByCredential: findUserByCredential,
        findUserByUsername:findUserByUsername,
        findAllUsers:findAllUsers,
        createUser:createUser,
        updateUser:updateUser,
        deleteUser:deleteUser
    };
    return api;

    //the implementation of finding user by username and password in server user model
    function findUserByCredential (credential) {
        for(var u in users) {
            if( users[u].username === credential.username &&
                users[u].password === credential.password) {
                return users[u];
            }
        }
        return null;
    }

    //the implementation of finding user by username in server user model
    function findUserByUsername (username) {
        for(var u in users) {
            if(users[u].username == username) {
                return users[u];
            }
        }
    }

    //the implementation of finding all users in server user model
    function findAllUsers() {
        return users;
    }

    //the implementation of creating user
    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        users.push(user);
        return user;
    }

    //the implementation of updating a user
    function updateUser(id, user) {
        for(var u in users) {
            if(users[u]._id == id) {
                users[u] = user;
                return user;
            }
        }
    }

    //the implementation of deleting user by id
    function deleteUser(id) {
        for (var u in users) {
            if(users[u]._id == id) {
                var index = users.indexOf(users[u]);
                users.splice(index, 1);
                return users;
            }
        }
    }

};