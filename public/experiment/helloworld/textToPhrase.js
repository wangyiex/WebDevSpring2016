/**
 * Created by costa on 2/20/2016.
 */
(function(){
    angular.module("HelloWorldApp", [])
           .controller("HelloWorldController", HelloWorldController);

    function HelloWorldController($scope) {
        $scope.hello = "Hello World from AngularJS";
    }
})();
