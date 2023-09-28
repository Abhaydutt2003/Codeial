const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
//const bodyParser = require("body-parser");
app.use(express.json({limit:'20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

const port = 8000;

//connect to db
const db = require('./config/mongoose');

//express session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');

//scss
const sassMiddleWare = require('node-sass-middleware');

//flash message
const flash = require('connect-flash');
const fMiddlerware = require('./config/flashMiddleware');

app.use(sassMiddleWare({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))


//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//use express layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//using static files
app.use(express.static('./assets'));

//make uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'))


//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');



app.use(session({
    name: 'codeial',
    //TODO change secret before production
    secret: 'NeverGonnaGiveYouUp',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost/codeial_development'
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthUser);


app.use(flash());
app.use(fMiddlerware.setFlash);

//use express router
app.use('/', require('./routes/index'));
// const router = require('./routes/index');
// router.use(bodyParser.json());
// app.use('/',router);

app.listen(port, function (error) {
    if (error) {
        console.log(`Error in starting the server ${port}`);
        return;
    } else {
        console.log(`The server is running on port ${port}`);
    }
});