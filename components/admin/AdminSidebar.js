"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminSidebar.module.css";

const navItems = [
  { href: "/admin", icon: "fa-solid fa-gauge-high", label: "Dashboard" },
  { href: "/admin/blog", icon: "fa-solid fa-newspaper", label: "Blog" },
  { href: "/admin/projects", icon: "fa-solid fa-briefcase", label: "Projects" },
  { href: "/admin/settings", icon: "fa-solid fa-gear", label: "Settings" },
];

export default function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {open && <div className={styles.backdrop} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <div className={styles.header}>
          <Link href="/admin" className={styles.brand}>
            <i className="fa-solid fa-grid-2"></i>
            <span className={styles.brandCopy}>
              <span className={styles.brandTitle}>adminHMD</span>
              <span className={styles.brandSubtitle}>Admin Panel</span>
            </span>
          </Link>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                onClick={onClose}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.user}>
          <div className={styles.avatar}>
            <i className="fa-solid fa-user"></i>
          </div>
          <div>
            <strong>Burak Çakır</strong>
            <small>Admin</small>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.statusDot}></span>
          <span>System running smoothly</span>
        </div>
      </aside>
    </>
  );
}
