import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
    formControl: {
        width:200,
        
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
const  Selects= ({opt,onChange,name,value}) => {
    const [option,changeOption]=React.useState([...opt])
    const classes = useStyles();
    return ( 
        <FormControl className={classes.formControl} >
        <InputLabel id="demo-simple-select-helper-label" >{name}</InputLabel>
    
      <Select 
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          size="large"
          
          value={value}
          
          onChange={onChange}
          >{console.log(option)}
       <MenuItem value=''>
  </MenuItem>{opt[0].map(e=>{ return (
    
  <MenuItem style={{fontSize:'12px'}} value={e.ID} key={e.ID}>{e.Name}___<span className="text-muted">{e.Occupation}</span></MenuItem>
       )})}</Select>
        <FormHelperText>Select Parent of Student</FormHelperText></FormControl>  );
}
 
export default Selects;
