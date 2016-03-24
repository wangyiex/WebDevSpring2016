(function(){
    angular
        .module("JobMarketApp")
        .controller("HeaderController" ,HeaderController);

    function HeaderController($scope,$location,UserService) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();