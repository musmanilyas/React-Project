const express = require("express");

const router = express.Router();
const {con}=require('../dataBase/db');




router.post('/addParent',async (req,res)=>{
        var create=`INSERT INTO parent ( Name, Occupation) VALUES ('${req.body.Name}', '${req.body.Occupation}')`;
     con.query(create,(err,result)=>{
        if(err){
      throw err;
      }
      console.log("1 Row affected ");
     res.send(req.body)
     
     });
})


router.post('/searchParent',async (req,res)=>{
  console.log(req.body);
  var create=`SELECT * FROM parent WHERE Name LIKE '%${req.body.search}%'`;
con.query(create,(err,result)=>{
  if(err){
throw err;
}
console.log(result);
res.send(result);

});
})



router.get('/getParent',async (req,res)=>{
       
        var create='SELECT * FROM parent';
   
    
            con.query(create, function (err, result, fields) {
              if (err) throw err;
              res.send(result);
            });
    })
    

    router.get('/searchStudent/:id',async (req,res)=>{
       
      var create=`SELECT * FROM student WHERE parentID='${req.params.id}'`;
 
  
          con.query(create, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
          });
  })
  




    
    
    router.delete('/delete/:id',async (req,res)=>{
      

      var chk= `SELECT * FROM student WHERE ParentID='${req.params.id}'`;
      
      con.query(chk, function (err, result) {
        if (err) throw err;
        if(  result.length ==0){
        
         var create=`DELETE FROM Parent WHERE ID = '${req.params.id}'`;
         
     
         con.query(create, function (err, result, fields) {
           if (err) throw err;
            return res.send(result);
         })
        
        }
      else{  
        create=`DELETE FROM student WHERE ParentID = '${req.params.id}'`;
        con.query(create, function (err, result, fields) {
          if (err) throw err;
          var create=`DELETE FROM Parent WHERE ID = '${req.params.id}'`;
         con.query(create, function (err, result, fields) {
          if (err) throw err;
           return res.status(200);
         })
         
        })
     
       
        res.send('ok');
      }

      });
    
  })
  
  router.put('/edit/:id',async (req,res)=>{
      
    var create=`UPDATE parent SET Name = '${req.body.Name}' ,Occupation = '${req.body.Occupation}' WHERE ID ='${req.params.id}'`;


        con.query(create, function (err, result, fields) {
          if (err) throw err;
          res.send(result);
        });
})

    







module.exports = router;