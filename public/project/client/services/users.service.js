(function(){
    angular
        .module("JobMarketApp")
        .factory("UserService", UserService);

    function UserService($http,$rootScope) {

        var service = {
            findUserByCredentials: findUserByCredentials,
            createUser:createUser,
            updateUser:updateUser,
            postJob:postJob,
            createJob:createJob,
            findJobs:findJobs,
            applyJob:applyJob,
            findUserByEmail:findUserByEmail,
            findJobById:findJobById,
            findApplicants:findApplicants,
            followUser:followUser,
            unfollowUser:unfollowUser,
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser,
            findAllUsers:findAllUsers,
            logout:logout,
            getUpdateCurrentUser:getUpdateCurrentUser
        };
        return service;

        //the implementation of finding user by credentials
        function findUserByCredentials(email, password) {
           var user = {
               email:email,
               password:password,
           }
            return $http.post("/api/project/login", user);
        }

        //the implementation of showing profile by username
        function findUserByEmail(email) {
           return $http.post("/api/project/finduser/"+email);
        }

        //the implementation of creating user
        function createUser(user) {
            return $http.post("/api/project/register",user);

        }

        //the implementation of updating user
        function updateUser(userId, user) {
            return $http.put("/api/project/update/"+userId, user);
        }

        function postJob(job, userId) {
            return $http.post("/api/project/post/"+userId,job);
        }
        function createJob(job) {
            return $http.post("/api/project/create",job);
        }
        function findJobs() {
            return $http.get("/api/project/jobs");
        }

        //the implementation of set current user
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        //the implementation of geting current user
        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        //the implementation of logging out
        function logout() {
            return $http.post("/api/project/logout");
        }
        function findJobById(jobid,employerid) {
            return $http.get("/api/project/"+jobid+"/"+employerid);
        }

        function applyJob(jobid,user) {
            return $http.post("/api/project/apply/"+jobid, user);
        }
        function findApplicants(jobid) {
            return $http.post("/api/project/applicants/"+jobid);
        }
        function followUser(email) {
            return $http.post("/api/project/follow/"+email);
        }
        function unfollowUser(email) {
            return $http.put("/api/project/unfollow/"+email);
        }
        function findAllUsers() {
            return $http.get("/api/project/users");
        }
        function getUpdateCurrentUser(email) {
            var email = {
                email:email
            };
            return $http.post("/api/project/get",email);
        }
    }
})();
