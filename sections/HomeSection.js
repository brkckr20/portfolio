"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSettings } from "@/context/SettingsContext";
import styles from "./HomeSection.module.css";

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_AFTER_TYPING = 2000;
const PAUSE_AFTER_DELETING = 500;

export default function HomeSection() {
  const { settings } = useSettings();
  const titles = useMemo(
    () => settings?.title?.split(",").map(t => t.trim()) || ["Web Designer", "Frontend Developer"],
    [settings?.title]
  );

  const [displayed, setDisplayed] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = titles[titleIndex];
    if (!isDeleting) {
      if (displayed.length < current.length) {
        return setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, TYPING_SPEED);
      }
      return setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING);
    }
    if (displayed.length > 0) {
      return setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, DELETING_SPEED);
    }
    setIsDeleting(false);
    setTitleIndex((prev) => (prev + 1) % titles.length);
    return setTimeout(() => {}, PAUSE_AFTER_DELETING);
  }, [displayed, isDeleting, titleIndex, titles]);

  useEffect(() => {
    const timer = tick();
    return () => clearTimeout(timer);
  }, [tick]);

  return (
    <section data-id="home" className="animated-section start-page section-active">
      <div className={`section-content ${styles.vcentered}`}>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className={styles.titleBlock}>
              <h2>{settings?.fullName || "Burak Çakır"}</h2>
              <div className={styles.rotation}>
                <span className={styles.subtitle}>
                  {displayed}
                  <span className={styles.cursor}>|</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
