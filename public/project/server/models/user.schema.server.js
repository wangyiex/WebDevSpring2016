module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            role: String,
            resume:String,
            photo:{type:String,default:"../public/uploads/1.jpg"},
            likes:{type:[String],default: ["alice"]}
        }, {collection: 'JobMarket.user'});

    return UserSchema;

};