import React from 'react';
import TextFields from '../form';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

import Sibling from './sibling';
import Joi from 'joi-browser';
import func from './fetch.js';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import Selects  from '../formSelect';
import auth from '../../httpService/apiRequestsStudent.js';

const StudentTable = () => {
React.useEffect(()=>{
  
student();

parent();
},[]);
async function student(){
  
const {data}=await func.getStudents();
changeStudentTab([...data]);

}  
async function parent(){
  const table=await func.getParents();

  changeTable([table]);

}



const handleEdit=async obj=>{//Put req
  changeName(obj.Name);changeEdit(true);changeAdd(true);changeGrade(obj.Grade);changeId(obj.ID);
changeParent(obj.ParentID);
  }
  
const handleSubmit=async()=>{//add & edit Data post,put submit req
  const check= {Name:Name,Grade:Grade};
  const {error}=Joi.validate(check, schema);

  if(error){
 return  toast.info(`${error.details[0].message}` )
}       
  const state={Name:Name,Grade:Grade,ParentID:Parent,ID:ID};
                if(edit===false){           
                const res=await auth.addStudent(state);
                if(res.status===200){
                
  const {data}=await func.getStudents();
  
  changeStudentTab([...studentTab,...data]);
changeName('');changeGrade('');changeParent('');changeAdd(false);
                toast.success("Submitted")

                }}
                else{
                  const table=[...studentTab];
const index =table.findIndex(e=>e.ID ===ID);

 table[index]={Name:Name,Grade:Grade,ID:ID,ParentID:Parent};
changeStudentTab(table);
changeName('');changeGrade('');changeParent('');changeAdd(false);
await auth.editStudent(state);
// this.setState({table,Name:'',Occupation:'',ID:'',add:false,edit:false});
// await auth.editParent(this.state);

                }
                }

              const handleDelete=async id=>{//Delete req
                  const tab=studentTab.filter(m=>m.ID !== id);
               
               changeStudentTab(tab);
               console.log(studentTab);
               await auth.deleteStudent(id);
                 }


                 const Search=async event=>{
                  if(event.target.value!==''){
                  const obj={search:event.target.value}
                    const result= await func.searchStudents(obj);
                    console.log(result);
                  changeStudentTab([...result.data])
                    
                  }
                  else{
                    const {data}=await func.getStudents();
                    
                    const table=[...data];
                    changeStudentTab([...table])
                    
                  }
                  }




const handleOptions=event=>{
  changeParent(event.target.value);
}
const form =()=>{
    return(   <div>  
        <TextFields label="Name" value={Name} onChange={e=>{changeName(e.target.value)} }></TextFields>
            <TextFields max ='2' value={Grade} onChange={e=>{changeGrade(e.target.value)}} label="Grade" ></TextFields>
            <Selects value={Parent} name='Parent Select' opt={table} onChange={handleOptions}></Selects>

<br></br>

             <button className="btn btn-sm btn-success" type="button" disabled={Name ==='' || Grade ==='' || Parent==='' } onClick={handleSubmit}>Submit</button>
                <button className="my-3 mx-2 btn-sm btn btn-danger" type="button" onClick={()=>{changeAdd(false);changeName('');changeGrade('');changeParent('')}}>Cancel</button> 
            </div>
  )
}
const [add,changeAdd]=React.useState(false);//for open form 
const [edit,changeEdit]=React.useState(false);//when clicked
const [Name,changeName]=React.useState('');//Form data
const [Grade,changeGrade]=React.useState('');//Form data
const [ID,changeId]=React.useState('');//For editing student
const [Parent,changeParent]=React.useState('');//Form data foregn key
const [table,changeTable]=React.useState([]);//Form data parents details
const [studentTab,changeStudentTab]=React.useState([]);//student data store from get req  
const [expand,changeExpand]=React.useState(false);//parents detail expand
const schema={
Name: Joi.string()
.required().regex(/^[a-zA-Z\s]*$/)
.label("Name").min(2).max(20),
Grade:Joi.string()
.required().alphanum()
.label("Grade").min(1).max(2),
}
return ( 


<div className="container-fluid">

    <h4>Student Table</h4>
    <TextField id="outlined-basic" onChange={e=>{Search(e)}}label={<SearchIcon></SearchIcon>} variant="outlined" size="small" /><br></br>
    <Button className="my-4" onClick={()=>changeAdd(true)} variant="contained" size="medium" color="primary">
          Add New
        </Button>

        {add && form()}
        {expand && <div>{console.log(Parent)}<Sibling parentID={Parent} label="Siblings"></Sibling></div>}
<table className="table">{console.log(Parent)}
  <thead>
    <tr>
    
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Grade</th>
        
      <th scope="col">ParentID</th>
        
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {studentTab.map((e=>{return <tr key={e.ID}>
    <th scope="row">{e.ID}</th>
    <td>{e.Name}<br></br><Link to={''} onClick={()=>{changeExpand(true);changeParent(e.ParentID)}}>See Siblings...</Link></td>
    <td>{e.Grade}</td>
    <td>{e.ParentID}</td>
   
      <td><IconButton onClick={()=>handleEdit(e)}><EditIcon style={{color:'#1976D2'}}/></IconButton></td>
     
      <td><IconButton onClick={()=>handleDelete(e.ID)}><DeleteIcon style={{color:'red'}}/></IconButton></td>
     
    </tr>}))}
  </tbody>
</table>



</div>

     );
}
 
export default StudentTable;