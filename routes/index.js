const express =  require('express');
const path = require('path');
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

module.exports = router;

