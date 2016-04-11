var users = require("./user.mock.json");
var q = require("q");

module.exports = function (db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js") (mongoose);

    // create user model form schema
    var UserModel = mongoose.model('JMUser', UserSchema); // will do CRUD based on the schema we offered

    var api = {
        login: login,
        register:register,
        updateProfile:updateProfile,
        findUserByUsername:findUserByUsername
    };
    return api;

    //the implementation of finding user by username and password
    function login (credential) {
        var deferred = q.defer();

        UserModel.findOne(
            {
                email: credential.email,
                password:credential.password
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //the implementation of creating user
    function register(newuser) {
        var newuser = {
            username: newuser.username,
            password: newuser.password,
            firstName: newuser.firstName,
            lastName: newuser.lastName,
            email: newuser.email,
            roles:newuser.roles
        }
        //user q to defer the response
        var deferred = q.defer();

        //  insert new user with mongoose user model's create()
        UserModel.create(newuser, function(err, doc) {

            if (err) {
                //reject promise if error
                deferred.reject(err);
            } else {
                //resolve promise
                deferred.resolve(doc);
            }
        });
        //return a promise
        return deferred.promise;
    }

    //the implementation of updating user
    function updateProfile(id, user) {
        var deferred = q.defer();

        UserModel.update(
            {_id: id},
            {
                $set: {
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    roles:user.roles
                }
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            }
        );
        return deferred.promise;
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