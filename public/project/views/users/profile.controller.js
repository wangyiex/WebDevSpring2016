(function(){
    angular
        .module("JobMarketApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,UserService,$rootScope,$location,$routeParams) {
        $scope.update = update;
        var name = $routeParams.name;
        function update(user) {
            UserService.updateUser($rootScope.currentuser._id,user,function(user) {
                $rootScope.currentuser = updateuser;
            });
        }

    }


})();