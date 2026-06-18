"use client";

export default function AddBlogPost() {
  return (
    <>
      <div className="page-heading">
        <div className="page-heading-copy">
          <span className="page-icon"><i className="fa-solid fa-pen"></i></span>
          <div>
            <p className="eyebrow">Content</p>
            <h1>New Blog Post</h1>
            <p>Create a new blog article.</p>
          </div>
        </div>
        <div className="heading-actions">
          <button className="btn-outline-secondary"><i className="fa-solid fa-arrow-left"></i> Back</button>
        </div>
      </div>

      <div className="panel" style={{ padding: 24 }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" placeholder="Post title" />
          </div>
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input type="text" className="form-control" placeholder="nextjs, react, tutorial" />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea className="form-control" placeholder="Write your post content here..." rows={12}></textarea>
          </div>
          <div className="form-group">
            <label>Cover Image</label>
            <input type="file" className="form-control" accept="image/*" />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button className="btn-outline-secondary">Save as Draft</button>
            <button className="btn-primary-admin"><i className="fa-solid fa-cloud-upload-alt"></i> Publish</button>
          </div>
        </form>
      </div>
    </>
  );
}
