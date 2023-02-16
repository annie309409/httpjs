const express =  require('express');
const router = express.Router();
const axios = require('axios');


router.get('/',(req, res)=>{
    res.render('index',{title:'index페이지'});
});


router.get('/sungjuk',(req, res)=>{
    res.render('sungjuk',{title:'성적페이지'});
});

router.post('/sungjuk',(req, res,next)=>{
    const param = req.body;
    axios.post('http://localhost:3002/indexPoster',param).then((response)=>{
        console.log(response.data);
    }).catch((err)=>{
        console.error(err);
    })
    // let {name,kor,eng,math}=req.body;
    // let [tot,avg,grd]=[(+kor)+(+eng)+(+math),(kor+eng+math)/3,'가'];
    // console.log(tot,avg,grd);
});

module.exports = router;

