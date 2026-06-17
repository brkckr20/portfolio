import Link from "next/link";

export default function AdminBlog() {
  return (
    <>
      <div className="page-heading">
        <div className="page-heading-copy">
          <span className="page-icon"><i className="fa-solid fa-newspaper"></i></span>
          <div>
            <p className="eyebrow">Content</p>
            <h1>Blog Posts</h1>
            <p>Manage your blog articles.</p>
          </div>
        </div>
        <div className="heading-actions">
          <Link href="/admin/blog/add" className="btn-primary-admin">
            <i className="fa-solid fa-plus"></i> New Post
          </Link>
        </div>
      </div>

      <div className="panel">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="user-cell">
                    <div className="avatar"><i className="fa-solid fa-file-lines"></i></div>
                    <div>
                      <p className="name mb-0">Getting Started with Next.js</p>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-success" style={{ background: '#04b4e020', color: '#04b4e0', marginRight: 4 }}>nextjs</span><span className="badge badge-success" style={{ background: '#04b4e020', color: '#04b4e0' }}>react</span></td>
                <td><span className="badge badge-success">Published</span></td>
                <td>Jun 12, 2026</td>
                <td className="text-end">
                  <button className="btn-icon edit"><i className="fa-solid fa-pen"></i></button>
                  <button className="btn-icon delete"><i className="fa-solid fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="user-cell">
                    <div className="avatar"><i className="fa-solid fa-file-lines"></i></div>
                    <div>
                      <p className="name mb-0">CSS Grid vs Flexbox</p>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-success" style={{ background: '#04b4e020', color: '#04b4e0', marginRight: 4 }}>css</span><span className="badge badge-success" style={{ background: '#04b4e020', color: '#04b4e0' }}>layout</span></td>
                <td><span className="badge badge-success">Published</span></td>
                <td>Jun 5, 2026</td>
                <td className="text-end">
                  <button className="btn-icon edit"><i className="fa-solid fa-pen"></i></button>
                  <button className="btn-icon delete"><i className="fa-solid fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="user-cell">
                    <div className="avatar"><i className="fa-solid fa-file-lines"></i></div>
                    <div>
                      <p className="name mb-0">Firebase Tips for Beginners</p>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-success" style={{ background: '#04b4e020', color: '#04b4e0', marginRight: 4 }}>firebase</span><span className="badge badge-success" style={{ background: '#04b4e020', color: '#04b4e0' }}>backend</span></td>
                <td><span className="badge badge-warning">Draft</span></td>
                <td>Jun 1, 2026</td>
                <td className="text-end">
                  <button className="btn-icon edit"><i className="fa-solid fa-pen"></i></button>
                  <button className="btn-icon delete"><i className="fa-solid fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="user-cell">
                    <div className="avatar"><i className="fa-solid fa-file-lines"></i></div>
                    <div>
                      <p className="name mb-0">JavaScript Performance Tips</p>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-success" style={{ background: '#04b4e020', color: '#04b4e0', marginRight: 4 }}>javascript</span></td>
                <td><span className="badge badge-secondary">Draft</span></td>
                <td>May 28, 2026</td>
                <td className="text-end">
                  <button className="btn-icon edit"><i className="fa-solid fa-pen"></i></button>
                  <button className="btn-icon delete"><i className="fa-solid fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
