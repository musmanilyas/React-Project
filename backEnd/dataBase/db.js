var mysql = require('mysql');
const express=require('express');

const DbName='db_sample';
var conn =function(){


  const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '' ,
   
  });

//DB connection
sql.connect((err)=>{

if(err){
  throw err;
  }
 console.log('Connected');



 //make database if not exsist
 })
 let create=`CREATE DATABASE IF NOT EXISTS ${DbName}`;
 sql.query(create,(err,result)=>{
   if(err){
 throw err;
 }
 console.log("DB created");


})


};
//Connection function for further use
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '' ,
database: DbName

});

exports.conn=conn;
//for further use for queries
exports.con=con;