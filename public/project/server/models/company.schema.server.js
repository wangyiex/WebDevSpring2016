module.exports = function(mongoose) {

    var CompanySchema = mongoose.Schema(
        {
            name:String,
            reviews:[{"username":String,email:String,"review":String,"time":{type:Date,default:Date.now()}}],
        }, {collection: 'JobMarket.company'});

    return CompanySchema;

};