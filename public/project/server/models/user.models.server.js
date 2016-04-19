var q = require("q");

module.exports = function (db, mongoose) {

    // load user schema
    var JobSchema = require("./job.schema.server.js") (mongoose);
    var UserSchema = require("./user.schema.server.js") (mongoose,JobSchema);

    // create user model form schema
    var UserModel = mongoose.model('JMUser', UserSchema); // will do CRUD based on the schema we offered
    var JobModel = mongoose.model('JMJob', JobSchema);
    var api = {
        login: login,
        register:register,
        updateProfile:updateProfile,
        findUserByEmail:findUserByEmail,
        postJob:postJob,
        createJob:createJob,
        findJobs:findJobs,
        findJobById:findJobById,
        applyJob:applyJob,
        findApplicants:findApplicants,
        followUser:followUser
    };
    return api;

    function getMongooseModel() {
        return UserModel;
    }

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
                    likes:user.likes,
                    roles:user.roles,
                    job:user.job,
                    photo:user.photo
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
    function findUserByEmail(email) {
        var deferred = q.defer();
        UserModel.findOne({email: email}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function postJob(userId,job) {
        var deferred = q.defer();
        UserModel.update(
            {_id: userId},
            {
                $push: {job: job}
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function createJob(job) {
        var deferred = q.defer();
        JobModel.create(job,
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findJobs() {
        return JobModel.find();
    }

    function findJobById(jobid, employerid) {
      return  JobModel.find({
            _id: jobid,
            owner: employerid
        });
    }
    function applyJob(jobid, user) {
        var newuser = {
            username:user.username,
            email:user.email
        }
        console.log(jobid);
        var deferred = q.defer();
        JobModel.update(
            {_id: jobid},
            {
                $push: {applicants: newuser}
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findApplicants(jobid) {
        return JobModel.findOne(
            {_id: jobid});
    }

    function followUser(user, id) {
        var deferred = q.defer();
        var followuser = {
            name:user.username,
            email:user.email
        }
        UserModel
            .update(
                {
                    _id: id
                },
                {
                    $push: {likes: followuser}
                },
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }
}