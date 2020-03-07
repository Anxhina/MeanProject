const express = require('express');
const router = express.Router();

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./models/user');
const config = require('./config/database');
require('./config/passport')(passport);



//Connection to database
mongoose.connect(config.database);
  mongoose.connection.on('connected', () =>{
      console.log('Connected to database' +config.database)
  })

  mongoose.connection.on('error', () =>{
    console.log('Database error' +err);
})

const app = express();


const users = require('./routes/users');



const port = 3000;

//Cors Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));



//passport.use(new localStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

app.use('/users', require('./routes/users'));
const blogs = require('./routes/blog')(router);

app.use('/blogs', blogs);


//Index Router
app.get('/', (req, res) => {
res.send('Invadoiel');
})

app.listen(port, () => {
    console.log('Server started on port '+port);
});
