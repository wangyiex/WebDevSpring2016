var q = require("q");

module.exports = function (db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js") (mongoose);

    // create user model form schema
    var UserModel = mongoose.model('User', UserSchema); // will do CRUD based on the schema we offered

    //define all the event handler
    var api = {
        findAllUsers:findAllUsers,
        findUserByCredential: findUserByCredential,
        findUserByUsername:findUserByUsername,
        findUserById:findUserById,
        createUser:createUser,
        updateUser:updateUser,
        deleteUser:deleteUser
    };
    return api;

    //the implementation of finding all users in server user models
    function findAllUsers() {
        return users;
    }

    //the implementation of finding user by username and password in server user models
    function findUserByCredential (credential) {

        var deferred = q.defer();

        UserModel.findOne(

            {
                username: credential.username,
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

    //the implementation of finding user by username in server user models
    function findUserByUsername (username) {
        for(var u in users) {
            if (users[u].username == username) {
                 return users[u];
            }
        }
    }

    //the implementation of finding a user by id
    function findUserById (userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
                console.log(doc);
            }
        });
        return deferred.promise;
    }

    //the implementation of creating user
    function createUser(user) {

        //user q to defer the response
        var deferred = q.defer();

        //  insert new user with mongoose user model's create()
       UserModel.create(user, function(err, doc) {

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

    //the implementation of updating a user
    function updateUser(id, user) {
        var deferred = q.defer();

        UserModel.update(
            {_id: id},
            {
                $set: {
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
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