// 내장 라이브러리
const http =  require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const html= 'text/html; charset=utf8';

//요청에따라 파일을 전송하는 함수

function serveStaticFile(res,fname){
    // fetch와 비슷하게 작동(비동기 작동)
    fs.readFile(path.join(__dirname,'public',fname),(error,data)=>{
        //파일을 읽을때 에러가 발생하면
        if(error){
            // 500번 오류 발생
            res.writeHead(500,{'Content-Type':html});
            // 함수실행후 종료
            return res.end('<h1>파일 처리중 오류발생😥</h1>');
        }
        res.writeHead(200,{'Content-Type':html});
        res.end(data);
    });
}

//서버생성
//콜백함수는 서버 응답부분 req:요청 res:응답
//localhost:3000 요청시 path를 세분화 하여 처리할 수 있음
//요청 path :/user
// 요청 path :/about
// 그외나머지
const server=  http.createServer((req, res)=>{
    //서버응답 처리부분
    //응답코드 200, 응답 데이터 형식지정
    // res.writeHead(200,{'Content-Type':'text/plain'});
    // //응답 메세지 전송
    // res.end('hello world!');
    const html= 'text/html; charset=utf8';

    // req.url은 응답받은 url로, url경로가 다음과 같은 케이스 이면,
    // 다른 페이지로 응답한다.
    // Routing이라고 함
    switch (req.url){
        case '/':
            serveStaticFile(res,'index.html');
            break;
        case '/user':
            serveStaticFile(res,'user.html');
            break;
        case '/about':
            serveStaticFile(res,'about.html');
            break;
        default :
            serveStaticFile(res,'404.html');
    }

    // 서버자원가져올때 :get! : 데이터를 서버로보내야한다면 쿼리스트링을 사용함
    // 서버에 자원을 새로등록할때 :post!
    // 주소를보고 요청을알아낼수있는것이 rest의 장점이다.
    // http를 사용하면 클라이언트가누구든상관없이 같은방식으로 서버와소통

});
server.listen(port,()=>{
    console.log('서버가 실행중입니다. 중지하려면 ctrl+c!');
});
//서버에는 요청과 응답이 반드시 필요하다.
//서버요청
//서버 응답
//이벤트 리스너를 미리 등록해야함 (요청이왔을때 어떻게 할 것인지..)





