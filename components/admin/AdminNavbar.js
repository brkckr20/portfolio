"use client";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import styles from "./AdminNavbar.module.css";

export default function AdminNavbar({ onToggleSidebar }) {
  const { toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.sidebarToggle} onClick={onToggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={styles.search}>
          <i className="fa-solid fa-search"></i>
          <input type="search" placeholder="Search..." />
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} onClick={toggleTheme} title="Toggle theme">
          <i className="fa-solid fa-moon"></i>
        </button>
        <a href="/" target="_blank" className={styles.iconBtn} title="Arayüz">
          <i className="fa-solid fa-display"></i>
        </a>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <i className="fa-solid fa-user"></i>
          </div>
          <span className={styles.profileName}>{user?.email || "Admin"}</span>
        </div>
        <button className={styles.iconBtn} onClick={logout} title="Sign out">
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </nav>
  );
}
