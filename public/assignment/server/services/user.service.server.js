var passport        = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

module.exports = function(app, userModel) {

    var auth = authorized;
    app.get("/api/assignment/user",auth, findAllUsers);
    app.post("/api/assignment/login",passport.authenticate('local'), findUserByCredential);
    app.post("/api/assignment/user", register);
    app.put("/api/assignment/user/:id",auth, updateUser);
    app.delete("/api/assignment/admin/user/:userId",auth, deleteUser);
    app.get("/api/assignment/loggedin",loggedin);
    app.post("/api/assignment/logout",logout);
    app.post("/api/assignment/admin/user",auth,createUser);
    app.put("/api/assignment/admin/user/:userId",auth, AdminupdateUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredential({username: username,password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    //the implementation of finding all users in server side
    function findAllUsers(req, res) {
        if(isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    //the implementation of finding user by username and password
    function findUserByCredential(req, res) {
        var user = req.user;
        res.json(user);
    }

    //the implementation of creating user
    function register(req,res) {
        var newuser = req.body;
        newuser.roles = ['user'];
        userModel
            .findUserByUsername(newuser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newuser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    //the implementation of finding user by username in server service
    function findUserByUsername(req,res) {
        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    //the implementation of updating user by id in server service
    function updateUser(req,res) {
        var id = req.params.id;
        var user = req.body;
        userModel
            .updateUser(id, user)
            .then(
                function(doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    //the implementation of deleting user by id
    function deleteUser(req,res) {
        if(isAdmin(req.user)) {

            userModel
                .deleteUser(req.params.userId)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }

    }

    //the implementation of loggedin
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    //the implementation of log out
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") != -1) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        console.log(newUser);
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["user"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function AdminupdateUser(req, res) {
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(req.params.userId, newUser)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

}