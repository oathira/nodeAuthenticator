const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const passportGoogle = require('./config/passport_google_oauth2_startegy');
const jwt = require('jsonwebtoken');

const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

app.use(express.json())
app.use(express.urlencoded({extended:false}));
const JWT_SECERT = "something"

app.use(cookieParser());

app.use(express.static('./assets'))
app.use(expressLayouts);


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name : 'nodeauthentication',
    secret : 'something',
    saveUninitialized : false,
    resave : false,
    cookie :{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }),
  
    function(err) {
        console.log(err || 'connect mongodb setup ok');
    }
  }))

app.use(passport.initialize())
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){console.log(`error in running the server:${err}`);}
    console.log(`Server is running on port:${port}`);
})