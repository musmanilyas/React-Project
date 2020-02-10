const express=require('express');
const app =express();
var cors = require("cors");
//const config=require("config");
const parent=require('./routes/parentRoutes');
const student=require('./routes/studentRoutes');
const {conn}=require('./dataBase/db'); // call db connection
conn();//connecting to db
require('./dataBase/parentTable')();//making table if not exsist

require('./dataBase/studentTable')();//making table if not exsist
app.listen(3010,()=>{ console.log("Listening to port 3010")});
app.use(cors());
app.use(express.json());
app.use('/api/parent',parent);
app.use('/api/student',student);

