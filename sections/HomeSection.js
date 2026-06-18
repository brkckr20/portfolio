"use client";
import { useState, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";
import styles from "./HomeSection.module.css";

export default function HomeSection() {
  const { settings, loading } = useSettings();
  const titles = settings?.title ? [settings.title] : ["Web Designer", "Frontend Developer"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (titles.length < 2) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section data-id="home" className="animated-section start-page section-active">
      <div className={`section-content ${styles.vcentered}`}>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className={styles.titleBlock}>
              <h2>{settings?.fullName || "Burak Çakır"}</h2>
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
