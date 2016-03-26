module.exports = function(app) {

    var userModel    = require("./models/user.models.js")();
    var companyModel = require("./models/company.models.js")();
    var userService  = require("./services/user.service.server.js") (app,userModel);
    var GlassdoorService  = require("./services/Glassdoor.service.server.js") (app,companyModel);
}