(function(){
    angular
        .module("JobMarketApp")
        .controller("HeaderController" ,HeaderController);

    function HeaderController($scope,$location,$rootScope) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            $rootScope.currentuser = null;
            $location.url("/home");

        }
    }
})();