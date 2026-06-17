"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function EditProject() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", description: "", category: "", technologies: "", liveUrl: "", image: "" });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "projects", id));
      if (snap.exists()) {
        const data = snap.data();
        setForm({ title: data.title, description: data.description, category: data.category || "", technologies: data.technologies || "", liveUrl: data.liveUrl || "", image: data.image || "" });
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoc(doc(db, "projects", id), {
        ...form,
        updatedAt: serverTimestamp(),
      });
      router.push("/admin/projects");
    } catch (err) {
      alert("Error: " + err.message);
      setSaving(false);
    }
  };

  if (loading) return <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 60 }}>Loading...</p>;

  return (
    <>
      <div className="page-heading">
        <div className="page-heading-copy">
          <span className="page-icon"><i className="fa-solid fa-pen"></i></span>
          <div>
            <p className="eyebrow">Portfolio</p>
            <h1>Edit Project</h1>
            <p>Update your project details.</p>
          </div>
        </div>
        <div className="heading-actions">
          <button className="btn-outline-secondary" onClick={() => router.back()}>
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
        </div>
      </div>

      <div className="panel" style={{ padding: 24 }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Title</label>
            <input type="text" className="form-control" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" name="description" rows={4} value={form.description} onChange={handleChange} required />
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="form-group">
                <label>Category</label>
                <input type="text" className="form-control" name="category" placeholder="Web App, Mobile, Design..." value={form.category} onChange={handleChange} />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group">
                <label>Technologies</label>
                <input type="text" className="form-control" name="technologies" value={form.technologies} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="form-group">
                <label>Live URL</label>
                <input type="url" className="form-control" name="liveUrl" value={form.liveUrl} onChange={handleChange} />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group">
                <label>Image URL</label>
                <input type="url" className="form-control" name="image" placeholder="https://example.com/image.jpg" value={form.image} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button type="button" className="btn-outline-secondary" onClick={() => router.back()}>Cancel</button>
            <button type="submit" className="btn-primary-admin" disabled={saving}>
              <i className="fa-solid fa-save"></i> {saving ? "Saving..." : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
