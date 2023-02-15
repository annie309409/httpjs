// 내장 라이브러리
const http =  require('http');
//환경변수에 포트가있으면 쓰고 아니면 3000번을 쓰겠다.
//데이터
const port = process.env.PORT || 3000;
//서버생성
//콜백함수는 서버 응답부분 req:요청 res:응답
//localhost:3000 요청시 처리되는 부분
const server=  http.createServer((req, res)=>{
    //서버응답 처리부분
    //응답코드 200, 응답 데이터 형식지정
    res.writeHead(200,{'Content-Type':'text/plain'});
    //응답 메세지 전송
    res.end('hello world!');
});
server.listen(port,()=>{
    console.log('서버가 실행중입니다. 중지하려면 ctrl+c!');
});
//서버에는 요청과 응답이 반드시 필요하다.
//서버요청
//서버 응답
//이벤트 리스너를 미리 등록해야함 (요청이왔을때 어떻게 할 것인지..)





