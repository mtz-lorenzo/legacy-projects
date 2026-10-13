import styles from "./Score.module.css";

export default function Score({ objetivo }) {
    return (
        <div className={styles.objetivo}>
            <span className={styles.etiqueta}>OBJETIVO</span>
            <span className={styles.valor}>${objetivo}</span>
        </div>
    );
}