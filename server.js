var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);
require ("./server/app.js")(app);

console.log("Starting Server...");
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;

if (typeof adr === "undefined") {
    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
    //  allows us to run/test the app locally.
    console.warn('No OPENSHIFT_NODEJS_IP var, using localhost');
    app.listen(port);
} else {
    app.listen(port, ipaddress, function() {
        console.log('%s: Node server started on %s:%d ...',
            Date(Date.now() ), ipaddress, port);
    });

}

console.log('Server running at http://localhost:3000')