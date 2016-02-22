/**
 * Created by costa on 2/20/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,UserService,$rootScope) {
        $scope.update = update;
        $scope.profile = {
            username: $rootScope.currentuser.username,
            password:$rootScope.currentuser.password
        }

        function update(profile) {
           UserService.updateUser($rootScope.currentuser._id,profile,function(updateuser) {
              $rootScope.currentuser = updateuser;
           });
        }

    }


})();