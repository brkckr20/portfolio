"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSettings } from "@/context/SettingsContext";

export default function AddProject() {
  const router = useRouter();
  const { settings } = useSettings();
  const categories = settings?.categories || [];
  const [form, setForm] = useState({ title: "", description: "", category: "", technologies: "", liveUrl: "", image: "" });
  const [customCategory, setCustomCategory] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "category" && e.target.value === "__custom__") {
      setCustomCategory(true);
      setForm({ ...form, category: "" });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, "projects"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      router.push("/admin/projects");
    } catch (err) {
      alert("Error: " + err.message);
      setSaving(false);
    }
  };

  return (
    <>
      <div className="page-heading">
        <div className="page-heading-copy">
          <span className="page-icon"><i className="fa-solid fa-pen"></i></span>
          <div>
            <p className="eyebrow">Portfolio</p>
            <h1>New Project</h1>
            <p>Add a new project to your portfolio.</p>
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
            <input type="text" className="form-control" name="title" placeholder="Project name" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" name="description" placeholder="Brief description..." rows={4} value={form.description} onChange={handleChange} required />
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="form-group">
                <label>Category</label>
                {!customCategory ? (
                  <div style={{ display: "flex", gap: 6 }}>
                    <select
                      className="form-control"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      style={{ flex: 1 }}
                    >
                      <option value="">Select category</option>
                      {categories.length === 0 && (
                        <option value="" disabled>No categories yet — add in Settings</option>
                      )}
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="__custom__">+ Type custom category</option>
                    </select>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 6 }}>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      placeholder="Enter category..."
                      value={form.category}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn-outline-secondary"
                      onClick={() => { setCustomCategory(false); setForm({ ...form, category: "" }); }}
                      style={{ flexShrink: 0 }}
                    >
                      <i className="fa-solid fa-list"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group">
                <label>Technologies</label>
                <input type="text" className="form-control" name="technologies" placeholder="Next.js, Firebase, Stripe" value={form.technologies} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="form-group">
                <label>Live URL</label>
                <input type="url" className="form-control" name="liveUrl" placeholder="https://example.com" value={form.liveUrl} onChange={handleChange} />
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
              <i className="fa-solid fa-save"></i> {saving ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
