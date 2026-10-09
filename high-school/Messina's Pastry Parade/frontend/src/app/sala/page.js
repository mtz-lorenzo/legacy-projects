"use client"; // Asegúrate de que esto esté al inicio del archivo

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Form from "@/components/Form";
import styles from "@/app/sala/page.module.css";
import { useEffect, useState } from "react";
import { Bowlby_One_SC } from "next/font/google";
import { useSocket } from "@/hooks/socket";

// Importa la fuente de Google correctamente con el peso especificado
const bowlbyOneSC = Bowlby_One_SC({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',  // Especifica el peso de la fuente
    variable: '--font-bowlbyonesc'
});

export default function Menu() {
    const router = useRouter();
    const generados = new Set();
    const [codigoSala, setCodigoMenu] = useState("");
    const [codigoSalaValido, setCodigoSalaValido] = useState(false);
    const { socket, isConnected } = useSocket();

    useEffect(() => {
        if (!socket)
            return;

    }, [socket, isConnected])

    function crearMenu() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigo;

        do {
            codigo = '';
            for (let i = 0; i < 5; i++) {
                codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
        } while (generados.has(codigo));

        generados.add(codigo);
        console.log(codigo);
        const params = new URLSearchParams(window.location.search);
        const UsuarioId = params.get("idUsuario");
        router.push(`/juego?codigo=${codigo}&idUsuario=${UsuarioId}`);
    }

    function unirMenu() {
        if (codigoSala.trim() === "") {
            alert("Por favor, ingresa un código de sala válido.");
            return;
        }

        if (codigoSala.trim().length != 4) {
            alert("Por favor, ingrese un código de 4 dígitos");
            return;
        } else {
            setCodigoSalaValido(true);
            console.log("Unirse a la sala:", codigoSala);
            socket.emit("joinRoom", { room: codigoSala });
        }
    }

    function volverMenu() {
        setCodigoSalaValido(false);
        setCodigoMenu("");
    }

    function obtenerBarrio() {
        return "Soldati";
    }

    async function unirseMostrador(event) {
        console.log(event.target.id);
        let barrio = await obtenerBarrio();
        router.push(`/pages/${barrio}/mostrador`);
    }

    async function unirseCocina(event) {
        console.log(event.target.id);
        let barrio = await obtenerBarrio();
        router.push(`/pages/${barrio}/cocina`);
    }

    return (
        <>
            <div className={`${styles.completo} ${bowlbyOneSC.variable}`}>
                <h1 className={`${styles.h1} ${bowlbyOneSC.className}`}>
                    Messina's Pastry Parade
                </h1>
                {codigoSalaValido && (
                    <div className={styles['button-container']}>
                        <div className={styles.link}>
                            <Button id="mostrador" text="Unirme al mostrador" variant="jugar" onClick={unirseMostrador} />
                        </div>
                        <div className={styles.link}>
                            <Button id="cocina" text="Unirme a la cocina" variant="jugar" onClick={unirseCocina} />
                        </div>
                        <Button
                            text="Volver"
                            variant="volver"
                            onClick={volverMenu}
                        />
                    </div>
                )}

                {!codigoSalaValido && (
                    <div className={styles['button-container']}>
                        <p className={styles.texto}>Unite a una sala multijugador:</p>
                        <Form placeholder="Ingrese código de sala" handleChange={(e) => setCodigoMenu(e.target.value)} />
                        <br />
                        <Button
                            text="Unirme"
                            variant="jugar"
                            onClick={unirMenu}
                            disabled={codigoSala.trim() === ""}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
