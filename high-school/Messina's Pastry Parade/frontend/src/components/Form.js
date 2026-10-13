"use client"
import Input from "./Input";

function Form(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit?.();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input placeholder={props.placeholder} handleChange={props.handleChange} />
        </form>
    );
}

export default Form;