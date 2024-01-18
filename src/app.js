const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')

const app = express();

//conneting to db
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('db connected'))
    .catch(err =>console.log(err))

//importar rutas
const indexRoutes = require('./routes/index');


//configuración
app.set('port',  3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'),

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', indexRoutes);


//iniciando el servidor
app.listen(app.get('port'), () =>{
    console.log(`serve on port ${app.get('port')}`);

});