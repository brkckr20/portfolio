"use client";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "./PortfolioSection.module.css";

export default function PortfolioSection() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProjects(data);
      const cats = [...new Set(data.map((p) => p.category).filter(Boolean))];
      setCategories(cats);
    });
    return unsub;
  }, []);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  if (selected) {
    return (
      <section data-id="portfolio" className="animated-section">
        <div className="page-title">
          <h2>Port<span>folio</span></h2>
        </div>

        <button className={styles.backBtn} onClick={() => setSelected(null)}>
          <i className="fa-solid fa-arrow-left"></i> Back to projects
        </button>

        <div className={styles.detail}>
          <div className={styles.detailImage}>
            {selected.image ? (
              <img src={selected.image} alt={selected.title} />
            ) : (
              <div className={styles.placeholderImg}>
                <i className="fa-solid fa-image"></i>
              </div>
            )}
          </div>
          <div className={styles.detailContent}>
            {selected.category && (
              <span className={styles.detailCategory}>{selected.category}</span>
            )}
            <h2 className={styles.detailTitle}>{selected.title}</h2>
            {selected.technologies && (
              <div className={styles.detailTags}>
                {selected.technologies.split(",").map((t) => (
                  <span key={t} className={styles.tag}>{t.trim()}</span>
                ))}
              </div>
            )}
            <p className={styles.detailDesc}>{selected.description}</p>
            {selected.liveUrl && (
              <a href={selected.liveUrl} target="_blank" className="btn btn-primary">
                <i className="fa-solid fa-arrow-up-right-from-square"></i> View Project
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-id="portfolio" className="animated-section">
      <div className="page-title">
        <h2>Port<span>folio</span></h2>
      </div>

      {categories.length > 0 && (
        <ul className={styles.filters}>
          <li className={filter === "all" ? styles.active : ""} onClick={() => setFilter("all")}>All</li>
          {categories.map((cat) => (
            <li key={cat} className={filter === cat ? styles.active : ""} onClick={() => setFilter(cat)}>{cat}</li>
          ))}
        </ul>
      )}

      <div className={styles.grid}>
        {filtered.map((project, i) => (
          <div
            key={project.id}
            className={styles.card}
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => setSelected(project)}
          >
            <div className={styles.imageWrap}>
              {project.image ? (
                <img src={project.image} alt={project.title} />
              ) : (
                <div className={styles.placeholderImg}>
                  <i className="fa-solid fa-image"></i>
                </div>
              )}
              <div className={styles.overlay}>
                <h4>{project.title}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <p className={styles.empty}>No projects yet.</p>
      )}
    </section>
  );
}
