"use client";
import styles from "./ResumeSection.module.css";

export default function ResumeSection() {
  return (
    <section data-id="resume" className="animated-section">
      <div className="page-title">
        <h2>Resume</h2>
      </div>
      <p className={styles.placeholder}>Resume content coming soon...</p>
    </section>
  );
}
