(function(){
    angular
        .module("MovieApp")
        .controller("DetailController",detailController);

    function detailController($scope, $routeParams) {
        $scope.imdbID = $routeParams.imdbID;
    }
})();