(function(){
    angular
        .module("JobMarketApp")
        .controller("DetailController",DetailController);

    function DetailController(GlassDoorService,UserService,$routeParams,$location) {
       var vm = this;
        vm.leftreview = leftreview;
       var name = $routeParams.name;
        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if(user) {
                        vm.user = user;
                    }
                });
            GlassDoorService.findEmployerByName(
                name,
                function (response) {
                    vm.data = response.response.employers[0];
                });
            GlassDoorService
                .findReviewsByName(name)
                .then(function (response) {
                    var reviews = response.data.reviews;
                    if(reviews) {
                        vm.reviews = reviews;
                    }
                });
        }
        init();
        function leftreview(review) {
            var user = vm.user;
            user.review = review;
            GlassDoorService
                .leftreview(name,user)
                .then(function (response) {
                    var reviews = response.data;
                    if(reviews) {
                        vm.reviews = reviews;
                    }
                    $location.url("#/detail/"+name);
                });
        }
    }
})();