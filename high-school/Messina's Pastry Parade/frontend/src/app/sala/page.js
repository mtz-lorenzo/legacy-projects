"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bowlby_One_SC } from "next/font/google";
import Button from "@/components/Button";
import Form from "@/components/Form";
import styles from "@/app/sala/page.module.css";
import { useSocket } from "@/hooks/socket";

const bowlbyOneSC = Bowlby_One_SC({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
    variable: '--font-bowlbyonesc'
});

const BARRIO = "Soldati";

export default function Menu() {
    const router = useRouter();
    const { socket, isConnected } = useSocket();

    const [vista, setVista] = useState("modo"); // "modo" | "multi" | "unirse" | "rol"
    const [codigoInput, setCodigoInput] = useState("");
    const [sala, setSala] = useState(null);
    const [error, setError] = useState("");

    const sinConexion = () => {
        if (!socket || !isConnected) {
            setError("Sin conexión con el servidor");
            return true;
        }
        return false;
    };

    function pedirSala(alTerminar) {
        if (sinConexion()) return;
        setError("");
        socket.emit("crearSala", (res) => {
            if (res?.ok) alTerminar(res.codigo);
            else setError("No se pudo crear la sala");
        });
    }

    // Singleplayer: sala privada y a jugar
    const jugarSolo = () =>
        pedirSala((codigo) => router.push(`/pages/${BARRIO}/single?sala=${codigo}`));

    // Multiplayer: crear sala y elegir rol
    const crearSalaMulti = () =>
        pedirSala((codigo) => {
            setSala(codigo);
            setVista("rol");
        });

    // Multiplayer: unirse con código
    function unirse() {
        const codigo = codigoInput.trim().toUpperCase();
        if (codigo.length !== 4) {
            setError("El código tiene 4 caracteres");
            return;
        }
        if (sinConexion()) return;

        socket.emit("existeSala", { room: codigo }, (res) => {
            if (res?.ok) {
                setError("");
                setSala(codigo);
                setVista("rol");
            } else {
                setError("Esa sala no existe");
            }
        });
    }

    const entrar = (pantalla) =>
        router.push(`/pages/${BARRIO}/${pantalla}?sala=${sala}`);

    function volver() {
        setError("");
        if (vista === "rol" || vista === "unirse") {
            setSala(null);
            setCodigoInput("");
            setVista("multi");
        } else {
            setVista("modo");
        }
    }

    return (
        <div className={`${styles.completo} ${bowlbyOneSC.variable}`}>
            <h1 className={`${styles.h1} ${bowlbyOneSC.className}`}>
                Messina's Pastry Parade
            </h1>

            <div className={styles['button-container']}>
                {vista === "modo" && (
                    <>
                        <p className={styles.texto}>¿Cómo querés jugar?</p>
                        <Button text="Un jugador" variant="jugar" onClick={jugarSolo} />
                        <Button text="Multijugador" variant="jugar" onClick={() => setVista("multi")} />
                    </>
                )}

                {vista === "multi" && (
                    <>
                        <p className={styles.texto}>Multijugador</p>
                        <Button text="Crear sala" variant="jugar" onClick={crearSalaMulti} />
                        <Button text="Unirme a una sala" variant="jugar" onClick={() => setVista("unirse")} />
                        <Button text="Volver" variant="volver" onClick={volver} />
                    </>
                )}

                {vista === "unirse" && (
                    <>
                        <p className={styles.texto}>Ingresá el código de sala:</p>
                        <Form
                            placeholder="Código (4 caracteres)"
                            handleChange={(e) => setCodigoInput(e.target.value)}
                            onSubmit={unirse}
                        />                        
                        <br />
                        <Button
                            text="Unirme"
                            variant="jugar"
                            onClick={unirse}
                            disabled={codigoInput.trim() === ""}
                        />
                        <Button text="Volver" variant="volver" onClick={volver} />
                    </>
                )}

                {vista === "rol" && (
                    <>
                        <p className={styles.texto}>Código de sala:</p>
                        <p className={styles.codigo}>{sala}</p>
                        <p className={styles.texto}>Pasale este código a tu compañero y elegí tu puesto:</p>
                        <Button id="mostrador" text="Mostrador" variant="jugar" onClick={() => entrar("mostrador")} />
                        <Button id="cocina" text="Cocina" variant="jugar" onClick={() => entrar("cocina")} />
                        <Button text="Volver" variant="volver" onClick={volver} />
                    </>
                )}

                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
}