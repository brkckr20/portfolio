"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await deleteDoc(doc(db, "projects", id));
  };

  return (
    <>
      <div className="page-heading">
        <div className="page-heading-copy">
          <span className="page-icon"><i className="fa-solid fa-briefcase"></i></span>
          <div>
            <p className="eyebrow">Portfolio</p>
            <h1>Projects</h1>
            <p>Manage your portfolio projects.</p>
          </div>
        </div>
        <div className="heading-actions">
          <Link href="/admin/projects/add" className="btn-primary-admin">
            <i className="fa-solid fa-plus"></i> New Project
          </Link>
        </div>
      </div>

      {loading ? (
        <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 60 }}>Loading...</p>
      ) : projects.length === 0 ? (
        <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 60 }}>
          No projects yet. <Link href="/admin/projects/add" style={{ color: "#04b4e0" }}>Add your first project</Link>
        </p>
      ) : (
        <div className="row g-3">
          {projects.map((project) => (
            <div key={project.id} className="col-12 col-sm-6 col-lg-3">
              <div className="panel" style={{ overflow: "hidden" }}>
                {project.image ? (
                  <img src={project.image} alt={project.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                ) : (
                  <div style={{ height: 180, background: "#2a2e42", display: "flex", alignItems: "center", justifyContent: "center", color: "#7a7d93" }}>
                    <i className="fa-solid fa-image" style={{ fontSize: 40 }}></i>
                  </div>
                )}
                <div style={{ padding: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 4px" }}>{project.title}</h3>
                  {project.category && (
                    <p style={{ fontSize: 11, color: "var(--text-muted)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>{project.category}</p>
                  )}
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px" }}>{project.description}</p>
                  {project.technologies && (
                    <p style={{ fontSize: 12, color: "#04b4e0", margin: "0 0 12px" }}>{project.technologies}</p>
                  )}
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <Link href={`/admin/projects/edit/${project.id}`} className="btn-icon edit">
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                    <button className="btn-icon delete" onClick={() => handleDelete(project.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
