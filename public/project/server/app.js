module.exports = function(app) {

    var userModel    = require("./models/user.models.js")();
    var userService  = require("./services/user.service.server.js") (app,userModel);

}