export default function AdminSettings() {
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

      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="panel" style={{ padding: 24 }}>
            <h2 className="section-title" style={{ marginBottom: 20 }}><i className="fa-solid fa-user"></i><span>Profile</span></h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" defaultValue="Burak Çakır" />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" defaultValue="Web Designer / Frontend Developer" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" defaultValue="burak@example.com" />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea className="form-control" rows={4} defaultValue="I'm a passionate web designer and frontend developer..."></textarea>
              </div>
              <div className="form-group">
                <label>Profile Photo</label>
                <input type="file" className="form-control" accept="image/*" />
              </div>
              <button type="submit" className="btn-primary-admin"><i className="fa-solid fa-save"></i> Save Changes</button>
            </form>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="panel" style={{ padding: 24 }}>
            <h2 className="section-title" style={{ marginBottom: 20 }}><i className="fa-solid fa-file-pdf"></i><span>CV / Resume</span></h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Upload CV (PDF)</label>
                <input type="file" className="form-control" accept=".pdf" />
                <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '6px 0 0' }}>Current: No file uploaded</p>
              </div>
              <button type="submit" className="btn-primary-admin"><i className="fa-solid fa-upload"></i> Upload CV</button>
            </form>
          </div>

          <div className="panel" style={{ padding: 24, marginTop: 16 }}>
            <h2 className="section-title" style={{ marginBottom: 20 }}><i className="fa-solid fa-link"></i><span>Social Links</span></h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>LinkedIn</label>
                <input type="url" className="form-control" placeholder="https://linkedin.com/in/..." />
              </div>
              <div className="form-group">
                <label>GitHub</label>
                <input type="url" className="form-control" placeholder="https://github.com/..." />
              </div>
              <div className="form-group">
                <label>Twitter / X</label>
                <input type="url" className="form-control" placeholder="https://twitter.com/..." />
              </div>
              <button type="submit" className="btn-primary-admin"><i className="fa-solid fa-save"></i> Save Links</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
