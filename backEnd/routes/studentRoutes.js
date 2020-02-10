const express = require("express");
const router = express.Router();
const {con}=require('../dataBase/db');

router.post('/addStudent',async (req,res)=>{
console.log(req.body);
   var create=`INSERT INTO student ( Name,Grade,ParentID) VALUES ('${req.body.Name}', '${req.body.Grade}','${req.body.ParentID}')`;
con.query(create,(err,result)=>{
   if(err){
 throw err;
 }
 console.log("1 Row affected ");
res.send(req.body)

});
})


router.post('/searchStudent',async (req,res)=>{
  
  var create=`SELECT * FROM student WHERE Name LIKE '%${req.body.search}%'`;
  con.query(create,(err,result)=>{
     if(err){
   throw err;
   }
   
  res.send(result);
  
  });
  })

router.get('/getStudent',async (req,res)=>{

   var create='SELECT * FROM student';


       con.query(create, function (err, result, fields) {
         if (err) throw err;

         res.send(result);

       });
})


router.delete('/delete/:id',async (req,res)=>{
 
   
 var create=`DELETE FROM student WHERE ID = '${req.params.id}'`;


     con.query(create, function (err, result, fields) {
       if (err) throw err;
       res.send(result);
     });
})

router.put('/edit/:id',async (req,res)=>{
 
var create=`UPDATE student SET Name = '${req.body.Name}',Grade = '${req.body.Grade}',ParentID='${req.body.ParentID}' WHERE ID ='${req.body.ID}'`;


   con.query(create, function (err, result) {
     if (err) throw err;
     res.send(result);
   });
})


module.exports = router;