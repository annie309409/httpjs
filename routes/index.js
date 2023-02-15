const express =  require('express');
const router = express.Router();
const html= 'text/html; charset=utf8';

//show index page
router.get('/',(req, res)=>{
    res.type(html);
    res.end(`<h1>index 페이지입니sadasda다</h1>`);
});

module.exports = router;