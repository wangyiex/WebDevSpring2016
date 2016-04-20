

module.exports = function(app, userModel) {

    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + ".pdf")
        }
    })

    var upload2 = multer({ storage: storage});
    app.post("/api/project/login", login);
    app.post("/api/project/register", register);
    app.put("/api/project/update/:id", updateUserById);
    app.post("/api/project/finduser/:email", findUserByEmail);
    app.get("/api/project/loggedin",loggedin);
    app.post("/api/project/logout",logout)
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post ("/api/upload/resume", upload2.single('myFile1'), uploadresume);
    app.post("/api/project/post/:id",postJob);
    app.post("/api/project/create",createJob);
    app.get("/api/project/jobs",findJobs);
    app.get("/api/project/:jobid/:employerid", findJobById);
    app.post("/api/project/apply/:jobid",applyJob);
    app.post("/api/project/applicants/:jobid",findApplicants);
    app.post("/api/project/follow/:email",followUser);
    app.put("/api/project/unfollow/:email",unfollowUser);
    app.post("/api/project/get",get);
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
                req.session.currentUser = user;
                res.json(user);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    //the implementation of showing profile by username
    function findUserByEmail(req, res) {
        var email = req.params.email;
        userModel
            .findUserByEmail(email)
            .then(function(user) {
                res.json(user);
            },
            function (err) {
                res.status(400).send(err);
            });
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

    //the implementation of uploading image and resume
    function uploadImage(req, res) {
        var user = req.session.currentUser;
        var file = req.file;
        var destination = file.destination;
        var path = file.path;
        var originalname = file.originalname;
        var filename = file.filename;
        user.photo = filename;
        userModel
            .updateProfile(user._id,user)
            .then(function (doc) {
                if(user.role == "employee"){
                res.redirect("/project/client/index.html#/profile");
                }else {
                    res.redirect("/project/client/index.html#/employer");
                }
            },function (err) {
                res.status(400).send(err);
            });
    }

    function uploadresume(req, res) {
        var user = req.session.currentUser;
        var file = req.file;
        var destination = file.destination;
        var path = file.path;
        var originalname = file.originalname;
        var filename = file.filename;
        user.resume = filename;
        userModel
            .updateProfile(user._id,user)
            .then(function (doc) {
                    res.redirect("/project/client/index.html#/profile");
            },function (err) {
                res.status(400).send(err);
            });
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

    function applyJob(req, res) {
        var jobid = req.params.jobid;
        var user = req.body;
        userModel
            .applyJob(jobid, user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findApplicants(req, res) {
        var jobid = req.params.jobid;
        userModel
            .findApplicants(jobid)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function followUser(req, res) {
        var email = req.params.email;
        var user = req.session.currentUser;
        userModel
            .followUser(email, user)
            .then(function (user) {
                res.json(user);
            },
             function (err) {
                 res.status(400).send(err);
             }
            );
    }

    function unfollowUser(req, res) {
        var email = req.params.email;
        var user = req.session.currentUser;
        userModel
            .unfollowUser(email, user)
            .then(function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    function get(req,res) {
        var email = req.body.email;
        userModel.findUserByEmail(email)
            .then(function (doc) {
                req.session.currentUser = doc;
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });

    }

}