var passport        = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

module.exports = function(app, userModel) {

    var auth = authorized;
    app.get("/api/assignment/user", findAllUsers);
    app.post("/api/assignment/login",passport.authenticate('local'), findUserByCredential);
    app.post("/api/assignment/user", createUser);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/loggedin",loggedin);
    app.post("/api/assignment/logout",logout)

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
    function findAllUsers(req,res) {
        var users = userModel.findAllUsers();
        res.json(users);
    }

    //the implementation of finding user by username and password
    function findUserByCredential(req, res) {
        var user = req.user;
        console.log(user);
        res.json(user);
    }

    //the implementation of creating user
    function createUser(req,res) {
        var newuser = req.body;
        var user = {
            username:newuser.username,
            password:newuser.password,
            emails:[newuser.emails],
        }
        userModel.createUser(user)
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
    function updateUserById(req,res) {
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
    function deleteUserById(req,res) {
        var id = req.params.id;
        var users = userModel.deleteUser(id);
        res.json(users);

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

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };
}