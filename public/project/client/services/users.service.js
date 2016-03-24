(function(){
    angular
        .module("JobMarketApp")
        .factory("UserService", UserService);

    function UserService($http,$rootScope) {

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers:findAllUsers,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            showprofileByUsername:showprofileByUsername,
            followByName:followByName,
            setCurrentUser:setCurrentUser
        };
        return service;

        function findUserByCredentials(email, password) {
           var user = {
               email:email,
               password:password,
           }
            return $http.post("/api/project/login", user);
        }
        function showprofileByUsername(username) {
            var loginuser;
            for(u in users) {
                if(users[u].username==username) {
                    loginuser = users[u];
                }
            }
            return loginuser;
        }

        function createUser(user) {
            var newuser= {"_id":(new Date).getTime(),"username":user.username,
                "password":user.password, "email":user.email, "likes":[], "roles":["employee"] };
            return $http.post("/api/project/register",newuser);

        }
        function deleteUserById(userId, callback) {

        }
        function updateUser(userId, user, callback) {
            var updateUser;
            for (u in users) {
                if(users[u]._id == userId) {
                    updateUser = users[u];
                    console.log(updateUser);
                }
            }
            updateUser = {
                _id:updateUser._id,
                firstname:user.firstname,
                lastname:user.lastname,
                username:user.username,
                password:user.password,
                roles:updateUser.roles
            }
            callback(updateUser);

        }
        function findAllUsers(callback) {
            return users;
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

        function setCurrentUser(user) {
            $rootScope.currentuser = user;
        }
    }
})();
