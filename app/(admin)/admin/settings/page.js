"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import "react-quill-new/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill-new"), { ssr: false });

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link"],
    ["clean"],
  ],
};

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
    experience: [],
    education: [],
    skills: [],
    categories: [],
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
          experience: data.experience || [],
          education: data.education || [],
          skills: data.skills || [],
          categories: data.categories || [],
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



  const addItem = (field, item) => setForm({ ...form, [field]: [...form[field], item] });
  const removeItem = (field, index) => setForm({ ...form, [field]: form[field].filter((_, i) => i !== index) });
  const updateItem = (field, index, key, value) => {
    const items = [...form[field]];
    items[index] = { ...items[index], [key]: value };
    setForm({ ...form, [field]: items });
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    setSaving((s) => ({ ...s, profile: true }));
    try {
      await setDoc(doc(db, "settings", SETTINGS_ID), {
        experience: form.experience,
        education: form.education,
        skills: form.skills,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      showMessage("success", "Resume saved successfully!");
    } catch (err) {
      showMessage("error", "Error: " + err.message);
    } finally {
      setSaving((s) => ({ ...s, profile: false }));
    }
  };

  const handleCategoriesSubmit = async (e) => {
    e.preventDefault();
    setSaving((s) => ({ ...s, categories: true }));
    try {
      await setDoc(doc(db, "settings", SETTINGS_ID), {
        categories: form.categories,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      showMessage("success", "Categories saved!");
    } catch (err) {
      showMessage("error", "Error: " + err.message);
    } finally {
      setSaving((s) => ({ ...s, categories: false }));
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
        <div className="col-12 col-lg-4">
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
                <div style={{ marginBottom: 50 }}>
                  <QuillEditor
                    value={form.bio}
                    onChange={(val) => setForm({ ...form, bio: val })}
                    modules={QUILL_MODULES}
                    placeholder="Write something about yourself..."
                  />
                </div>
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
        <div className="col-12 col-lg-4">
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

          <div className="panel" style={{ padding: 24, marginTop: 16 }}>
            <h2 className="section-title" style={{ marginBottom: 20 }}>
              <i className="fa-solid fa-tags"></i><span>Portfolio Categories</span>
            </h2>
            <form onSubmit={handleCategoriesSubmit}>
              <div className="form-group">
                <label>Categories</label>
                <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a category..."
                    value={form._newCategory || ""}
                    onChange={(e) => setForm({ ...form, _newCategory: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const val = form._newCategory?.trim();
                        if (val && !form.categories.includes(val)) {
                          setForm({ ...form, categories: [...form.categories, val], _newCategory: "" });
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn-primary-admin"
                    onClick={() => {
                      const val = form._newCategory?.trim();
                      if (val && !form.categories.includes(val)) {
                        setForm({ ...form, categories: [...form.categories, val], _newCategory: "" });
                      }
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                {form.categories.length === 0 && (
                  <p style={{ fontSize: 13, color: "var(--text-muted)" }}>No categories yet.</p>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {form.categories.map((cat, i) => (
                    <span key={i} style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: "#04b4e020",
                      color: "#04b4e0",
                      fontSize: 13,
                    }}>
                      {cat}
                      <button
                        type="button"
                        onClick={() => setForm({
                          ...form,
                          categories: form.categories.filter((_, j) => j !== i)
                        })}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#04b4e0",
                          cursor: "pointer",
                          padding: 0,
                          fontSize: 14,
                          opacity: 0.7,
                        }}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn-primary-admin" disabled={saving.categories}>
                <i className="fa-solid fa-save"></i> {saving.categories ? "Saving..." : "Save Categories"}
              </button>
            </form>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="panel" style={{ padding: 24 }}>
            <h2 className="section-title" style={{ marginBottom: 20 }}>
              <i className="fa-solid fa-briefcase"></i><span>Resume</span>
            </h2>
            <form onSubmit={handleResumeSubmit}>
              <div className="form-group">
                <label>Experience</label>
                {form.experience.map((exp, i) => (
                  <div key={i} className="resume-item">
                    <div className="resume-item-header">
                      <span>#{i + 1}</span>
                      <button type="button" className="btn-remove" onClick={() => removeItem("experience", i)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                    <input type="text" className="form-control" placeholder="Company" value={exp.company || ""} onChange={(e) => updateItem("experience", i, "company", e.target.value)} style={{ marginBottom: 6 }} />
                    <input type="text" className="form-control" placeholder="Position" value={exp.position || ""} onChange={(e) => updateItem("experience", i, "position", e.target.value)} style={{ marginBottom: 6 }} />
                    <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                      <input type="text" className="form-control" placeholder="Start (e.g. 2020)" value={exp.startDate || ""} onChange={(e) => updateItem("experience", i, "startDate", e.target.value)} />
                      <input type="text" className="form-control" placeholder="End (or Present)" value={exp.endDate || ""} onChange={(e) => updateItem("experience", i, "endDate", e.target.value)} />
                    </div>
                    <textarea className="form-control" rows="2" placeholder="Description" value={exp.description || ""} onChange={(e) => updateItem("experience", i, "description", e.target.value)} />
                  </div>
                ))}
                <button type="button" className="btn-add" onClick={() => addItem("experience", { company: "", position: "", startDate: "", endDate: "", description: "" })}>
                  <i className="fa-solid fa-plus"></i> Add Experience
                </button>
              </div>

              <div className="form-group">
                <label>Education</label>
                {form.education.map((edu, i) => (
                  <div key={i} className="resume-item">
                    <div className="resume-item-header">
                      <span>#{i + 1}</span>
                      <button type="button" className="btn-remove" onClick={() => removeItem("education", i)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                    <input type="text" className="form-control" placeholder="School" value={edu.school || ""} onChange={(e) => updateItem("education", i, "school", e.target.value)} style={{ marginBottom: 6 }} />
                    <input type="text" className="form-control" placeholder="Degree (e.g. Bachelor's)" value={edu.degree || ""} onChange={(e) => updateItem("education", i, "degree", e.target.value)} style={{ marginBottom: 6 }} />
                    <input type="text" className="form-control" placeholder="Field of Study" value={edu.field || ""} onChange={(e) => updateItem("education", i, "field", e.target.value)} style={{ marginBottom: 6 }} />
                    <div style={{ display: "flex", gap: 6 }}>
                      <input type="text" className="form-control" placeholder="Start Year" value={edu.startYear || ""} onChange={(e) => updateItem("education", i, "startYear", e.target.value)} />
                      <input type="text" className="form-control" placeholder="End Year" value={edu.endYear || ""} onChange={(e) => updateItem("education", i, "endYear", e.target.value)} />
                    </div>
                  </div>
                ))}
                <button type="button" className="btn-add" onClick={() => addItem("education", { school: "", degree: "", field: "", startYear: "", endYear: "" })}>
                  <i className="fa-solid fa-plus"></i> Add Education
                </button>
              </div>

              <div className="form-group">
                <label>Skills</label>
                {form.skills.map((skill, i) => (
                  <div key={i} className="resume-item" style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="text" className="form-control" placeholder="Skill name" value={skill.name || ""} onChange={(e) => updateItem("skills", i, "name", e.target.value)} style={{ flex: 1 }} />
                    <input type="number" className="form-control" placeholder="% (0-100)" min="0" max="100" value={skill.level || ""} onChange={(e) => updateItem("skills", i, "level", parseInt(e.target.value) || 0)} style={{ width: 80 }} />
                    <button type="button" className="btn-remove" onClick={() => removeItem("skills", i)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
                <button type="button" className="btn-add" onClick={() => addItem("skills", { name: "", level: 0 })}>
                  <i className="fa-solid fa-plus"></i> Add Skill
                </button>
              </div>

              <button type="submit" className="btn-primary-admin" disabled={saving.profile}>
                <i className="fa-solid fa-save"></i> {saving.profile ? "Saving..." : "Save Resume"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
