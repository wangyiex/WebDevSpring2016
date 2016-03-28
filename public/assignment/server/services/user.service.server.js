module.exports = function(app, userModel) {

    app.get("/api/assignment/user", findAllUsers);
    app.post("/api/assignment/login", findUserByCredential);
    app.post("/api/assignment/user", createUser);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    //the implementation of finding all users in server side
    function findAllUsers(req,res) {
        var users = userModel.findAllUsers();
        res.json(users);
    }

    //the implementation of finding user by username and password
    function findUserByCredential(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredential(credentials);
        res.json(user);
    }

    //the implementation of creating user
    function createUser(req,res) {
        var newuser = req.body;
        var user = userModel.createUser(newuser)
            .then(
                //login user if promise resolved
                function (doc) {
                    res.json(user);
                },
                //send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    //the implementation of finding user by username in server service
    function findUserByUsername(req,res) {
        var username = req.query.username;
        console.log(username);
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    //the implementation of updating user by id in server service
    function updateUserById(req,res) {
        var id = req.params.id;
        var user = req.body;
        var updateuser = userModel.updateUser(id, user);
        console.log(updateuser);
        res.json(updateuser);
    }

    //the implementation of deleting user by id
    function deleteUserById(req,res) {
        var id = req.params.id;
        var users = userModel.deleteUser(id);
        res.json(users);

    }

}