const express = require('express');
const http = require("http");
const app =  express();
const port = process.env.PORT || 3001;
const html= 'text/html; charset=utf8';
let lists  = ['/','/user','/about','/user/add', '/user/list'];
let title  = ['인덱스입니다','유저입니다','어바웃트','가입페이지','회원목록'];
//라우팅 설정: app.메서드(경로,콜백함수)

//라우팅패스 추가분 - 파일이 복잡해진다.

lists.forEach((e,idx)=>{
    app.get(e,(req, res)=>{
        res.type(html);
        res.end(`<h1>${title[idx]}</h1>`);
    });
});

// 페이지가 없을땐 use를 활용한다.
app.use((req, res)=>{
    res.type(html);
    res.status(404);
    res.end('<h1>존재하지않아요!</h1>');
});


app.listen(port,()=>{
    console.log('express 서버가 실행중입니다. 중지하려면 ctrl+c!');
});