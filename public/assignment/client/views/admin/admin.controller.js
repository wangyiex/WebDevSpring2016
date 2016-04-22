(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController" ,AdminController);

    function AdminController($scope,$location,UserService) {
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.editUser = selectUser;
        $scope.type = 'username';
        $scope.sortDescend = sortDescend;
        $scope.sortAscend = sortAscend;
        $scope.showDscendUsername = true;
        $scope.showDscendFirstName = true;
        $scope.showDscendLastName = true;
        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function deleteUser(user)
        {
            UserService
                .deleteUser(user._id)
                .then(handleSuccess, handleError);
        }

        function updateUser(user)
        {
            console.log("nihao");
            UserService
                .AdminupdateUser(user._id, user)
                .then(handleSuccess, handleError);
        }

        function addUser(user)
        {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function selectUser(user)
        {
            console.log(user);

            $scope.user = angular.copy(user);
            $scope.user.password = null;
        }

        function handleSuccess(response) {

            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }
        function sortAscend(type) {
            $scope.type = type;
            if (type == "username") {
                $scope.showDscendUsername = true;
            } else if (type == "firstName") {
                $scope.showDscendFirstName = true;
            } else if (type == "lastName") {
                $scope.showDscendLastName = true;
            }
        }

        function sortDescend(type) {
            $scope.type = "-" + type;
            if (type == "username") {
                $scope.showDscendUsername = false;
            } else if (type == "firstName") {
                $scope.showDscendFirstName = false;
            } else if (type == "lastName") {
                $scope.showDscendLastName = false;
            }
        }

    }
})();