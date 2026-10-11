// app/pages/Soldati/single/page.js
"use client";

import { useState } from "react";
import MostradorJuego from "@/components/juego/MostradorJuego";
import CocinaJuego from "@/components/juego/CocinaJuego";

export default function Single() {
    const [vista, setVista] = useState("mostrador");

    return (
        <div style={{ position: "relative" }}>
            <div style={{ display: vista === "mostrador" ? "block" : "none" }}>
                <MostradorJuego />
            </div>
            <div style={{ display: vista === "cocina" ? "block" : "none" }}>
                <CocinaJuego />
            </div>

            <button
                onClick={() => setVista(vista === "mostrador" ? "cocina" : "mostrador")}
                style={{ position: "fixed", bottom: 20, right: 20, zIndex: 10000 }}
            >
                {vista === "mostrador" ? "Ir a cocina ➜" : "⬅ Ir a mostrador"}
            </button>
        </div>
    );
}