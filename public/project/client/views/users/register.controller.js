(function(){
    angular
        .module("JobMarketApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location,UserService,$scope) {
        var vm = this;
        vm.register = register;
        vm.message = null;
        //the implementation of user registration
        function register(uregister) {
            var newuser;
            if (uregister.role&& uregister.role!="employee") {
                newuser = uregister;
                newuser.role = "employer";
            }else {
                newuser = uregister;
                newuser.role = "employee";
            }
            if (uregister == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!uregister.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!uregister.email) {
                vm.message = "Please provide an email address";
                return;
            }
            if (uregister.email.indexOf("@") == -1) {
                vm.message = "Please provide a valid email gmail/hotmail address";
                return;
            }
            if (!uregister.password || !uregister.confirm) {
                vm.message = "Please provide a password";
                return;
            }
            if (uregister.password != uregister.confirm) {
                vm.message = "Passwords must match";
                return;
            }
            UserService.createUser(newuser)
                .then(function(response) {
                    UserService.setCurrentUser(response.data);
                    var user = response.data;
                    if (user != null) {
                        if (user.role == "employee") {
                            $location.url("/profile");
                        } else {
                            $location.url("/employer");
                        }
                    }else {
                        vm.message = "this email address has already registered, please try another one."
                    }
                },
                    function(err) {
                        vm.message = err;
                    }
                );
        }
    }
})();