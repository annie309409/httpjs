const express = require('express');
const app =  express();
const port = process.env.PORT || 3002;
const  indexRouter = require('./routes/index');
const  aboutRouter = require('./routes/about');
const  userRouter = require('./routes/user');
const path = require("path");
const logger = require('morgan'); //로그출력기

//router handler
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/user', userRouter);

// static을 사용하게되면 router를 거치지 않아도 됨
app.use(express.static(path.join(__dirname,'static')));

// 404처리
app.use((req, res)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,'./public','404.html'));
});

app.use((err,req, res,next)=>{
    res.status(500);
    res.sendFile(path.join(__dirname,'./public','500.html'));
});


app.listen(port,()=>{
    console.log('express 서버가 실행중입니다. 중지하려면 ctrl+c!');
});


//로그설정
app.use(logger('dev'));
