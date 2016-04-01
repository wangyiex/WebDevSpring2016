(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http,$rootScope) {
        var service = {
            findUserByUsername:findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers:findAllUsers,
            createUser:createUser,
            updateUser:updateUser,
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser,
            logout:logout
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

        //the implementation of getting current user
        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        //the implementation of setting current user
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        //the implementation of logging out
        function logout() {
            return $http.post("/api/assignment/logout");
        }
    }
})();