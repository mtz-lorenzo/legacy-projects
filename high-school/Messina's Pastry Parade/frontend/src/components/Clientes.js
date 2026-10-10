"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './clientes.module.css';

const TIEMPO_ESPERA = 20000;
const DURACION_SALIDA = 1000;

const Cliente = ({
    cliente,
    onPedidoEntregado,   // el jugador le entregó un budín
    onClienteSeVa,       // se cansó de esperar (sin entrega)
    budinSeleccionado,
    resetBudinSeleccionado,
}) => {
    const [visible, setVisible] = useState(false);
    const [comentario, setComentario] = useState('');
    const [isLeaving, setIsLeaving] = useState(false);
    const saliendoRef = useRef(false); // evita salidas dobles (clic + timeout)

    useEffect(() => {
        if (!cliente) return;

        saliendoRef.current = false;
        setComentario(cliente.comentarioLlegada);
        setVisible(true);

        const timer = setTimeout(() => iniciarSalida(false), TIEMPO_ESPERA);
        return () => clearTimeout(timer);
    }, [cliente]);

    const iniciarSalida = (entregado) => {
        if (saliendoRef.current) return;
        saliendoRef.current = true;

        setComentario(cliente.comentarioSalida);
        setIsLeaving(true);

        setTimeout(() => {
            setIsLeaving(false);
            setVisible(false);
            resetBudinSeleccionado();

            if (entregado) {
                onPedidoEntregado();
            } else {
                onClienteSeVa();
            }
        }, DURACION_SALIDA);
    };

    const handleClienteClick = () => {
        if (!budinSeleccionado) return; // sin budín seleccionado, el clic no hace nada
        iniciarSalida(true);
    };

    return (
        <div className={`${styles.clienteContainer} ${visible ? styles.slideIn : ''} ${isLeaving ? styles.slideOut : ''}`}>
            {cliente && (
                <div className={styles.cliente} onClick={handleClienteClick}>
                    <img
                        src={`/clientes/${cliente.skin}`}
                        alt="Cliente"
                        className={styles.clienteSkin}
                    />
                    <div className={styles.dialogueBox}>
                        <p>{comentario}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cliente;