const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
// const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//-----security --------
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
//-----security --------

//load env file
dotenv.config({ path: './config/config.env' });

//connect db
connectDB();

//route files
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const post = require('./routes/post');
const job = require('./routes/job');

const app = express();

//body parser
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cookie parser
app.use(cookieParser());

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//file upload
// app.use(fileUpload());

//---------------------security--------------------------

//sanitize date
app.use(mongoSanitize());
//set security headers
app.use(helmet());
//prevent XSS attacks
app.use(xss());
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);
// Prevent http param pollution
app.use(hpp());
// Enable CORS
app.use(cors());

//---------------------security--------------------------

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//mount routers
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/post', post);
app.use('/api/job', job);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Bam Bam in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//handle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Err: ${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
