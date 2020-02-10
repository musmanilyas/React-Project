import React,{Component} from 'react';
import TextFields from './form';

import auth from '../httpService/apiRequestsParent.js';
export const CTX = React.createContext();

//class commponent || state component
class ParentForm extends Component {
    state = {  name:"",
occupation:""}



handleSubmit=async()=>{
const res=await auth.addParent(this.state);
console.log(res);
}



    render() { 
        return (    
            
            <div>  
        <TextFields label="Name" value={this.state.name} onChange={e=>{this.setState({name:e.target.value})} }></TextFields>
            <TextFields value={this.state.occupation} onChange={e=>{this.setState({occupation:e.target.value})}} label="Occupation" ></TextFields>
<button className="my-3 btn btn-success" type="button" disabled={this.state.name ==='' || this.state.occupation ==='' } onClick={this.handleSubmit}>Submit</button>
            </div>
    );
    }
}
 
export default ParentForm;