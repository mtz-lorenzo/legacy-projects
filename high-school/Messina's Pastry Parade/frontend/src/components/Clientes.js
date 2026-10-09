"use client";

import React, { useState, useEffect } from 'react';
import styles from './clientes.module.css'; // Importa los estilos

const Cliente = ({ cliente, onPedidoEntregado, budinSeleccionado, resetBudinSeleccionado }) => {
    const [visible, setVisible] = useState(false); // Para gestionar la visibilidad del cliente
    const [comentario, setComentario] = useState(''); // Comentario a mostrar (llegada/salida)
    const [isLeaving, setIsLeaving] = useState(false); // Para gestionar el slide out

    useEffect(() => {
        if (cliente) {
            console.log("Imagen del cliente:", `/public/clientes/${cliente.skin}`);
            setComentario(cliente.comentarioLlegada);
            setVisible(true);

            const timer = setTimeout(() => {
                iniciarSalida();
            }, 20000);

            return () => clearTimeout(timer);
        }
    }, [cliente]);

    // Función para iniciar la salida del cliente actual
    const iniciarSalida = () => {
        setComentario(cliente.comentarioSalida);
        setIsLeaving(true); // Inicia la animación de salida

        // Después de la animación, llama la función de entrega
        setTimeout(() => {
            setIsLeaving(false);
            setVisible(false);
            resetBudinSeleccionado(); // Resetea la selección del budín
            onPedidoEntregado(); // Notifica a la página principal que el cliente se ha ido
        }, 1000); // Ajusta la duración de la animación de salida
    };

    // Función para manejar el clic en el cliente
    const handleClienteClick = () => {
        if (budinSeleccionado) { // Verifica si hay un budín seleccionado
            iniciarSalida(); // Llama a la función para iniciar la salida del cliente
        }
    };

    return (
        <div className={`${styles.clienteContainer} ${visible ? styles.slideIn : ''} ${isLeaving ? styles.slideOut : ''}`}>
            {cliente && (
                <div className={styles.cliente} onClick={handleClienteClick}>
                    {/* Imagen del cliente */}
                    <img
                        src={`/clientes/${cliente.skin}`}
                        className={styles.clienteSkin}
                    />
                    <div className={styles.dialogueBox}>
                        {/* Comentario como diálogo tipo cómic */}
                        <p>{comentario}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cliente;
