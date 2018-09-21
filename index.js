let express = require('express');
let cors = require('cors')
let app = express();
let port = process.env.PORT || 3663;
// let mongoose = require('mongoose');
let bodyParser = require('body-parser');

let adminRoutes = require('express').Router();

let corsOptions = {
  origin: ''
}

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

adminRoutes.use((req, res, next) => {
  // -----------------------------------------------------------------------
  // authentication middleware

  const auth = {login: 'admin', password: 'qdn92zw1'}; // change this

  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

  // Verify login and password are set and correct
  if (!login || !password || login !== auth.login || password !== auth.password) {
    res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
    res.status(401).send('Authentication required.'); // custom message

    return;
  }

  // -----------------------------------------------------------------------
  // Access granted...
  next();
});

app.use('/admin', adminRoutes);

adminRoutes.get('/', function(req, res){
	res.sendFile(__dirname + '/public/admin/index.html');
});

let routes = require('./api/routes/GDRoutes');
routes(app);


app.listen(port);


console.log('GLENDALE RESTful API server started on: ' + port);
