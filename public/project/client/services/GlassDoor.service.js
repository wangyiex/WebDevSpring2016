(function(){
    angular
        .module("JobMarketApp")
        .factory("GlassDoorService",GlassDoorService);

    function GlassDoorService($http,$location) {
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
          return $http.post("/api/project/getreviews/"+name);
        }

        function leftreview(companyname,user) {
          return $http.post("/api/project/putreview/"+companyname,user);
        }
    }
})();
