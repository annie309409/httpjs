const express = require('express');
const app =  express();
const port = process.env.PORT || 3002;
const  indexRouter = require('./routes/index');
const  aboutRouter = require('./routes/about');
const  userRouter = require('./routes/user');
const path = require("path");
const logger = require('morgan'); //로그출력기

// 핸들바 설치 및 선언
const {engine}= require('express-handlebars');
//view 엔진설정
app.engine('hbs',engine({
    // 확장자명
    extname: '.hbs',
    // 기본으로 제공되는것, 레이아웃 : 없다면 main.hbs가 자동으로 설정됨
    //기본 레이아웃은 반드시 views/layouts/안에 존재시켜야 함
    defaultLayout : 'layout',
    //UI를 모듈화하여 따로 관리할 수 있게 적용
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}))
app.set('views',path.join(__dirname,'views'));
//핸들바 뷰 엔진 추가
app.set('view engine','hbs');



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
    console.log(err);
    res.status(500);
    res.sendFile(path.join(__dirname,'./public','500.html'));
});


app.listen(port,()=>{
    console.log('express 서버가 실행중입니다. 중지하려면 ctrl+c!');
});


//로그설정
app.use(logger('dev'));
