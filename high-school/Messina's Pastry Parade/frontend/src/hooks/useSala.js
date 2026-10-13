import { useEffect, useState } from "react";

// Se une a la sala cada vez que el socket (re)conecta.
// Devuelve true cuando el servidor confirmó que ya estás adentro.
export function useSala(socket, isConnected, sala) {
    const [enSala, setEnSala] = useState(false);

    useEffect(() => {
        if (!socket || !isConnected || !sala) {
            setEnSala(false);
            return;
        }
        socket.emit("joinRoom", { room: sala }, (res) => setEnSala(!!res?.ok));
    }, [socket, isConnected, sala]);

    return enSala;
}