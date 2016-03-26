(function(){
    angular
        .module("JobMarketApp")
        .factory("UserService", UserService);

    function UserService($http,$rootScope) {

        var service = {
            findUserByCredentials: findUserByCredentials,
            createUser:createUser,
            updateUser:updateUser,
            showprofileByUsername:showprofileByUsername,
            followByName:followByName,
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser,
            logout:logout
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
        function showprofileByUsername(username) {
           return $http.get("/api/project/showprofile/"+username);
        }

        //the implementation of creating user
        function createUser(user) {
            var newuser= {"_id":(new Date).getTime(),"username":user.username,
                "password":user.password, "email":user.email, "likes":[], "roles":["employee"] };
            return $http.post("/api/project/register",newuser);

        }

        //the implementation of updating user
        function updateUser(userId, user) {
            return $http.put("/api/project/update/"+userId, user);
        }

        function followByName(username, currentuser) {
            var exist;
            for(u in users) {
                if(users[u].username==currentuser.username) {
                    for (user in currentuser.likes) {
                        if(username == currentuser.likes[user]) {
                            exist = username;
                            }
                        }
                    if(exist){

                    }else {
                        if(users[u].likes) {
                            users[u].likes.push(username);
                        }else {
                            users[u].likes = [];
                            users[u].likes.push(username);
                        }
                    }
                    }
                }
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
            console.log("jinlaile123");
            return $http.post("/api/project/logout");
        }
    }
})();
