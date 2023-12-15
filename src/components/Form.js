// Importing files and componensts.
import React, { useState } from "react";

// Creating the Form component
function Form(props) {
    // Creating state to set name for adding a todo
    const [name, setName] = useState("");

    // Function to check for empty todo name
    function handleSubmit(e) {
        e.preventDefault();
        if( 0 !== name.length){
            props.addTask(name);
            setName("");
        }
    }

    // Function to update state
    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
                placeholder="Add your tasks"
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}

export default Form;