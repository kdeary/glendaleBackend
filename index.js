let express = require('express');
let cors = require('cors')
let app = express();
let port = process.env.PORT || 3663;
// let mongoose = require('mongoose');
let bodyParser = require('body-parser');

let corsOptions = {
  origin: ''
}

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let routes = require('./api/routes/GDRoutes');
routes(app);


app.listen(port);


console.log('GLENDALE RESTful API server started on: ' + port);
