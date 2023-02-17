const oracledb  = require('../models/Oracle');
const mariadb  = require('../models/maria');

class Sungjuk{
    // 데이터베이스 처리> 성적테이블에 insert
    oraclesql = 'insert into sungjuk (sjno, name, kor, eng, math, tot, avg, grd) values (sjno.nextval,:1,:2,:3,:4,:5,:6,:7)'
    selectsql = `select sjno,name,kor,eng,math,to_char(regdate,'YYYY-MM-DD') regdate from sungjuk order by sjno desc `
    selectOnesql = `select sjno,name,kor,eng,math,tot,avg,grd, to_char(regdate,'YYYY-MM-DD HH:MI:SS') regdate from sungjuk where sjno = :1 `
    options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    }
    mariasql='insert into sungjuk (name, kor, eng, math, tot, avg, grd) values (?,?,?,?,?,?,?)'
    //생성자 정의- 변수 초기화
    //매개변수로 전달된 값이 클래스 멤버변수로 대입
    constructor(name,kor,eng,math,tot,avg,grd) {
        this.name =  name;
        this.kor=kor;
        this.eng=eng;
        this.math=math;
        this.tot=tot;
        this.avg=avg;
        this.grd=grd;
    }
    datas(){
        let tot = parseInt(this.kor)+parseInt(this.eng)+parseInt(this.math);
        let avg =  tot/3;
        let grd='';
        if(avg>=90) grd='수';
        else if(avg>=80) grd='우';
        else if(avg>=70) grd='미';
        else if(avg>=60) grd='양';
        else grd='가';
        return {tot,avg,grd}
    }
    //성적저장
    async insert(){
        let conn = null;

        let params = [this.name,this.kor,this.eng,this.math,this.datas().tot,this.datas().avg,this.datas().grd];
        try{
            //모듈화 해서 가져옴
            conn =await oracledb.makeConn();
            let result = await conn.execute(this.oraclesql,params);
            conn.commit();
        }catch (e){
            console.log(e)
        }finally {
            // 모듈화 해서 가져옴
            await oracledb.closeConn(conn);
        }
        // console.log(tot,avg,grd,name);
    }

    async insertMaria(){
        let conn = null;
        let params = [this.name,this.kor,this.eng,this.math,this.datas().tot,this.datas().avg,this.datas().grd];
        try{
            //모듈화 해서 가져옴
            conn =await mariadb.makeConn();
            let result = await conn.execute(this.mariasql,params);
            conn.commit();
        }catch (e){
            console.log(e)
        }finally {
            // 모듈화 해서 가져옴
            await mariadb.closeConn(conn);
        }
    }


    //성적전체 조회
    async select(){
        let conn = null;
        let result = null;
        let sjs = [];
        try{
            conn = await oracledb.makeConn();
            result = await conn.execute(this.selectsql,[],this.options);
            let rs = await result.resultSet;
            let row = null;
            //하나씩 sunjuck으로 보냄
            while ((row = await rs.getRow())){
                let sj = new Sungjuk(row[1],row[2],row[3],row[4]);
                sj.sjno = row[0];
                sj.regdate = row[5];
                sjs.push(sj);

            }
        }catch (e){
            console.log(e);
        }finally {
            await oracledb.closeConn(conn);
        }
        return await sjs;
    }
    //성적 상세
    async selectOne(sjno){
        let conn = null;
        let result = null;
        let sjs = [];
        try{
            conn = await oracledb.makeConn();
            result = await conn.execute(this.selectOnesql,[sjno],this.options);
            let rs = await result.resultSet;
            let row = null;
            //하나씩 sunjuck으로 보냄
            while ((row = await rs.getRow())){
                let sj = new Sungjuk(row[1],row[2],row[3],row[4],row[5],row[6],row[7]);
                sj.sjno = row[0];
                sj.regdate = row[8];
                sjs.push(sj);
            }
        }catch (e){
            console.log(e);
        }finally {
            await oracledb.closeConn(conn);
        }
        return await sjs;

    }
}

module.exports = Sungjuk;