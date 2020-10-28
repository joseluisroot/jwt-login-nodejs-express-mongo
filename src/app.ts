import dotenv from 'dotenv';
dotenv.config();

import './database';
import express, {Application} from 'express';
import morgan from 'morgan';
import bodyparser from 'body-parser';
import cors from 'cors';

const app:Application = express();

// settings
app.set('PORT', process.env.PORT || 3001)

//middlewares
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(morgan('dev'))


// import routes
import authRoutes from './routes/auth';
import dashboadRoutes from './routes/dashboard';

// route middlewares
app.use('/api/dashboard', dashboadRoutes);
app.use('/api/user', authRoutes);

// app.get('/', (req, res) => {
//     res.json({
//         estado: true,
//         mensaje: 'funciona!'
//     })
// });


export default app