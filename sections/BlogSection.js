"use client";
import styles from "./BlogSection.module.css";

export default function BlogSection() {
  return (
    <section data-id="blog" className="animated-section">
      <div className="page-title">
        <h2>Blog</h2>
      </div>
      <p className={styles.placeholder}>Blog posts coming soon...</p>
    </section>
  );
}
