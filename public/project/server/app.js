module.exports = function(app,db,mongoose) {


    var userModel    = require("./models/user.models.server.js")(db, mongoose);
    var companyModel = require("./models/company.models.server.js")(db, mongoose);
    var userService  = require("./services/user.service.server.js") (app,userModel);
    var GlassdoorService  = require("./services/Glassdoor.service.server.js") (app,companyModel);
}