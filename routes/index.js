const express =  require('express');
const router = express.Router();
const sungjuk = require('../models/Sungjuk')

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
    //한번에짜는거, req.method를 사용
    //확장자를 쓸필요가 없음
    res.render('sungjuk',{title:'성적페이지'});
});
router.get('/showsungjuk',async(req, res)=>{
    let sjs = new sungjuk().select().then(async result => {
        return await result;
    });

    // 보내기
    res.render('showsungjuk',{title:'성적 전체보기',sjs:await sjs});
});
router.get('/viewsungjuk/',async(req, res)=>{
    //querystring의 매개변수 추출
    let sjno = req.query.sjno;
    let sjs = new sungjuk().selectOne(sjno).then(async result => {
        return await result;
    });
    // 보내기
    res.render('viewsungjuk',{title:'성적 상세보기',sjs:await sjs});
});

router.post('/sungjuk',(req, res,next)=>{
    //폼으로 전송된 데이터 불러오기 > req.body, req.body.폼이름
    //console.log(req.body);
    let {name,kor,eng,math}=req.body;
    // new sungjuk(name,kor,eng,math).insert();
    new sungjuk(name,kor,eng,math).insert();

    res.redirect(304,'/user');
});
module.exports = router;

