/**
 * Created by costa on 2/10/2016.
 */
(function() {
    angular
        .module("MovieDBApp",[]) //[] means it depends on nothing.
        .controller("MovieListController",MovieListController)
    function MovieListController($scope) {
        console.log("hello from moice controller");
        var movie = [
            {"id":123,title:"star wars"}
        ]
        $scope.movie=movie;
    }
})();