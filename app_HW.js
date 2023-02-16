const express = require('express');
const app =  express();
const path = require('path');
const port = process.env.PORT || 3002;
const  indexRouter = require('./routes/index1');
const  aboutRouter = require('./routes/about1');
const  userRouter = require('./routes/user1');
const  indPoster = require('./routes/indexPoster');
const logger = require('morgan');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

const {engine}= require('express-handlebars');

app.engine('hbs',engine({
    extname: '.hbs',
    defaultLayout : 'layout',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');


app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/user', userRouter);
app.use('/indexPoster', indPoster);

app.use(express.static(path.join(__dirname,'static')));

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
