"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSettings } from "@/context/SettingsContext";

export default function EditProject() {
  const router = useRouter();
  const { id } = useParams();
  const { settings } = useSettings();
  const categories = settings?.categories || [];
  const [form, setForm] = useState({ title: "", description: "", category: "", technologies: "", liveUrl: "", image: "" });
  const [customCategory, setCustomCategory] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "projects", id));
      if (snap.exists()) {
        const data = snap.data();
        const cat = data.category || "";
        setForm({ title: data.title, description: data.description, category: cat, technologies: data.technologies || "", liveUrl: data.liveUrl || "", image: data.image || "" });
        if (cat && categories.length > 0 && !categories.includes(cat)) {
          setCustomCategory(true);
        }
      }
      setLoading(false);
    };
    fetch();
  }, [id, categories]);

  const handleChange = (e) => {
    if (e.target.name === "category" && e.target.value === "__custom__") {
      setCustomCategory(true);
      setForm({ ...form, category: "" });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        // Resize to max 1200px on the longest side to stay well under Firestore's 1MB doc limit
        const MAX = 1200;
        let { width, height } = img;
        if (width > height && width > MAX) {
          height = Math.round((height * MAX) / width);
          width = MAX;
        } else if (height > MAX) {
          width = Math.round((width * MAX) / height);
          height = MAX;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);

        // Firestore document limit is ~1MB; base64 adds ~33% overhead.
        if (dataUrl.length > 900000) {
          setImageError("Image is too large even after compression. Please use a smaller image.");
          return;
        }

        setForm((f) => ({ ...f, image: dataUrl }));
      };
      img.onerror = () => setImageError("Could not read the image file.");
      img.src = ev.target.result;
    };
    reader.onerror = () => setImageError("Could not read the file.");
    reader.readAsDataURL(file);
  };

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
                <label>Project Image</label>
                <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                {imageError && (
                  <p style={{ color: "#ef4444", fontSize: 13, margin: "6px 0 0" }}>{imageError}</p>
                )}
                {form.image && (
                  <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={form.image} alt="Preview" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 6 }} />
                    <button
                      type="button"
                      className="btn-outline-secondary"
                      onClick={() => setForm({ ...form, image: "" })}
                    >
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                  </div>
                )}
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
