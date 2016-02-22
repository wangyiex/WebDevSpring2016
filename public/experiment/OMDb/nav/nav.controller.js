/**
 * Created by costa on 2/21/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("NavController", NavController);

    function NavController($scope, $location) {
    $scope.$location = $location;
    }
})();