"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MostradorJuego from "@/components/juego/MostradorJuego";

function Contenido() {
    const sala = useSearchParams().get("sala");
    const router = useRouter();

    useEffect(() => {
        if (!sala) router.replace("/sala");
    }, [sala, router]);

    if (!sala) return null;
    return <MostradorJuego sala={sala} />;
}

export default function Page() {
    return <Suspense fallback={null}><Contenido /></Suspense>;
}