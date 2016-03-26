/**
 * Created by costa on 3/24/2016.
 */
module.exports = function(app, userModel) {


    app.post("/api/project/login", findUserByCredential);
    app.post("/api/project/register", createUser);
    app.put("/api/project/update/:id", updateUserById);
    app.get("/api/project/showprofile/:username", showProfileByUsername);
    app.get("/api/project/loggedin",loggedin);
    app.post("/api/project/logout",logout)


    //the implementation of finding user by username and password
    function findUserByCredential(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredential(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    //the implementation of creating user
    function createUser(req,res) {
        var newuser = req.body;
        var user = userModel.createUser(newuser);
        req.session.currentUser = user;
        res.json(user);

    }
    //the implementation of finding user by username in server service
    function findUserByUsername(req,res) {
        var username = req.query.username;
        console.log(username);
        var user = userModel.findUserByUsername(username);
        req.session.currentUser = user;
        res.json(user);
    }

    //the implementation of updating user by id in server service
    function updateUserById(req,res) {
        var id = req.params.id;
        var user = req.body;
        var updateuser = userModel.updateUser(id, user);
        res.json(updateuser);
    }

    //the implementation of showing profile by username
    function showProfileByUsername(req, res) {
        var username = req.params.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    //the implementation of loggedin
    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    //the implementation of loging out
    function logout (req, res) {
        req.session.destroy();
        res.send(200);
    }
}