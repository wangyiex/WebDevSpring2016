(function(){
    angular
        .module("JobMarketApp")
        .controller("OtherController",OtherController);

    function OtherController($scope,UserService,$rootScope,$location,$routeParams) {
        var username = $routeParams.username;
        $scope.follow = follow;
        if(username) {
           UserService
               .showprofileByUsername(username)
               .then(function(response) {
                   $scope.showuser = response.data;
               })
        }

        function follow(username) {
            console.log("chufa");
            UserService.followByName(username,$rootScope.currentuser);
        }
    }
})();