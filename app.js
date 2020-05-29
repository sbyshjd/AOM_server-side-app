//use the variable store in the .env file
//use the process.env.VARIABLE name to use the variable value
require('dotenv').config();

//use express to create the basic server
const express      = require('express');
//node.js file system package to get the abs path of current folder
const path         = require('path');
//Parse Cookie header and populate req.cookies with an object keyed by the cookie names. what does it means?
const cookieParser = require('cookie-parser');
//Parse the body of the req.
const bodyParser   = require('body-parser');
// how to use morgan? the log out helper to tell the server where to put the console.log output
const logger       = require('morgan');
// express-session
const session      = require('express-session');
//persistence the session in mongodb
const MongoStore = require('connect-mongo')(session);
//use cors to connect the front-end(react) with back-end(express)
const cors         = require('cors');



//mongoose to connect the mongodb by mongoose
const mongoose = require('mongoose');
mongoose
.connect('mongodb://localhost/aom-server-side-app', {useNewUrlParser: true,useUnifiedTopology: true})
.then(x=> {
    console.log(`Connected to the database: ${x.connections[0].name}`)
})
.catch(err => {
    console.log(`Error connecting to mongodb:`,err)
})


const app = express();

//? require the json file and use it directly?
const app_name = require('./package.json').name;
//how to use debug like the ironhackgenerator or in the express generator
const debug = require('debug')('aom-server-side-app:server');
// const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

app.use(logger('dev'));
//in ironhack we use bodyParser but in express generator we use express
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//open the public folder for the accessible 
app.use(express.static(path.join(__dirname, 'public')));

//use the cookie-session and passport.js to login the user
app.use(session({
    secret:'architecture office management application as the ironhack final project',
    resace: false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*60*24},
    store: new MongoStore({mongooseConnection:mongoose.connection})
}));

require('./passport/main')(app);

//cors to connect the front-back end
app.use(cors({
    credentials:true,
    origin:['http://localhost:3000']
}));




const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);



module.exports = app;
