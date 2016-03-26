(function(){
    angular
        .module("JobMarketApp")
        .controller("SearchController",SearchController);
    function SearchController(GlassDoorService) {
        var vm =this;
        vm.search = search;
        function search(name) {
            GlassDoorService.findEmployerByName(
                name,
                function(response) {
                    console.log(response);
                    vm.data = response.response.employers;
                });
        }
    }
})();