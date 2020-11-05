
require('dotenv').config();
require('./database');
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

// settings
app.set('PORT', process.env.PORT || 3001)

// cors
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

//middlewares
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(morgan('dev'))


// import routes
const authRoutes = require('./routes/auth');
const dashboadRoutes = require('./routes/dashboard');

// route middlewares
app.use('/api/dashboard', dashboadRoutes);
app.use('/api/user', authRoutes);

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});


module.exports = app;