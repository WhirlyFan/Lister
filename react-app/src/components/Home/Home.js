import React, { useEffect } from "react";
import styles from "./Home.module.css";

export default function Home() {
    
    useEffect(() => {

    }, []);

    return (
        <div className={styles.home}>
        <h1>Welcome to Lister!</h1>
        <h2>Where you can create lists of your favorite anime!</h2>
        </div>
    );
}
