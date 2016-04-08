(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController" ,AdminController);

    function AdminController($scope,$location,UserService) {
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.editUser = selectUser;

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
        }

        function handleSuccess(response) {

            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }
    }
})();