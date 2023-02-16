const express = require('express');
const app =  express();
const port = process.env.PORT || 3001;
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


// 라우팅파일을 걸어두는이유는 보안상이슈때문이다.
// 특정 리소스의 접근을 쉽게하면 해킹에 취약하다.
