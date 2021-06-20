import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

function Todo(props) {
    const styles = {
        fontStyle: "italic",
        color: "#5f5f5f",
        textDecoration: "line-through"
    };
    return (
        <div className= "todo--item">
           <input 
            type="checkbox" 
            checked={props.item.checked} 
            onChange = {() => props.handleCheck(props.item.key)}
            />
           <p style = {props.item.checked ? styles : null}>{props.item.value}</p>
           <button onClick = {() => props.handleDelete(props.item.key)}>
                <DeleteIcon />    
           </button> 
        </div>
    )
}

export default Todo

{/* <i className='fas fa-trash-alt'></i> */}
