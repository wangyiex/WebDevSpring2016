(function(){
    angular
        .module("JobMarketApp")
        .controller("DetailController",DetailController);

    function DetailController($scope, $routeParams) {
        $scope.name = $routeParams.name;
    }
})();