(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http,$rootScope) {
        var service = {
            findUserByUsername:findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers:findAllUsers,
            register:register,
            updateUser:updateUser,
            AdminupdateUser:AdminupdateUser,
            deleteUser: deleteUser,
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser,
            logout:logout,
            createUser:createUser
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

        function deleteUser(userId) {
            return $http.delete('/api/assignment/admin/user/'+userId);
        }
        //The implementation of finding all users
        function findAllUsers(callback) {
             return $http.get("/api/assignment/user");
        }

        //The implementation of creating user
        function register(user) {
           return $http.post("/api/assignment/user",user);
        }

        //the implementation of updating a user
        function updateUser(userid, user) {
            return $http.put("/api/assignment/user/"+userid, user);
        }

        function AdminupdateUser(userid,user) {
            return $http.put("/api/assignment/admin/user/"+userid, user);
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

        function createUser(user) {
            return $http.post("/api/assignment/admin/user",user);
        }
    }
})();