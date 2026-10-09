"use client"
import clsx from "clsx";
import styles from "@/components/Cocina.module.css";

export default function Cocina(props) {
    return (
        <>
            <div className={
                clsx(
                    {
                        [styles.imgSoldatiCocina]: props.tipo == "soldati",
                        [styles.imgLiniers]: props.tipo == "liniers",
                    }
                )
            }>
                
            </div>
        </>
    );
}