const express = require('express');
const logger = require('morgan');
require('dotenv').config();
const cors = require('cors');

const usersRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const messagesRouter = require('./routes/messagesRouter');
const questionRouter = require('./routes/questionRouter');
const commentRouter = require('./routes/commentRouter');
const answerRouter = require('./routes/answerRouter');
const voteRouter = require('./routes/voteRouter');

const corsOptions = {
	origin: true,

	methods: 'GET,POST,PUT,DELETE,OPTIONS',

	credentials: true,

	optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));

app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/messages', messagesRouter);
app.use('/questions', questionRouter);
app.use('/comment', commentRouter);
app.use('/answer', answerRouter);
app.use('/vote', voteRouter);

// error handler

app.use((err, req, res, next) => {
	console.error('in error handler');
	// set locals, only providing error in development

	res.locals.message = err.message;

	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 400).json({
		error: {
			message: err.message,
		},
	});
});

module.exports = app;