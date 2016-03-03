(function(){
    angular
        .module("JobMarketApp")
        .controller("SearchController",SearchController);
    function SearchController($scope, $http) {
        $scope.search = search;
        $scope.title="star war";

        function search(title) {
            console.log(title);
            $http.get("http://api.glassdoor.com/api/api.htm?t.p=54774&t.k=JjQc4RmthO&userip=0.0.0.0&" +
                "useragent=&format=json&v=1&action=employers&q="+title)
                .success(function(response) {
                    console.log(response);
                    $scope.data = response;
                })
        }
    }
})();