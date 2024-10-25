"use client";
// components/BatsAnimation.jsx
import React from "react";
import styles from "./HalloweenDecoration.module.css";

const HalloweenAnimation = () => {
  const bats = Array.from({ length: 50 });

  return (
    <div className={styles.container}>
      {bats.map((_, index) => {
        // Asignar aleatoriamente un lado (top, right, bottom, left)
        const side = ["top", "right", "bottom", "left"][
          Math.floor(Math.random() * 4)
        ];
        // Posición aleatoria a lo largo del lado (0% a 100%)
        const position = Math.random() * 100;

        const style = {
          animationDelay: `${Math.random() * 1}s`, // Retraso de animación aleatorio
          "--position": `${position}%`,
        };

        return (
          <img
            key={index}
            src="https://www.gifss.com/aves/murcielagos/images/gif-murcielago-2.gif" // Ruta de tu imagen de murciélago
            className={`${styles.bat} ${styles[side]}`}
            style={style}
            alt="Murciélago"
          />
        );
      })}
    </div>
  );
};

export default HalloweenAnimation;
