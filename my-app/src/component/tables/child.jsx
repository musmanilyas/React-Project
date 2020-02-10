import React ,{Component} from 'react';

import fetch from './fetch';



class Child extends Component {
    state = {table:[]  ,ID:''}
    

    async componentDidMount() {
        const res=await fetch.getStudentById(this.props.parentID);
        console.log(res);
        const table=[...res];
    
        this.setState({table,ID:this.props.parentID});
    }
   async componentDidUpdate(prevProps, prevState) {
    
    if (prevProps.parentID !== this.props.parentID){ 
        
        const res=await fetch.getStudentById(this.props.parentID);
        console.log(res);
        const table=[...res];
    
        this.setState({table});}
    }
    
    render() { 
        const {label}=this.props;

    return (<div><h4>{label}</h4>{this.state.table ===0 && <div><p className='alert alert-primary'> No Child for this Parent</p><br></br></div>}
{this.state.table!==0 && <div><table className="table table-dark my-4">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Grade</th>
      
    </tr>
  </thead>
  <tbody>
  {this.state.table.map(e=>{ return <tr key={e.ID}>
     <th scope="row" >{e.ID}</th>

  <td>{e.Name}</td>
  <td>{e.Grade}</td>
    </tr>})}
  </tbody></table><br></br></div>}</div>


          );
    }
}
 
export default Child;