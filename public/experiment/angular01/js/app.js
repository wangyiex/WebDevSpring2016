/**
 * Created by costa on 2/20/2016.
 */
(function(){
    angular
        .module("MovieDBApp", [])
        .controller("MovieListController", MovieListController);
    function MovieListController($scope) {
        var movies = [
            {id:123, title:"Avatar" , year:2007},
            {id:234, title:"star Wars", year:1977}
        ];
        $scope.movies = movies;

        //event handlers declarations
        $scope.addMovie = addMovie;
        $scope.removeMovie = removeMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;
        //event handler implementations
        function addMovie(movie) {
            console.log(movie);
            var newMovie = {
                id:movie.id,
                title:movie.title,
                year:movie.year
            }
            $scope.movie = {};
            $scope.movies.push(newMovie);
        }

        function removeMovie(movie) {
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);

        }

        function selectMovie(movie) {
            $scope.selectedMovie = $scope.movies.indexOf(movie);
            $scope.movie = {
                id:movie.id,
                title:movie.title,
                year:movie.year
            }
        }

        function updateMovie(movie) {
            $scope.movies[$scope.selectedMovie] = {
                id:movie.id,
                title:movie.title,
                year:movie.year
            }
            $scope.selectedMovie = {};
        }
    }
})();