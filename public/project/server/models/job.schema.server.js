module.exports = function(mongoose) {

    var JobSchema = mongoose.Schema(
        {
            title:String,
            company:String,
            description:String,
            owner:String,
            applicants:[{"username":String,"email":String}],
        }, {collection: 'JobMarket.job'});

    return JobSchema;

};