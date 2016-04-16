module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            roles: String
        }, {collection: 'JobMarket.user'});

    return UserSchema;

};