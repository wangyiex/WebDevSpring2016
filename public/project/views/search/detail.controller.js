(function(){
    angular
        .module("JobMarketApp")
        .controller("DetailController",DetailController);

    function DetailController($scope, $routeParams,GlassDoorService) {
       var name = $routeParams.name;
        GlassDoorService.findEmployerByName(
            name,
            function(response) {
                console.log(response);
                $scope.data = response.response.employers[0];
                console.log($scope.data);
            });
    }
})();