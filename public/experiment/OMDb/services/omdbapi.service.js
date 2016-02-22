/**
 * Created by costa on 2/21/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("MovieService", movieService);

    function movieService($http) {
        var api= {
            findMovieByTitle : findMovieByTitle,
            findMovieByImdbID:    findMovieByImdbID
        };
        return api;
    }
})();
