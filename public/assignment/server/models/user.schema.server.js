module.exports = function(mongoose) {

    //user mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        userame: String,
        password: String,
        firstName : String,
        lastName: String,
        email :String,
        roles :[String]
    }, {collection: 'showuser'}); // to do meta configuration to the entire schema define the name of the collection, if you don't provide this, mongoose will create a default name/for you
    return UserSchema;
};