module.exports = function(mongoose) {

    var JobSchema = mongoose.Schema(
        {
            title:String,
            company:String,
            description:String,
            owner:String,
            applicants:[String],
        }, {collection: 'JobMarket.job'});

    return JobSchema;

};