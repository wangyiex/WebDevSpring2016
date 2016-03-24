(function(){
    angular
        .module("JobMarketApp")
        .controller("DetailController",DetailController);

    function DetailController($scope,$rootScope,$routeParams,GlassDoorService,$location) {
       var name = $routeParams.name;
       var currentuser = $rootScope.currentuser;
       $scope.leftreview = leftreview;
        GlassDoorService.findEmployerByName(
            name,
            function(response) {
                console.log(response);
                $scope.data = response.response.employers[0];
                console.log($scope.data);
            });
        var reviews = GlassDoorService.findReviewsByName(name);
        $scope.reviews = reviews;

        function leftreview(user_review) {
            if($rootScope.currentuser) {
                GlassDoorService.leftreview(name, user_review, currentuser.username);
            }else {
                $location.url("/login");
            }

        }

    }
})();