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
            name:$rootScope.currentuser.name,
            password:$rootScope.currentuser.password,
            email:$rootScope.currentuser.email
        }
        function update(profile) {
            UserService.updateUser($rootScope.currentuser._id,$rootScope.currentuser,function(updateuser){
                $rootScope.currentuser = updateuser;
            })
        }

    }


})();