(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var service = {
            findUserByUsername:findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers:findAllUsers,
            createUser:createUser,
            updateUser:updateUser
        };
        return service;

        //The implementation of finding user by username
        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=:username");
        }

        //The implementation of finding user by username and password
        function findUserByCredentials(username, password) {
            var user = {
                username:username,
                password:password
            };
            return $http.post("/api/assignment/login", user);
        }

        //The implementation of finding all users
        function findAllUsers(callback) {
             return $http.get("/api/assignment/user");
        }

        //The implementation of creating user
        function createUser(user) {
           return $http.post("/api/assignment/user",user);
        }

        //the implementation of updating a user
        function updateUser(userid, user) {
            return $http.put("/api/assignment/user/"+userid, user);
        }

    }
})();