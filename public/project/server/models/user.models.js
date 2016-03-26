var users = require("./user.mock.json");

module.exports = function (app) {

    var api = {
        findUserByCredential: findUserByCredential,
        createUser:createUser,
        updateUser:updateUser,
        findUserByUsername:findUserByUsername
    };
    return api;

    //the implementation of finding user by username and password
    function findUserByCredential (credential) {
        for(var u in users) {
            if( users[u].email === credential.email &&
                users[u].password === credential.password) {
                return users[u];
            }
        }
        return null;
    }

    //the implementation of creating user
    function createUser(newuser) {
        users.push(newuser);
        return newuser;
    }

    //the implementation of updating user
    function updateUser(id, user) {
        console.log("aaa");
        for(var u in users) {
            if(users[u]._id == id) {
                users[u] = user;
                console.log(users[u]);
                return user;
            }
        }
    }

    //the implementation of finding user by username
    function findUserByUsername(username) {
        var user;
        for (var u in users) {
            if(users[u].username == username) {
                user = users[u];
                return user;
            }
        }
    }
}