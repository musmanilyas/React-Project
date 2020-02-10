import httpservices from "./httpService";


const uri = " http://localhost:3010/api/student";


function addStudent (app){
    return httpservices.post( uri + "/addStudent", app);
}
function getStudent (){


    return httpservices.get( uri + "/getStudent");
}

function deleteStudent (id){
    return httpservices.delete( uri + `/delete/${id}`);
}
function editStudent (obj){
    console.log(obj);
    return httpservices.put( uri + `/edit/${obj.ID}`,obj);
}


function searchStudent (app){
    return httpservices.post( uri + "/searchStudent", app);
}



export default {
 addStudent,getStudent,deleteStudent,editStudent,searchStudent
}
