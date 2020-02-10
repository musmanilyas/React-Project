import httpservices from "./httpService";


const uri = " http://localhost:3010/api/parent";


function addParent (app){
    return httpservices.post( uri + "/addParent", app);
}
function getParent (){


    return httpservices.get( uri + "/getParent");
}

function deleteParent (id){
    return httpservices.delete( uri + `/delete/${id}`);
}
function editParent (obj){
    return httpservices.put( uri + `/edit/${obj.ID}`,obj);
}


function searchParent (app){
    return httpservices.post( uri + "/searchParent", app);
}


function getStudentsByParentId (app){
    return httpservices.get( uri + `/searchStudent/${app}`);
}





export default {searchParent,getStudentsByParentId,
 addParent,getParent,deleteParent,editParent
}
