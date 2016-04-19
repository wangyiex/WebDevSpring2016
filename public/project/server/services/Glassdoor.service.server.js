
module.exports = function(app, companyModel) {

    app.post("/api/project/getreviews/:name",getReviews);
    app.post("/api/project/putreview/:companyname", putReview);

    function getReviews(req, res) {
        var name = req.params.name;
        companyModel
            .findReviews(name)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function putReview(req,res) {
        var companyname = req.params.companyname;
        var user = req.body;
        companyModel
            .findReviews(companyname)
            .then(
                function(reviews){
                    if(reviews == null) {
                        return companyModel.createReview(companyname, user)
                            .then(
                                // fetch all the users
                                function(){
                                    return companyModel.findReviews(companyname);
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return companyModel.addReview(companyname,user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(reviews){
                    return companyModel.findReviews(companyname);
                },
                function(){
                    res.status(400).send(err);
                }
            )
            .then( function (review) {
                res.json(review);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

}