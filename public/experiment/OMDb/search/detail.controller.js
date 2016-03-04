(function(){
    angular
        .module("MovieApp")
        .controller("DetailController",detailController);

    function detailController($scope, $routeParams,$http) {
        $scope.imdbID = $routeParams.imdbID;

    }
})();