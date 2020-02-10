import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const TextFields=({label,defaultval,value,onChange,max})=> {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        
        <TextField
           maxLength={max}
          onChange={onChange}
                  label={label}
          defaultValue={defaultval}
          value={value}
          
        />
      </div></form>
  )}

  export default TextFields;