const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
//Setting
app.set('port', process.env.PORT || 3000);
mongoose.connect('mongodb://localhost:27017/mevn-database')
   .then(db => console.log('DB is connected'))
   .catch(err => console.error(err));
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Routes
app.use('/api/tasks',require('./routes/tasks'));
//Static files
app.use(express.static(__dirname + '/public'));
//Server is listening
app.listen(app.get('port'), () => {
   console.log('Server on port '+ app.get('port'));
});