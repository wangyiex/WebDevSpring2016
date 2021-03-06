var express      = require('express');
var app           = express();
var bodyParser   = require('body-parser');
var multer        = require('multer')
var passport       = require('passport')
var cookieParser = require('cookie-parser');
var session       = require('express-session');
var mongoose    = require("mongoose");

//create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/formmaker';

//use remote connection string
//if running in remote server
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

//  connect to the database
var db = mongoose.connect(connectionString);
var cookie_secret = "yidong123";
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var cookie_secret1 = process.env.COOKIE_SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
multer();
app.use(session({
    secret: cookie_secret,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);