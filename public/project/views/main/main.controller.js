(function(){
    angular
        .module("JobMarketApp")
        .controller("MainController",MainController);
    function MainController($scope, $location) {
        $scope.$location = $location;
    }

})();
