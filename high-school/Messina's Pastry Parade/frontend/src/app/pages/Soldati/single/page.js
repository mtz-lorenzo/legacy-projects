// app/pages/Soldati/single/page.js
"use client";

import { useState } from "react";
import styles from "./single.module.css";
import MostradorJuego from "@/components/juego/MostradorJuego";
import CocinaJuego from "@/components/juego/CocinaJuego";

export default function Single() {
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
                <MostradorJuego />
            </div>
            <div style={vista === "cocina" ? { position: "relative" } : ocultar}>
                <CocinaJuego />
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