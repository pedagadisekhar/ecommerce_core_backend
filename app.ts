import express from 'express';
import * as bodyParser from 'body-parser';
import routes from './src/routes/userroutes';

import productroutes from './src/routes/userroutes';

import dotenv from 'dotenv';

dotenv.config();

const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());


// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

app.use('/api', routes);



export default app;