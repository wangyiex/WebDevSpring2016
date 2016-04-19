var q = require("q");

module.exports = function (db, mongoose) {

    // load user schema
    var CompanySchema = require("./company.schema.server.js") (mongoose);

    // create user model form schema
    var CompanyModel = mongoose.model('JMCompany', CompanySchema); // will do CRUD based on the schema we offered
    var api = {
        findReviews:findReviews,
        addReview:addReview,
        createReview:createReview
    };
    return api;

    function findReviews(name) {
        var deferred = q.defer();
        CompanyModel.findOne({name: name}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function addReview(companyname, user) {
        var deferred = q.defer();
        var review =
        {
            username:user.username,
            email:user.email,
            review:user.review
        };
        CompanyModel
            .update(
                {
                    name:companyname
                },
                {
                    $push: {reviews:review}
                },
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );
        return deferred.promise;
    }

    function createReview(companyname, user) {
        var deferred = q.defer();
        var review =
        {
            username:user.username,
            email:user.email,
            review:user.review
        };
        var company_review = {
            name:companyname,
            reviews:[review]
        }
        CompanyModel
            .create(company_review,function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );
        return deferred.promise;

    }
}