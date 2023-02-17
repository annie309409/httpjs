const express =  require('express');
const oracledb =  require('oracledb');
const dbconfig =  require('../dbconfig');
const router = express.Router();

//oracle 한번만 실행
try{
    oracledb.initOracleClient({libDir:'C:/Java/instantclient_19_17'});
}catch (e) {
    console.log(e);
}


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

router.post('/sungjuk',async (req, res,next)=>{
    //폼으로 전송된 데이터 불러오기 > req.body, req.body.폼이름
    //console.log(req.body);
    let {name,kor,eng,math}=req.body;
    kor = parseInt(kor);
    eng = parseInt(eng);
    math = parseInt(math);

    //데이터베이스 처리가능
    // 그러나, data는 목적에 맞게 사용되지않음
    // 성적처리
    let [tot,avg]=[kor+eng+math,(kor+eng+math)/3];
    let grd ='';
    if(avg>=90) grd='수';
    else if(avg>=80) grd='우';
    else if(avg>=70) grd='미';
    else if(avg>=60) grd='양';
    else grd='가';
    // 데이터베이스 처리> 성적테이블에 insert
    let sql = 'insert into sungjuk (sjno, name, kor, eng, math, tot, avg, grd) values (sjno.nextval,:1,:2,:3,:4,:5,:6,:7)';
    let params = [name,kor,eng,math,tot,avg,grd];
    let conn = null;
    try{
        conn = await oracledb.getConnection(dbconfig);
        let result = await conn.execute(sql,params);
        conn.commit();
        console.log(await result);
    }catch (e){
        console.log(e)
    }finally {
        if(conn){
            try{
            await conn.close();
            }catch (e){
                console.log(e);
            }
        }
    }


    console.log(tot,avg,grd,name);
    // console.log(`이름${name},수학${math},영어${eng},국어${kor}`);
    res.redirect(304,'/user');
});
module.exports = router;

