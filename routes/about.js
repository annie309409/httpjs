const express =  require('express');
const router = express.Router();
const html= 'text/html; charset=utf8';

//show index page
router.get('/',(req, res)=>{
    res.type(html);
    res.end(`<h1>어바웃 페이지입니다</h1>`);
});
router.get('/list',(req, res)=>{
    res.type(html);
    res.end(`<h1>어바웃 리스트입니다</h1>`);
});
router.get('/view',(req, res)=>{
    res.type(html);
    res.end(`<h1>어바웃 뷰입니다.</h1>`);
});

module.exports = router;