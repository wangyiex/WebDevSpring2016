/**
 * Created by costa on 2/21/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("SearchController",SearchController);
    function SearchController($scope, $http) {
        $scope.search = search;
        $scope.title="star war";

        function search(title) {
            console.log(title);
            $http.get("http://www.omdbapi.com/?s="+title)
                .success(function(response) {
                    console.log(response);
                    $scope.data = response;
                })
        }
    }
})();