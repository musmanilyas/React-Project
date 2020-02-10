const {con}=require('./db');

module.exports=function(){
var create=`CREATE TABLE IF NOT EXISTS Student(ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,Name varchar(255),Grade varchar(2),ParentID int,CONSTRAINT FK1 FOREIGN KEY (ParentID) REFERENCES Parent(ID))`;
con.query(create,(err,result)=>{
    if(err){
  throw err;
  }
  console.log("studentTable");
 
 
 })}