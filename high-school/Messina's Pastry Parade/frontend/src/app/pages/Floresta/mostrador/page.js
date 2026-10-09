"use client"

import React, { useState, useEffect, useRef } from 'react';
import Cliente from '@/components/Clientes/' // Importación del componente Clientes
import styles from '@/app/pages/Floresta/mostrador/mostradorfloresta.module.css'; // Cambié styles por Styles para que coincida con la importación
import Score from '@/components/Score';
import { useSocket } from "@/hooks/socket";
import { useRouter } from 'next/navigation';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default function Game() {
    const [score, setScore] = useState(0); // Definimos el estado para el puntaje
    const [clientes, setClientes] = useState([]); // Lista de clientes mezclados
    const [clienteActual, setClienteActual] = useState(null); // Cliente que se está mostrando
    const [persianaAbierta, setPersianaAbierta] = useState(false); // Estado para la persiana
    const [showRecipeModal, setShowRecipeModal] = useState(false); // Estado para el modal de recetas
    const [budinURL, setBudinURL] = useState("/objetos/png.png"); // Inicialización de budinURL
    const [budinSeleccionado, setBudinSeleccionado] = useState(false); // Para detectar si el budín fue seleccionado
    const [mensajeDiaTerminado, setMensajeDiaTerminado] = useState(false);
    const playImgRef = useRef(null);
    const soundRef = useRef(null);
    const { socket, isConnected } = useSocket();
    const router = useRouter();

              // Esto se ejecutará cuando cargue la página
  if (!soundRef.current) {
    soundRef.current = new Audio('/sound/Floresta.mp3'); // Asegúrate de que la ruta sea correcta
  }

  const handlePlayMusic = () => {
    // Alterna entre reproducir y pausar la música
    if (soundRef.current.paused) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
    }
  };

  useEffect(() => {
    if (!socket) return;

    // Emitir el score actualizado al servidor
    socket.emit('scoreMostrador', { score });

}, [score, socket]);

    


    useEffect(() => {
        if (!socket) return;

        socket.on("budinMostrador", (data) => {
            let url = "/objetos/";
            if (data.budin === "vainilla") {
                setBudinURL(url + "budinVainilla.png");
            } else {
                setBudinURL(url + "budinChocolate.png");
            }
        });

        return () => {
            // Asegúrate de limpiar el socket cuando el componente se desmonte
            socket.off("budinMostrador");
        };
    }, [socket, isConnected]);

    // Obtener y mezclar clientes al inicio
    useEffect(() => {
        obtenerClientesMezcladosPorNivel();
    }, []);

    // Función para obtener clientes y mezclarlos
    async function obtenerClientesMezcladosPorNivel() {
        try {
            const response = await fetch("http://localhost:4000/clientesPorEscenario?idEscenario=3", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const clientesSinMezclar = await response.json(); // Vector de todos los clientes
            let clientesMezclados = [];

            // Mezclar clientes
            while (clientesSinMezclar.length > 0) {
                let numeroAleatorio = getRandomInt(clientesSinMezclar.length);
                let clienteRandom = clientesSinMezclar.splice(numeroAleatorio, 1)[0];
                clientesMezclados.push(clienteRandom);
            }

            setClientes(clientesMezclados); // Actualizar lista de clientes mezclados
            if (clientesMezclados.length > 0) {
                setClienteActual(clientesMezclados[0]); // Mostrar el primer cliente
            }
        } catch (error) {
            console.error("Error al obtener clientes:", error);
        }
    }

    const mostrarNuevoCliente = () => {
        if (clientes.length > 1) {
            const siguienteCliente = clientes[1];
            setClientes((prevClientes) => prevClientes.slice(1));
            setClienteActual(siguienteCliente);
        } else {
            // No hay más clientes, cerrar la persiana automáticamente
            setClienteActual(null);

            // Espera 2 segundos antes de cerrar la persiana y mostrar el mensaje
            setTimeout(() => {
                togglePersiana();
                
                // Tercer timeout aquí (por ejemplo, esperando 3 segundos más)
                setTimeout(() => {
                    setMensajeDiaTerminado(true); // Muestra el mensaje "DÍA 1 TERMINADO"
                    
                    // Espera 5 segundos y verifica el score
                    setTimeout(() => {
                        if (score >= 2400) {
                            // Redirige a la nueva página si el score es igual a 1400
                            router.push('/pages/Palermo/mostrador');
                        } else {
                            // Reinicia el nivel recargando la página actual
                            window.location.reload();
                        }
                    }, 13000);
                    
                }, 8000); 
            }, 5000);
        }
    };

    // Función para manejar la apertura/cierre de la persiana
    const togglePersiana = () => {
        setPersianaAbierta((prev) => !prev);
    };

    // Función para abrir/cerrar el modal de recetas
    const toggleRecipeModal = () => {
        setShowRecipeModal((prev) => !prev);
    };

    // Función para manejar el clic en la imagen del budín
    const handleBudinClick = () => {
        if (budinURL !== 'png_vacio.png') { // Verifica que el budín no sea el PNG vacío
            setBudinSeleccionado(true); // Marca el budín como seleccionado
        }
    };

    // Función que se pasa al componente `Cliente` para manejar la entrega
    const handlePedidoEntregado = () => {
        // Verificamos si el cliente actual y el tipo de budín son correctos
        if (clienteActual && validarBudin(clienteActual.budin)) {
            // Si el budín es correcto, incrementa el score
            setScore(score + 300);
            console.log("Pedido entregado correctamente, +300 puntos");
        } else {
            // Si el budín no es correcto, se descuenta dinero
            setScore(score - 50); // Descuento de 50 por entregar el budín incorrecto
            console.log("Pedido incorrecto, -50 dinero");
        }

        // Reseteamos el estado del budín y el cliente
        setBudinURL('/objetos/png.png'); // Vuelve a establecer el budín a vacío
        setClienteActual(null); // El cliente desaparece
        setBudinSeleccionado(false); // Resetea la selección del budín

        // Esperamos 5 segundos antes de mostrar un nuevo cliente
        setTimeout(() => {
            mostrarNuevoCliente(); // Muestra un nuevo cliente después de 5 segundos
        }, 5000);
    };

    // Función para validar si el budín seleccionado es el correcto
    const validarBudin = (tipoBudinCliente) => {
        // Imprimimos el valor de budinURL para asegurarnos de qué contiene
        console.log("Valor de budinURL:", budinURL);

        // Comparamos directamente el tipo de budín del cliente con la URL del budín
        if (tipoBudinCliente === "chocolate" && budinURL === "/objetos/budinChocolate.png") {
            console.log("Budín correcto: Chocolate");
            return true;
        } else if (tipoBudinCliente === "vainilla" && budinURL === "/objetos/budinVainilla.png") {
            console.log("Budín correcto: Vainilla");
            return true;
        }

        console.log("Budín incorrecto");
        return false;
    };

    return (
        <div className={styles.imgFloresta}>
            <Score score={score} />

            {clienteActual && (
                <Cliente
                    cliente={clienteActual}
                    onPedidoEntregado={handlePedidoEntregado}
                    budinSeleccionado={budinSeleccionado}
                    resetBudinSeleccionado={() => setBudinSeleccionado(false)}
                    budinURL={budinURL}
                    persianaAbierta={persianaAbierta}
                    togglePersiana={togglePersiana}
                />
            )}

            {/* Botón de recetas */}
            <button onClick={toggleRecipeModal} className={styles.openModalButton}>
                Recetas
            </button>

            {/* Mostrar mensaje "DÍA 1 TERMINADO" cuando corresponda */}
            {mensajeDiaTerminado && (
                <div className={styles.diaTerminado}>
                    <h2>¡DÍA 3 TERMINADO!</h2>
                </div>
            )}

            {/* Modal de recetas */}
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
                className={styles.budinImageContainer}
                onClick={handleBudinClick}
            />

            {/* Radio */}
            <img
                ref={playImgRef}
                className={styles.imgRadio}
                src="/objetos/vinilo.png"
                id="playImg"
                alt="Play Radio"
                onClick={handlePlayMusic}
            />

            <img
                src="/objetos/cajaRegistradoraLiniers.png"
                alt="Caja registradora"
                className={styles.imgCajaRegistradoraLiniers}
            />

            <div className={styles.persianaContainer}>
                {/* Persiana */}
                <div className={`${styles.persiana} ${persianaAbierta ? styles.abierta : ""}`}></div>

                {/* Botón para abrir/cerrar persiana */}
                <button className={styles.persianaButton} onClick={togglePersiana}>
                    {persianaAbierta ? "Subir Persiana" : "Bajar Persiana"}
                </button>
            </div>
        </div>
    );

};    