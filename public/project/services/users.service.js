(function(){
    angular
        .module("JobMarketApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {	"_id":123, "username":"alice","password":"alice","email": "wang.yid@husky.neu.edu",
            "likes":["yidong","pengfei","shifeng","shifu","tianyu","yonghao"],"roles":["student"]}
        ];


        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers:findAllUsers,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
        };
        return service;

        function findUserByCredentials(email, password) {
            var loginuser;
            for(u in users) {
                if(users[u].email==email && users[u].password == password) {
                    loginuser = users[u];
                }
            }
            return loginuser;

        }

        function createUser(user) {
            var newuser= {"_id":(new Date).getTime(),"username":user.username,"password":user.password, "email":user.email };
            users.push(newuser);
            return newuser;

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
    }
})();
