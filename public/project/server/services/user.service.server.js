

module.exports = function(app, userModel) {

    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/project/login", login);
    app.post("/api/project/register", register);
    app.put("/api/project/update/:id", updateUserById);
    app.get("/api/project/showprofile/:username", showProfileByUsername);
    app.get("/api/project/loggedin",loggedin);
    app.post("/api/project/logout",logout)
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/project/post/:id",postJob);
    app.post("/api/project/create",createJob);
    app.get("/api/project/jobs",findJobs);
    app.get("/api/project/:jobid/:employerid", findJobById)
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
        userModel.findUserByEmail(newuser.email)
            .then(
                function(user) {
                    if(user) {
                        res.json(null);
                    }else {
                        return userModel.register(newuser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(
                function (user) {
                    if(user) {
                        req.session.currentUser = user;
                        res.json(user);
                    }
                },
                function (err) {
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

    function postJob(req, res) {
        var userId = req.params.id;
        var job = req.body;
        userModel.postJob(userId, job)
            .then(function(user) {
                    console.log(user);
                    req.session.currentUser = user;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function createJob(req, res) {
        var job = req.body;
        userModel.createJob(job)
            .then(function(doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
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

    function uploadImage(req, res) {
        var file = req.file;
        var destination = file.destination;
        var path = file.path;
        var originalname = file.originalname;
        var filename = file.filename;
        console.log(destination,path,originalname,filename);
        res.send(200);
    }

    function findJobs(req,res) {
        userModel
            .findJobs()
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function findJobById(req,res) {
        var jobid = req.params.jobid;
        var employerid = req.params.employerid;
        userModel
            .findJobById(jobid, employerid)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
}