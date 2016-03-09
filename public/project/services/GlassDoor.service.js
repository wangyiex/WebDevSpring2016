(function(){
    angular
        .module("JobMarketApp")
        .factory("GlassDoorService",GlassDoorService);

    function GlassDoorService($http,$location) {
        var company = [
            {	"id":123, "name":"EMC","reviews":[{"name":"alice","review":"this is a great company"},
                {"name":"bob","review":"this company is the perfect place to work for"}]}
        ];
         var api = {
            findEmployerByName :findEmployerByName,
            findReviewsByName: findReviewsByName,
            leftreview:leftreview,
        };
        return api;

        function findEmployerByName(name,callback) {
            $http.jsonp("http://api.glassdoor.com/api/api.htm?t.p=54774&t.k=JjQc4RmthO&userip=0.0.0.0" +
                    "&useragent=&format=json&v=1&action=employers&callback=JSON_CALLBACK&q="+name)
                .success(callback);
        }

        function findReviewsByName(name) {
            var reviews;
            for(r in company) {
                if(company[r].name==name) {
                    reviews = company[r].reviews;
                }
            }
            return reviews;
        }

        function leftreview(name,user_review,currentuser) {
            var newreview;
            var employer;
            if(currentuser) {
                newreview = {"name":currentuser,"review":user_review};
            }else {
                newreview = {"name":"anonymous","review":user_review};
            }
            for(r in company) {
                if(company[r].name==name) {
                   employer = company[r];
                }
            }
            if(employer) {
                employer.reviews.push(newreview);
            } else {
                employer = {"id":(new Date).getTime(),"name":name,"reviews":[]};
                employer.reviews.push(newreview);
                company.push(employer);
                $location.url('#/detail/'+name);
            }
        }
    }
})();
