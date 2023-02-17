const express = require('express');
const app =  express();
const port = process.env.PORT || 3008;
const  indexRouter = require('./routes/index');
const  aboutRouter = require('./routes/about');
const  userRouter = require('./routes/user');
const path = require("path");
const logger = require('morgan'); //로그출력기
//oracle 초기화 불러오기
const oracledb= require('./models/Oracle');

//form 처리기 미들웨어
const bodyParser = require('body-parser');

//오라클 인스턴스 클라이언트
oracledb.initConn();

//미들웨어 등록 및 설정
app.use(express.json());
// 인코딩해서 넘어온 데이터를 풀어서 보내줌
// 전송 데이터에 대한 urlencoding 위한 설정
app.use(express.urlencoded({extended:false}));
//전송된 폼 데이터는 json형식으로 보내줌
app.use(bodyParser.json()); //전송폼 데이터는 json형식
// app.use(bodyParser.raw());
// app.use(bodyParser.text());// text/plain일때 볼 수 있음 (비추)

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
