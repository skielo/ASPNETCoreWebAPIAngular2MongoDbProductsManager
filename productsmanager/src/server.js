var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    errorhandler = require('errorhandler'),
    csrf = require('csurf'),
    routes = require('./routes'),
    DB = require('./lib/accessDB'),
    seeder = require('./lib/dbSeeder'),
    app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(session({ 
    secret: 'productsmanagerdemo', 
    saveUninitialized: true,
    resave: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));
app.use(errorhandler());
// app.use(csrf());

// app.use(function (req, res, next) {
//     var csrf = req.csrfToken();
//     res.cookie('XSRF-TOKEN', csrf);
//     res.locals._csrf = csrf;
//     next();
// })

process.on('uncaughtException', function (err) {
    if (err) console.log(err, err.stack);
});


DB.startup(function() {
    //if (process.env.NODE_ENV === 'development') {
        seeder.init();
    //} 
});

// Routes
app.get('/', routes.index);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function () {
    console.log("ProdMgr Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

if (process.platform === "win32") {
    require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    }).on("SIGINT", function () {
        console.log('SIGINT: Closing MongoDB connection');
        DB.close();
    });
}

process.on('SIGINT', function() {
    console.log('SIGINT: Closing MongoDB connection');
    DB.close();
});

