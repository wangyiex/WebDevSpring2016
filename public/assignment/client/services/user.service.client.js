(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {	"_id":123, "firstName":"Alice","lastName":"Wonderland",
                "username":"alice","password":"alice","roles": ["student"]		},
            {	"_id":234, "firstName":"Bob", "lastName":"Hope",
                "username":"bob","password":"bob", "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie", "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan", "lastName":"Craig",
                "username":"dan","password":"dan", "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward", "lastName":"Norton",
                "username":"ed","password":"ed","roles": ["student"]		}
        ];


        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers:findAllUsers,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
        };
        return service;

        function findUserByCredentials(username, password) {
            var loginuser;
            for(u in users) {
                if(users[u].username==username && users[u].password == password) {
                    loginuser = users[u];
                }
            }
            return loginuser;

        }

        function createUser(user) {
            var newuser= {"_id":(new Date).getTime(),"username":user.username,"password":user.password, "roles":["student"] };
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