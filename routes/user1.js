const express =  require('express');
const path = require("path");
const router = express.Router();
// const html= 'text/html; charset=utf8';

//show index page
router.get('/',(req, res)=>{
    // res.sendFile(path.join(__dirname,'../public','user.html'));
    res.render('user',{title:'유저페이지'});
});

// router.get('/list',(req, res)=>{
//     res.type(html);
//     res.end(`<h1>user리스트입니다.</h1>`);
// });
// router.get('/view',(req, res)=>{
//     res.type(html);
//     res.end(`<h1>user view입니다.</h1>`);
// });



module.exports = router;