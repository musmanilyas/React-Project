
import auth from '../../httpService/apiRequestsParent.js';
import auth2 from'../../httpService/apiRequestsStudent.js';
async function getParents(){
    const res =await auth.getParent();
if(res.status===200 || res.status<=200){

    return res.data;
}



}



async function getStudents(){
    const res =await auth2.getStudent();
if(res.status===200 || res.status<=200){

    return res;
}
}


async function getStudentById(id){
    const res =await auth.getStudentsByParentId(id);
if(res.status===200 || res.status<=200){

    return res.data;
}
}


async function searchParents(e){
    const res =await auth.searchParent(e);
if(res.status===200 || res.status<=200){

    return res;
}

}



async function searchStudents(e){
    const res =await auth2.searchStudent(e);
if(res.status===200 || res.status<=200){

    return res;
}

}


export default {getParents,searchParents,getStudents,getStudentById,searchStudents}