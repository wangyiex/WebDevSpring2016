/**
 * Created by costa on 2/21/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController",MainController);
    function MainController($scope, $location) {
        $scope.$location = $location;
    }

})();
