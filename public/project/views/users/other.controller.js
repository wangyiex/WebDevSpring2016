(function(){
    angular
        .module("JobMarketApp")
        .controller("OtherController",OtherController);

    function OtherController($scope,UserService,$rootScope,$location,$routeParams) {
        var username = $routeParams.username;
        if(username) {
            $scope.showuser = UserService.showprofileByUsername(username);
        }
    }
})();