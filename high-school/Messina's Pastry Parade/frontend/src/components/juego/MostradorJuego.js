"use client"

import React, { useState, useEffect, useRef } from 'react';
import Cliente from '@/components/Clientes/';
import styles from '@/app/pages/Soldati/mostrador/mostradorsoldati.module.css';
import Score from '@/components/Score';
import { useSocket } from "@/hooks/socket";
import { useRouter } from 'next/navigation';

const BUDIN_VACIO = "/objetos/png.png";
const URL_BUDIN = {
    chocolate: "/objetos/budinChocolate.png",
    vainilla: "/objetos/budinVainilla.png",
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default function MostradorJuego() {
    const [score, setScore] = useState(0);
    const [clientes, setClientes] = useState([]);
    const [clienteActual, setClienteActual] = useState(null);
    const [persianaAbierta, setPersianaAbierta] = useState(false);
    const [showRecipeModal, setShowRecipeModal] = useState(false);
    const [budinURL, setBudinURL] = useState(BUDIN_VACIO);
    const [budinSeleccionado, setBudinSeleccionado] = useState(false);
    const [mensajeDiaTerminado, setMensajeDiaTerminado] = useState(false);

    // Pedido (ticket)
    const [pedidoActual, setPedidoActual] = useState(null);     // "chocolate" | "vainilla" | null
    const [pedidoEnviado, setPedidoEnviado] = useState(false);

    const playImgRef = useRef(null);
    const soundRef = useRef(null);
    const sfxRef = useRef({});
    const scoreRef = useRef(0);
    const pedidoRef = useRef(null);
    const finDiaRef = useRef(false);   // el día ya terminó
    const timersRef = useRef([]);      // para limpiar al desmontar
    const { socket, isConnected } = useSocket();
    const router = useRouter();

    // Audio (solo en el navegador)
    useEffect(() => {
        soundRef.current = new Audio('/sound/Todo Pinta Re Mal.mp3');
        return () => {
            soundRef.current?.pause();
        };
    }, []);

        // Efectos de sonido (solo en el navegador)
    useEffect(() => {
        sfxRef.current = {
            caja: new Audio('/sound/caja.mp3'),
            libro: new Audio('/sound/libro.mp3'),
            enojado: new Audio('/sound/enojado.mp3'),
            persiana: new Audio('/sound/persiana.mp3'),
        };
        Object.values(sfxRef.current).forEach((a) => {
            a.volume = 0.7; // de 0 a 1
        });
        return () => {
            Object.values(sfxRef.current).forEach((a) => a.pause());
        };
    }, []);

    const reproducirSfx = (nombre) => {
        const sfx = sfxRef.current[nombre];
        if (!sfx) return;
        sfx.currentTime = 0; // por si se repite rápido
        sfx.play().catch(() => {});
    };

    const handlePlayMusic = () => {
        const sound = soundRef.current;
        if (!sound) return;
        if (sound.paused) sound.play();
        else sound.pause();
    };

    // Refs sincronizados con el estado
    useEffect(() => { scoreRef.current = score; }, [score]);
    useEffect(() => { pedidoRef.current = pedidoActual; }, [pedidoActual]);

    // Fin de día: misma regla que la cocina (score >= 1400)
    useEffect(() => {
        if (score < 1400 || finDiaRef.current) return;
        finDiaRef.current = true;

        setClienteActual(null);
        reproducirSfx("persiana");
        setPersianaAbierta(true); // baja la persiana

        const t1 = setTimeout(() => {
            setMensajeDiaTerminado(true);
            const t2 = setTimeout(() => router.push('/pages/Liniers/mostrador'), 5000);
            timersRef.current.push(t2);
        }, 3000);
        timersRef.current.push(t1);
    }, [score, router]);

    // Limpiar timers al salir de la pantalla
    useEffect(() => {
        return () => timersRef.current.forEach(clearTimeout);
    }, []);

    // Emitir score a la cocina
    useEffect(() => {
        if (!socket) return;
        socket.emit('scoreMostrador', { score });
    }, [score, socket]);

    // Recibir el budín terminado desde la cocina
    useEffect(() => {
        if (!socket) return;

        const handleBudin = (data) => {
            // Si no hay cliente esperando, el budín se descarta
            if (!pedidoRef.current) return;
            setBudinURL(URL_BUDIN[data.budin] ?? URL_BUDIN.chocolate);
        };

        socket.on("budinMostrador", handleBudin);
        return () => socket.off("budinMostrador", handleBudin);
    }, [socket, isConnected]);

    // Sortear pedido cada vez que cambia el cliente
    useEffect(() => {
        if (clienteActual) {
            setPedidoActual(Math.random() < 0.5 ? "chocolate" : "vainilla");
            setPedidoEnviado(false);
        } else {
            setPedidoActual(null);
            setPedidoEnviado(false);
            if (socket) socket.emit("pedidoCancelado");
        }
    }, [clienteActual]);

    // Obtener y mezclar clientes al inicio
    useEffect(() => {
        obtenerClientesMezcladosPorNivel();
    }, []);

    async function obtenerClientesMezcladosPorNivel() {
        try {
            const response = await fetch("http://localhost:4000/clientesPorEscenario?idEscenario=1", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const clientesSinMezclar = await response.json();
            let clientesMezclados = [];

            while (clientesSinMezclar.length > 0) {
                let numeroAleatorio = getRandomInt(clientesSinMezclar.length);
                let clienteRandom = clientesSinMezclar.splice(numeroAleatorio, 1)[0];
                clientesMezclados.push(clienteRandom);
            }

            setClientes(clientesMezclados);
            if (clientesMezclados.length > 0) {
                setClienteActual(clientesMezclados[0]);
            }
        } catch (error) {
            console.error("Error al obtener clientes:", error);
        }
    }

    const mostrarNuevoCliente = () => {
        if (finDiaRef.current) return; // el día ya terminó, no entra nadie más

        if (clientes.length > 1) {
            const siguienteCliente = clientes[1];
            setClientes((prev) => prev.slice(1));
            setClienteActual(siguienteCliente);
        } else {
            setClienteActual(null);

            if (scoreRef.current >= 1400) return; // lo maneja el efecto de fin de día

            finDiaRef.current = true;
            const t1 = setTimeout(() => {
                reproducirSfx("persiana");
                setPersianaAbierta(true);
                const t2 = setTimeout(() => {
                    setMensajeDiaTerminado(true);
                    const t3 = setTimeout(() => window.location.reload(), 5000);
                    timersRef.current.push(t3);
                }, 3000);
                timersRef.current.push(t2);
            }, 2000);
            timersRef.current.push(t1);
        }
    };

    const togglePersiana = () => {
        reproducirSfx("persiana");
        setPersianaAbierta((prev) => !prev);

    };    

    const toggleRecipeModal = () => {
        if (!showRecipeModal) reproducirSfx("libro");
        setShowRecipeModal((prev) => !prev);
    };

    const handleBudinClick = () => {
        if (budinURL === BUDIN_VACIO) return;
        setBudinSeleccionado(true);
    };

    // Pasar el ticket a la cocina
    const handleEnviarPedido = () => {
        if (!pedidoActual || pedidoEnviado || !socket) return;
        socket.emit("pedidoMostrador", { budin: pedidoActual });
        setPedidoEnviado(true);
    };

    // El cliente se fue sin recibir nada: no suma ni resta
    const handleClienteSeVa = () => {
        setClienteActual(null);
        setTimeout(() => {
            mostrarNuevoCliente();
        }, 5000);
    };

    // El jugador entregó un budín
    const handlePedidoEntregado = () => {
        if (validarBudin()) {
            setScore((prev) => prev + 300);
            reproducirSfx("caja");
        } else {
            setScore((prev) => prev - 50);
            reproducirSfx("enojado");

        }

        setBudinURL(BUDIN_VACIO);
        setClienteActual(null);
        setBudinSeleccionado(false);

        setTimeout(() => {
            mostrarNuevoCliente();
        }, 5000);
    };

    // Compara el budín del mostrador con el pedido sorteado
    const validarBudin = () => {
        if (!pedidoActual) return false;
        return budinURL === URL_BUDIN[pedidoActual];
    };

    return (
        <div className={styles.imgSoldati}>
            <Score score={score} />

            {clienteActual && (
                <Cliente
                    cliente={clienteActual}
                    onPedidoEntregado={handlePedidoEntregado}
                    onClienteSeVa={handleClienteSeVa}
                    budinSeleccionado={budinSeleccionado}
                    resetBudinSeleccionado={() => setBudinSeleccionado(false)}
                    budinURL={budinURL}
                    persianaAbierta={persianaAbierta}
                    togglePersiana={togglePersiana}
                />
            )}

            {/* Ticket del pedido */}
            {pedidoActual && (
                <div className={styles.ticket}>
                    <span className={styles.ticketTitulo}>PEDIDO</span>
                    <span className={styles.ticketBudin}>Budín de {pedidoActual}</span>
                    <button
                        className={styles.ticketBoton}
                        onClick={handleEnviarPedido}
                        disabled={pedidoEnviado}
                    >
                        {pedidoEnviado ? "Enviado ✔" : "Pasar a cocina ➜"}
                    </button>
                </div>
            )}

            <button onClick={toggleRecipeModal} className={styles.openModalButton}>
                Recetas
            </button>

            {mensajeDiaTerminado && (
                <div className={styles.diaTerminado}>
                    <h2>¡DÍA 1 TERMINADO!</h2>
                </div>
            )}

            {showRecipeModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button onClick={toggleRecipeModal} className={styles.closeModalButton}>
                            X
                        </button>
                        <h3>Recetas</h3>
                        <ul>
                            <li>Budín de Chocolate: Budín + horno + chocolate</li>
                            <li>Budín de Vainilla: Budín + horno + vainilla</li>
                        </ul>
                        <h3>ALERTA!</h3>
                        <ul>
                            <li>Cuando cae la gorra cerrá todo</li>
                            <li>Cuando cae la noche, cuidado con jonatan</li>
                        </ul>
                    </div>
                </div>
            )}

            <img
                src={budinURL}
                alt="Budín"
                className={`${styles.budinImageContainer} ${
                    budinURL === BUDIN_VACIO ? styles.budinVacio : ""
                } ${budinSeleccionado ? styles.selected : ""}`}
                onClick={handleBudinClick}
            />

            <img
                ref={playImgRef}
                className={styles.imgRadio}
                src="/objetos/Radio Soldati.png"
                id="playImg"
                alt="Play Radio"
                onClick={handlePlayMusic}
            />

            <img
                src="/objetos/cajaRegistradoraSoldati.png"
                alt="Caja registradora"
                className={styles.imgCajaRegistradora}
            />

            <div className={styles.persianaContainer}>
                <div className={`${styles.persiana} ${persianaAbierta ? styles.abierta : ""}`}></div>
                <button className={styles.persianaButton} onClick={togglePersiana}>
                    {persianaAbierta ? "Subir Persiana" : "Bajar Persiana"}
                </button>
            </div>
        </div>
    );
}