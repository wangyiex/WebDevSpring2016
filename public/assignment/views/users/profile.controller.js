/**
 * Created by costa on 2/20/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,UserService,$rootScope,$location) {
        if (!$rootScope.currentuser) {
            $location.url("/home");
        }
        $scope.update = update;
        function update(user) {
           UserService.updateUser($rootScope.currentuser._id,user,function(user) {
              $rootScope.currentuser = updateuser;
           });
        }

    }


})();