import styles from "./Input.module.css"
import clsx from "clsx";

export default function Input(props) {

    return (
        <input
            type="text"
            id={props.id}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.handleChange}
            className={clsx(
                {
                  [styles.inputlogin]: true
                }
              )
            }
        />
    )
}