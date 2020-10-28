require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
require('./database')


const app = express();

// settings
app.set('PORT', process.env.PORT || 3001)

//middlewares
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(morgan('dev'))


// import routes
const authRoutes = require('./routes/auth');
const dashboadRoutes = require('./routes/dashboard');

// route middlewares
app.use('/api/dashboard', dashboadRoutes);
app.use('/api/user', authRoutes);

// app.get('/', (req, res) => {
//     res.json({
//         estado: true,
//         mensaje: 'funciona!'
//     })
// });


module.exports = app;