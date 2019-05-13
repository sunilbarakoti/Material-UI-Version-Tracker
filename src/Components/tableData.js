import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {Badge,ProgressBar} from 'react-bootstrap';
import Moment from 'react-moment';

const rowData = ["Version","Status","Progress","startDate","releaseDate","Description"];

const row = (x, index,handleRemove,startEditing,editIdx,handleChange,stopEditing) => {

  const currentlyEditing = editIdx === index; 
  
  function actionClick(e,index){
      let showCheck = false; 
      let dropdowns = document.getElementsByClassName("dropdown-content");
      if(document.getElementById(`myOptions${index}`).classList.contains("show")){
        showCheck = true;
      }
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
        }
      showCheck?document.getElementById(`myOptions${index}`).classList.remove("show"):document.getElementById(`myOptions${index}`).classList.toggle("show")

  }

  return (
    
    <TableRow key={`tr-${index}`}>
      {
        rowData.map((row1, k) => {
          if(row1 === "Status"){
            if(x[row1] === "IN PROGRESS"){
              return(<TableCell key={`tc-${k}`}><Badge variant="primary" className ="badgeClass">{x[row1]}</Badge></TableCell>)
            }else if(x[row1] === "UNRELEASED"){
              return(<TableCell key={`tc-${k}`} ><Badge variant="warning" className ="badgeClass">{x[row1]}</Badge></TableCell>)
            }else if(x[row1] === "RELEASED"){
              return(<TableCell key={`tc-${k}`} ><Badge variant="success" className ="badgeClass">{x[row1]}</Badge></TableCell>)
            }else{
              return(<TableCell key={`tc-${k}`}><Badge variant="primary" className ="badgeClass">IN PROGRESS</Badge></TableCell>)
            }
          }else if(row1 === "Progress"){
            return(<TableCell key={`tc-${k}`} ><ProgressBar variant="success" className ="progressBarClass"  now={x[row1]}/></TableCell>)
          }else if(row1 === "startDate" ||row1 === "releaseDate" ){
            if(x[row1] === ""){
              return(<TableCell key={`tc-${k}`} >{currentlyEditing ? (
              <TextField name={row1} onChange={(e) => handleChange(e,row1,index)} value = {x[row1]} />
            ) : ("--")
              }
              </TableCell>)               
            }else{
              return(<TableCell key={`tc-${k}`} >{currentlyEditing ? (
              <TextField name={row1} onChange={(e) => handleChange(e,row1,index)} value = {x[row1]} />
            ) : (<Moment format="MM/DD/YYYY">{x[row1]}</Moment>)
              }
              </TableCell>)
            }
          }else{return(
          <TableCell key={`tc-${k}`} >
            {currentlyEditing ? (
              <TextField name={row1} onChange={(e) => handleChange(e,row1,index)} value = {x[row1]} />
            ) : (x[row1]
              )}
          </TableCell>
        )}})
      }
      <TableCell key={`tcd-${index}`}
        style={{ fontWeight: 'bold', textIndent: '30%',position: 'relative' }}
        className ="dropbtn" 
      >{currentlyEditing ? (<i className="fa fa fa-check fa-1x"
                          style={{ color: 'grey', marginRight: '5px',cursor: 'pointer'}}
                          onClick= {() => (stopEditing())} >
                         </i>) : (<span style={{cursor: 'pointer' }} onClick={(e) => actionClick(e,index)}>...</span>)}
                <div key={index} id={`myOptions${index}`} className="dropdown-content myOptions">
          <span>
            <i
            className="fa fa fa-edit fa-2x"
            style={{ color: 'grey', marginTop: '4px', marginRight: '5px', marginLeft: '5px' }}
            onClick={() => (startEditing(index),document.getElementById(`myOptions${index}`).classList.toggle("show"))}
            ></i>
          </span>
          <span><i className="fa fa fa-trash fa-2x"
            style={{ color: 'red', marginRight: '5px' }}
            onClick={() => (handleRemove(index),document.getElementById(`myOptions${index}`).classList.toggle("show"))}
          ></i></span>
        </div>
      </TableCell>
    </TableRow>

  )
}
  
const tableData = ({header,data,handleRemove,startEditing,editIdx,handleChange,stopEditing}) =>{
  return (
    <div>
    <Paper style={{ maxHeight: 441, overflowY:'auto', width: '100%'}}>
      <Table>
        <TableHead style ={{position:'ab'}}>
          <TableRow>
            {header.map((x,i)=><TableCell key ={`thr-${i}`}>{x.name}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((x,index)=>row(x,index,handleRemove,startEditing,editIdx,handleChange,stopEditing))}
        </TableBody>
      </Table>
    </Paper>
    
    </div>
  );
}

export default tableData;