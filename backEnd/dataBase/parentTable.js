const {con}=require('./db');

module.exports=async function(){
var create='CREATE TABLE IF NOT EXISTS Parent(ID INT(6) AUTO_INCREMENT PRIMARY KEY,Name varchar(255),Occupation varchar(20))';
await con.query(create,(err,result)=>{
    if(err){
  throw err;
  }
  console.log("parentTable");
 
 
 })}