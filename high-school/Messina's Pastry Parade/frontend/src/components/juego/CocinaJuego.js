"use client";

import { useEffect, useState, useRef } from "react";
import styles from "@/app/pages/Soldati/cocina/cocinasoldati.module.css";
import { useSocket } from "@/hooks/socket";
import Score from '@/components/Score';
import { useSala } from "@/hooks/useSala";
import { PUNTAJE_OBJETIVO } from "@/components/juego/config";
import { useRouter } from 'next/navigation';

export default function CocinaJuego({ sala }) {
    // POSICIONES EN % (Mesada vs Horno)
const POSICION_INICIAL = { top: "44%", left: "42%" };
const POSICION_HORNO = { top: "65%", left: "76%" };
const POSICION_LISTO = { top: "44%", left: "42%" };

    const [budinPosition, setBudinPosition] = useState(POSICION_INICIAL);
    const [isRawSelected, setIsRawSelected] = useState(false);
    const [isCooking, setIsCooking] = useState(false);
    const cookTimerRef = useRef(null);
    const dingRef = useRef(null);
    const [isCooked, setIsCooked] = useState(false);
    const [isVainillaSelected, setIsVainillaSelected] = useState(false);
    const [isChocolateSelected, setIsChocolateSelected] = useState(false);
    const [budinType, setBudinType] = useState(null);
    const [isBudinFinalSelected, setIsBudinFinalSelected] = useState(false);
    const [score, setScore] = useState(0);
    const [contadorBudines, setContadorBudines] = useState(0);
    const [pedidoCocina, setPedidoCocina] = useState(null);
    const [mensajeDiaTerminado, setMensajeDiaTerminado] = useState(false);
    
    const { socket, isConnected } = useSocket();
    const enSala = useSala(socket, isConnected, sala);
    const router = useRouter();

    // Sockets
    useEffect(() => {
        if (!socket) return;
        const handleScore = (data) => {
            if (data && typeof data.score === 'number') {
                setScore(data.score);
            }
        };
        socket.on("scoreCocina", handleScore);
        return () => socket.off("scoreCocina", handleScore);
    }, [socket, isConnected]);

    useEffect(() => {
        if (!socket) return;
        const handlePedido = (data) => setPedidoCocina(data.budin);
        const handleCancelado = () => setPedidoCocina(null);

        socket.on("pedidoCocina", handlePedido);
        socket.on("pedidoCancelado", handleCancelado);
        return () => {
            socket.off("pedidoCocina", handlePedido);
            socket.off("pedidoCancelado", handleCancelado);
        };
    }, [socket, isConnected]);

    // Flujo de victoria
    useEffect(() => {
        if (score < PUNTAJE_OBJETIVO) return;

        let t2;
        const t1 = setTimeout(() => {
            setMensajeDiaTerminado(true);
            t2 = setTimeout(() => router.push(`/pages/Liniers/cocina?sala=${sala}`), 5000);
        }, 3000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [score, router]);

    useEffect(() => {
        return () => clearTimeout(cookTimerRef.current);
    }, []);

    useEffect(() => {
        dingRef.current = new Audio('/sound/horno.mp3');
        dingRef.current.volume = 0.7;
    }, []);

    // 1. Clic en el molde crudo: lo selecciona (o lo deselecciona)
    const handleBudinClick = () => {
        if (isCooking) return;
        setIsRawSelected((prev) => !prev);
    };

    // 2. Clic en el horno: cocina el budín seleccionado
    const handleHornoClick = () => {
        if (!isRawSelected || isCooking || isCooked) return;

        setIsRawSelected(false);
        setIsCooking(true);
        setBudinPosition(POSICION_HORNO);

        cookTimerRef.current = setTimeout(() => {
            setIsCooking(false);
            setIsCooked(true);
            setBudinPosition(POSICION_LISTO);

        // Sonido al salir del horno
        if (dingRef.current) {
            dingRef.current.currentTime = 0;
            dingRef.current.play().catch(() => {});
            }            
        }, 6000);
    };

    // 3. Selección de sabor
    const handleVainillaClick = () => {
        if (!budinType) {
            setIsVainillaSelected(true);
            setIsChocolateSelected(false);
        }
    };

    const handleChocolateClick = () => {
        if (!budinType) {
            setIsChocolateSelected(true);
            setIsVainillaSelected(false);
        }
    };

    // 4. Aplicar sabor al budín cocido
    const handleBudinCocidoClick = () => {
        if (!isCooked || budinType) return;

        if (isVainillaSelected) {
            setBudinType("vainilla");
            setIsVainillaSelected(false);
            setIsBudinFinalSelected(true); // Activa la flecha
        } else if (isChocolateSelected) {
            setBudinType("chocolate");
            setIsChocolateSelected(false);
            setIsBudinFinalSelected(true); // Activa la flecha
        }
    };

    // 5. Clic en la flecha para entregar el pedido
    const handleArrowClick = () => {
        setIsBudinFinalSelected(false);
        setIsCooked(false);
        setIsRawSelected(false);
        setBudinPosition(POSICION_INICIAL); // Resetea la posición al molde original
        
        if (socket) {
            socket.emit("budinCocina", { budin: budinType });
        }
        setContadorBudines((prev) => prev + 1);
        setBudinType(null);
        setPedidoCocina(null);
    };

    return (
        <div className={styles.imgSoldatiCocina}>
            <Score objetivo={PUNTAJE_OBJETIVO} />
            {pedidoCocina && (
                <div className={styles.ticket}>
                    <span className={styles.ticketTitulo}>PEDIDO</span>
                    <span className={styles.ticketBudin}>Budín de {pedidoCocina}</span>
                </div>
            )}

            <div
                className={`${styles.horno} ${isRawSelected ? styles.hornoTitila : ""}`}
                onClick={handleHornoClick}
            />

            {/* Budín Crudo */}
            {!isCooked && (
                <img
                    src="/objetos/budinSinCocinar.png"
                    alt="Budin sin cocinar"
                    className={`${styles.imgBudinSinCocinar} ${
                        isRawSelected ? styles.selected : ""
                    } ${isCooking ? styles.cocinando : ""}`}
                    style={{
                        top: budinPosition.top,
                        left: budinPosition.left,
                    }}
                onClick={handleBudinClick}/>
            )}

            {/* Budín Cocido / Decorado */}
            {isCooked && (
                <img
                    src={
                        budinType === "vainilla"
                            ? "/objetos/budinVainilla.png"
                            : budinType === "chocolate"
                                ? "/objetos/budinChocolate.png"
                                : "/objetos/budinCocido.png"
                    }
                    alt="Budin cocido"
                    
                    className={`${styles.imgBudinCocido} ${
                        isBudinFinalSelected ? styles.selected : ""
                    }`}

                    style={{
                        top: budinPosition.top,
                        left: budinPosition.left,
                    }}
                    onClick={handleBudinCocidoClick}
                />
            )}

            {/* Ingredientes */}
            <img
                src="/objetos/Vainilla.png"
                alt="Vainilla"
                
                className={`${styles.imgVainilla} ${
                    isVainillaSelected ? styles.selected : ""
                }`}

                onClick={handleVainillaClick}
            />

            <img
                src="/objetos/chocolate.png"
                alt="Chocolate"

                className={`${styles.imgChocolate} ${
                    isChocolateSelected ? styles.selected : ""
                }`}

                onClick={handleChocolateClick}
            />

            {/* Flecha de envío */}
            {isBudinFinalSelected && (
                <img
                    src="/objetos/flecha.png"
                    alt="flecha"
                    className={styles.imgArrowLeft}
                    onClick={handleArrowClick}
                />
            )}

            {mensajeDiaTerminado && (
                <div className={styles.diaTerminado}>
                    <h2>¡DÍA 1 TERMINADO!</h2>
                </div>
            )}
        </div>
    );
}