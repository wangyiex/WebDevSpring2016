(function(){
    angular
        .module("JobMarketApp")
        .controller("SearchController",SearchController);
    function SearchController($scope, GlassDoorService) {
        $scope.search = search;
        function search(name) {
            GlassDoorService.findEmployerByName(
                name,
                function(response) {
                    console.log(response);
                    $scope.data = response.response.employers;
                });
        }
    }
})();