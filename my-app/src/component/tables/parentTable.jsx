import React,{Component} from 'react';
import uuid from 'uuid';
import TextFields from '../form';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import auth from '../../httpService/apiRequestsParent.js';
import Parent from './fetch.js';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import { Link } from 'react-router-dom';
import Child from './child';
class ParentTable extends Component {
    state = {add:false,edit:false,
       ID:'',
            Name:'',
            Occupation:'' ,
        table:[],
      child:[] ,childClicked:false,ParentID:''}


        schema = {
          Name: Joi.string()
            .required().regex(/^[a-zA-Z\s]*$/)
            .label("Name").min(2)
      
            .max(20),
            Occupation:Joi.string()
            .required().regex(/^[a-zA-Z\s]*$/)
            .label("Occupation").min(2).max(20),}

 async componentDidMount() { //Fetch data when component renders
  const data=await Parent.getParents();
  
  const table=[...data];
  this.setState({table});

}
handleEdit=async obj=>{//Put req
this.setState({edit:true,add:true,Name:obj.Name,Occupation:obj.Occupation,ID:obj.ID});
}

 handleDelete=async id=>{//Delete req 
  const res=await auth.deleteParent(id);
  console.log(res);
  if (res.data==="invalid"){
    console.log("if");
    toast.error(`Cannot Perform this..Data is used by another table`)}

else {

   const table=this.state.table.filter(m=>m.ID !== id);

this.setState({table});

}

  }

handleSubmit=async()=>{//add & edit Data post,put submit req
  const check= {Name:this.state.Name,Occupation:this.state.Occupation};
              const {error}=Joi.validate(check, this.schema);
     
              if(error){
             return  toast.info(`${error.details[0].path} Should be Alphabet only` )
            }
                if(this.state.edit===false){           
                const res=await auth.addParent(this.state);
                if(res.status===200){
                
  const data=await Parent.getParents();
  
  const table=[...data];
  this.setState({table});
                toast.success("Submitted")
                this.setState({Name:'',Occupation:'',add:false});
                }}
                else{
                  const table=[...this.state.table];
const index =table.findIndex(e=>e.ID ===this.state.ID);

table[index]={Name:this.state.Name,Occupation:this.state.Occupation,ID:this.state.ID};
this.setState({table,Name:'',Occupation:'',ID:'',add:false,edit:false});
await auth.editParent(this.state);

                }
                }
Search=async event=>{
if(event.target.value!==''){
const obj={search:event.target.value}
  const result= await Parent.searchParents(obj);
this.setState({table:result.data});
  
}
else{
  const data=await Parent.getParents();
  
  const table=[...data];
  this.setState({table});

}
}

 form =()=>{
        return(   <div>  
            <TextFields label="Name" value={this.state.Name} onChange={e=>{this.setState({Name:e.target.value})} }></TextFields>
                <TextFields value={this.state.Occupation} onChange={e=>{this.setState({Occupation:e.target.value})}} label="Occupation" ></TextFields>
                    <button className="my-3 btn btn-sm btn-success" type="button" disabled={this.state.Name ==='' || this.state.Occupation ==='' } onClick={this.handleSubmit}>Submit</button>
                    <button className="my-3 mx-2 btn-sm btn btn-danger" type="button" onClick={()=>this.setState({add:false,Name:'',Occupation:''})}>Cancel</button>
                </div>
      )
    }

    render() { 
        return (  
            <div className="container-fluid">
                 <h4>Parent Table</h4>
                
                 <TextField id="outlined-basic" onChange={e=>{this.Search(e)}}label={<SearchIcon></SearchIcon>} variant="outlined" size="small" /><br></br>

                <Button className="my-4" onClick={()=>{this.setState({add:true})}} variant="contained" size="medium" color="primary">
                      Add New
                    </Button>
            
                    {this.state.add &&  this.form()}
                    {this.state.childClicked && <Child parentID={this.state.ParentID} label='Childs Table'></Child>}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Occupation</th>
                    
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
               {this.state.table.map(m=>{return(
                <tr key={uuid()}>
               <th scope="row">{m.ID}</th>
                  <td>{m.Name}<br/><Link onClick={()=>{this.setState({childClicked:true,ParentID:m.ID})}} to={''}>See Child...</Link></td>
                  <td>{m.Occupation}</td>
                <td><IconButton  onClick={()=>this.handleEdit(m)}><EditIcon style={{color:'#1976D2'}}/></IconButton></td>
             <td><IconButton  onClick={()=>this.handleDelete(m.ID)}><DeleteIcon style={{color:'red'}}/></IconButton></td>
              </tr>)})}
              </tbody>
            </table>
            </div> );
    }
}
 
export default ParentTable;