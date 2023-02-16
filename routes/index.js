const express =  require('express');
const router = express.Router();

//show index page
router.get('/',(req, res)=>{
    //일반 엔진
    // res.sendFile(path.join(__dirname,'../public','0index.html'));
    //handlebars뷰 엔진으로 응답처리
    //확장자를 쓸필요가 없음
    res.render('index',{title:'index페이지'});
});

//라우팅 설정을 일일이하는것이 번거로움
// router.get('/gr',(req, res)=>{
//     res.sendFile(path.join(__dirname,'../static/img','giraff.jpg'));
// });

//static폴더의 내용은 routing을 걸지않아도 바로 되게끔 하면됨
router.get('/sungjuk',(req, res)=>{
    //일반 엔진
    // res.sendFile(path.join(__dirname,'../public','0index.html'));
    //handlebars뷰 엔진으로 응답처리
    //확장자를 쓸필요가 없음
    res.render('sungjuk',{title:'성적페이지'});
});




router.post('/sungjuk',(req, res,next)=>{
    //폼으로 전송된 데이터 불러오기 > req.body, req.bidy.폼이름
    //console.log(req.body);
    let {name,kor,eng,math}=req.body;


    //데이터베이스 처리가능
    // 그러나, data는 목적에 맞게 사용되지않음
    // 성적처리
    let [tot,avg,grd]=[(+kor)+(+eng)+(+math),(kor+eng+math)/3,'가'];
    // 데이터베이스 처리> 성적테이블에 insert

    console.log(tot,avg,grd);
    // console.log(`이름${name},수학${math},영어${eng},국어${kor}`);
    // res.redirect(304,'/');
});

module.exports = router;

