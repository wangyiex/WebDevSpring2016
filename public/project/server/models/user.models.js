var users = require("./user.mock.json");

module.exports = function (app) {

    var api = {
        findUserByCredential: findUserByCredential,
    };
    return api;

    function findUserByCredential (credential) {
        for(var u in users) {
            if( users[u].email === credential.email &&
                users[u].password === credential.password) {
                return users[u];
            }
        }
        return null;
    }
}