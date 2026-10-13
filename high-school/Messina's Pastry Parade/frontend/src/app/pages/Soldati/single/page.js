// app/pages/Soldati/single/page.js
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./single.module.css";
import MostradorJuego from "@/components/juego/MostradorJuego";
import CocinaJuego from "@/components/juego/CocinaJuego";

// El juego en sí (lo que ya tenías), ahora recibe la sala
function Juego({ sala }) {
    const [vista, setVista] = useState("mostrador");
    const ocultar = {
        visibility: "hidden",
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
    };

    return (
        <div className={styles.single}>
            <div style={vista === "mostrador" ? { position: "relative" } : ocultar}>
                <MostradorJuego sala={sala} />
            </div>
            <div style={vista === "cocina" ? { position: "relative" } : ocultar}>
                <CocinaJuego sala={sala} />
            </div>

            <button
                className={styles.botonVista}
                onClick={() => setVista(vista === "mostrador" ? "cocina" : "mostrador")}
            >
                {vista === "mostrador" ? "Ir a cocina ➜" : "⬅ Ir a mostrador"}
            </button>
        </div>
    );
}

// Lee la sala de la URL y, si no hay, vuelve al menú
function Contenido() {
    const sala = useSearchParams().get("sala");
    const router = useRouter();

    useEffect(() => {
        if (!sala) router.replace("/sala");
    }, [sala, router]);

    if (!sala) return null;
    return <Juego sala={sala} />;
}

export default function Page() {
    return <Suspense fallback={null}><Contenido /></Suspense>;
}