"use client";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SETTINGS_ID = "general";

export default function AdminSettings() {
  const [form, setForm] = useState({
    fullName: "",
    title: "",
    email: "",
    bio: "",
    photoURL: "",
    cvURL: "",
    linkedin: "",
    github: "",
    twitter: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({ profile: false, cv: false, links: false });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "settings", SETTINGS_ID));
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          fullName: data.fullName || "",
          title: data.title || "",
          email: data.email || "",
          bio: data.bio || "",
          photoURL: data.photoURL || "",
          cvURL: data.cvURL || "",
          linkedin: data.linkedin || "",
          github: data.github || "",
          twitter: data.twitter || "",
        });
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving((s) => ({ ...s, profile: true }));
    try {
      await setDoc(doc(db, "settings", SETTINGS_ID), {
        fullName: form.fullName,
        title: form.title,
        email: form.email,
        bio: form.bio,
        photoURL: form.photoURL,
        cvURL: form.cvURL,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      showMessage("success", "Profile saved successfully!");
    } catch (err) {
      showMessage("error", "Error: " + err.message);
    } finally {
      setSaving((s) => ({ ...s, profile: false }));
    }
  };



  const handleLinksSubmit = async (e) => {
    e.preventDefault();
    setSaving((s) => ({ ...s, links: true }));
    try {
      await setDoc(doc(db, "settings", SETTINGS_ID), {
        linkedin: form.linkedin,
        github: form.github,
        twitter: form.twitter,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      showMessage("success", "Social links saved!");
    } catch (err) {
      showMessage("error", "Error: " + err.message);
    } finally {
      setSaving((s) => ({ ...s, links: false }));
    }
  };

  if (loading) return <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 60 }}>Loading...</p>;

  return (
    <>
      <div className="page-heading">
        <div className="page-heading-copy">
          <span className="page-icon"><i className="fa-solid fa-gear"></i></span>
          <div>
            <p className="eyebrow">Configuration</p>
            <h1>Settings</h1>
            <p>Manage your site settings and profile.</p>
          </div>
        </div>
      </div>

      {message.text && (
        <div style={{
          padding: "12px 16px",
          borderRadius: 8,
          marginBottom: 16,
          background: message.type === "success" ? "#10b98120" : "#ef444420",
          color: message.type === "success" ? "#10b981" : "#ef4444",
          border: `1px solid ${message.type === "success" ? "#10b98140" : "#ef444440"}`,
        }}>
          {message.type === "success" ? <i className="fa-solid fa-check-circle"></i> : <i className="fa-solid fa-exclamation-circle"></i>} {message.text}
        </div>
      )}

      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="panel" style={{ padding: 24 }}>
            <h2 className="section-title" style={{ marginBottom: 20 }}>
              <i className="fa-solid fa-user"></i><span>Profile</span>
            </h2>
            <form onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" name="fullName" value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name="title" value={form.title} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea className="form-control" name="bio" rows={4} value={form.bio} onChange={handleChange}></textarea>
              </div>
              <div className="form-group">
                <label>Profile Photo URL</label>
                <input type="url" className="form-control" name="photoURL" placeholder="https://example.com/photo.jpg" value={form.photoURL} onChange={handleChange} />
                {form.photoURL && (
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <img src={form.photoURL} alt="Profile" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Preview</span>
                  </div>
                )}
              </div>
              <button type="submit" className="btn-primary-admin" disabled={saving.profile}>
                <i className="fa-solid fa-save"></i> {saving.profile ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="panel" style={{ padding: 24 }}>
            <h2 className="section-title" style={{ marginBottom: 20 }}>
              <i className="fa-solid fa-file-pdf"></i><span>CV / Resume</span>
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>CV / Resume URL</label>
                <input type="url" className="form-control" name="cvURL" placeholder="https://example.com/cv.pdf" value={form.cvURL} onChange={handleChange} />
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "6px 0 0" }}>
                  {form.cvURL ? <a href={form.cvURL} target="_blank" rel="noopener noreferrer" style={{ color: "#04b4e0" }}>View CV</a> : "No file uploaded"}
                </p>
              </div>
            </form>
          </div>

          <div className="panel" style={{ padding: 24, marginTop: 16 }}>
            <h2 className="section-title" style={{ marginBottom: 20 }}>
              <i className="fa-solid fa-link"></i><span>Social Links</span>
            </h2>
            <form onSubmit={handleLinksSubmit}>
              <div className="form-group">
                <label>LinkedIn</label>
                <input type="url" className="form-control" name="linkedin" placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>GitHub</label>
                <input type="url" className="form-control" name="github" placeholder="https://github.com/..." value={form.github} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Twitter / X</label>
                <input type="url" className="form-control" name="twitter" placeholder="https://twitter.com/..." value={form.twitter} onChange={handleChange} />
              </div>
              <button type="submit" className="btn-primary-admin" disabled={saving.links}>
                <i className="fa-solid fa-save"></i> {saving.links ? "Saving..." : "Save Links"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
