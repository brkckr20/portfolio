"use client";
import { useCallback } from "react";
import styles from "./NavArrows.module.css";

const animIn = [
  "animated-section-moveFromRight",
  "animated-section-moveFromLeft",
  "animated-section-moveFromTop",
  "animated-section-moveFromBottom",
  "animated-section-fadeIn",
  "animated-section-scaleUp",
];

const animOut = [
  "animated-section-moveToRight",
  "animated-section-moveToLeft",
  "animated-section-moveToTop",
  "animated-section-moveToBottom",
  "animated-section-fadeOut",
  "animated-section-scaleDown",
];

export default function NavArrows() {
  const navigate = useCallback((direction) => {
    const sections = document.querySelectorAll(".animated-section");
    const active = document.querySelector(".animated-section.section-active");
    if (!active) return;
    const idx = Array.from(sections).indexOf(active);
    let nextIdx;
    if (direction === "next") {
      nextIdx = (idx + 1) % sections.length;
    } else {
      nextIdx = (idx - 1 + sections.length) % sections.length;
    }
    const current = sections[idx];
    const next = sections[nextIdx];

    current.classList.remove("section-active");
    [...animIn, ...animOut].forEach((c) => {
      current.classList.remove(c);
      next.classList.remove(c);
    });

    const outAnim = animOut[Math.floor(Math.random() * animOut.length)];
    const inAnim = animIn[Math.floor(Math.random() * animIn.length)];
    current.classList.add(outAnim);
    next.classList.add(inAnim);
    next.classList.add("section-active");
  }, []);

  return (
    <div className={styles.navArrows}>
      <div className={styles.arrowRight} onClick={() => navigate("next")}>
        <i className="fa-solid fa-chevron-right"></i>
      </div>
      <div className={styles.arrowLeft} onClick={() => navigate("prev")}>
        <i className="fa-solid fa-chevron-left"></i>
      </div>
    </div>
  );
}
