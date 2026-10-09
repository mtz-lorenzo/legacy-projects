// Terminal --> Npm run dev

"use client"

import Login from "@/components/Login";
import Register from "@/components/Register";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/app/page.module.css";


export default function loginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMode, setLoginMode] = useState(true);

    async function handleLogin() {
        console.log(username, password);

        let datos = {
            username: username,
            password: password
        }

        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const respuesta = await response.json();
        if (respuesta.length != 0) {
            router.push("/sala");
        } else
            alert("Datos incorrectos");
    }

    async function handleRegister() {
        let datos = {
            username: username,
            password: password
        }
        console.log(datos);
        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const respuesta = await response.json();
        if (respuesta.length != 0) {
            router.push("/sala");
        } else
            alert("Datos incorrectos");
    }

    function handleInputs(event) {
        if(event.target.id == "username") {
            setUsername(event.target.value)
        } else if (event.target.id == "password") {
            setPassword(event.target.value)
        }
    }

    return (
        <div className={styles.container}>
          {loginMode ? (
            <div className={styles.loginContainer}>
              <h3 className={styles.heading}>Inicie Sesión</h3>
              <Login onClick={handleLogin} onChange={handleInputs} />
              <a className={styles.link} onClick={() => setLoginMode(false)}>¿Todavía no te registraste?</a>
            </div>
          ) : (
            <div className={styles.registerContainer}>
              <h3 className={styles.heading}>Regístrese</h3>
              <Register onClick={handleRegister} onChange={handleInputs} />
              <a className={styles.link} onClick={() => setLoginMode(true)}>¿Ya estás registrado? Inicia sesión</a>
            </div>
          )}
        </div>
      );
    }