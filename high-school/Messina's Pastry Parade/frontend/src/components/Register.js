import Button from "./Button";
import Input from "./Input";

export default function Register(props) {
    return(
        <div>
            <Input id="username" handleChange={props.onChange} placeholder="Ingrese usuario"></Input>
            <Input id="password" type="password" handleChange={props.onChange} placeholder="Ingrese contraseña"></Input>            <Button onClick={props.onClick} text="Enviar"></Button>
        </div>
    )
}