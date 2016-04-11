

module.exports = function(app, userModel) {


    app.post("/api/project/login", login);
    app.post("/api/project/register", register);
    app.put("/api/project/update/:id", updateUserById);
    app.get("/api/project/showprofile/:username", showProfileByUsername);
    app.get("/api/project/loggedin",loggedin);
    app.post("/api/project/logout",logout)


    //the implementation of finding user by username and password
    function login(req, res) {
        var credentials = req.body;
        userModel.login(credentials)
            .then(function(user){
                    if(user){
                        req.session.currentUser = user;
                        res.json(user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    //the implementation of creating user
    function register(req,res) {
        var newuser = req.body;
        userModel.register(newuser)
            .then(function(user){
                    if(user){
                        req.session.currentUser = user;
                        res.json(user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                });
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
        userModel.updateProfile(id, user)
            .then(function(user) {
                console.log(user);
                req.session.currentUser = user;
                res.json(user);
            },
            function (err) {
                res.status(400).send(err);
            });
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