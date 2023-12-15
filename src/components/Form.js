import React, { useState } from "react";

function Form(props) {
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if( 0 !== name.length){
            props.addTask(name);
            setName("");
        }
    }
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