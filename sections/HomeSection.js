"use client";
import { useState, useEffect } from "react";
import styles from "./HomeSection.module.css";

const titles = ["Web Designer", "Frontend Developer"];

export default function HomeSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section data-id="home" className="animated-section start-page section-active">
      <div className={`section-content ${styles.vcentered}`}>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className={styles.titleBlock}>
              <h2>Burak Çakır</h2>
              <div className={styles.rotation}>
                <div className={styles.item}>
                  <div className={styles.subtitle}>{titles[current]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
