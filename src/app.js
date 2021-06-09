const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const restrictedRouteMiddleware = require('./middlewares/restrictedRouteMiddleware.js');

const indexRouter = require('./controllers/indexRouter.js');
const reportsRouter = require('./controllers/reportsRouter.js');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(restrictedRouteMiddleware);
app.use('/', indexRouter);
app.use('/reports', reportsRouter);


module.exports = app;
