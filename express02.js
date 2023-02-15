const express = require('express');
const app =  express();
const port = process.env.PORT || 3001;
const html= 'text/html; charset=utf8';
const path = require('path');
const  indexRouter = require('./routes/index');
const  aboutRouter = require('./routes/about');
const  userRouter = require('./routes/user');

//router handler
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/user', userRouter);


app.listen(port,()=>{
    console.log('express 서버가 실행중입니다. 중지하려면 ctrl+c!');
});
