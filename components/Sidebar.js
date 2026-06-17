"use client";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { href: "#home", icon: "fa-solid fa-house", label: "Home" },
    { href: "#about-me", icon: "fa-solid fa-user", label: "About Me" },
    { href: "#resume", icon: "fa-solid fa-graduation-cap", label: "Resume" },
    { href: "#portfolio", icon: "fa-solid fa-briefcase", label: "Portfolio" },
    { href: "#blog", icon: "fa-solid fa-book", label: "Blog" },
    { href: "#contact", icon: "fa-solid fa-envelope", label: "Contact" },
  ];

  return (
    <header className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.photo}>
          <img src="/images/placeholder.svg" alt="Burak Çakır" />
        </div>
        <div className={styles.titles}>
          <h2>Burak Çakır</h2>
          <h4>Web Designer</h4>
        </div>

        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={styles.menuLink}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.social}>
          <a href="#" target="_blank"><i className="fa-brands fa-linkedin-in"></i></a>
          <a href="#" target="_blank"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" target="_blank"><i className="fa-brands fa-twitter"></i></a>
        </div>

        <div className={styles.buttons}>
          <a href="#" className="btn btn-primary">Download CV</a>
        </div>

        <button className={styles.themeToggle} onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        <div className={styles.copyright}>© 2026 All rights reserved.</div>
      </div>
    </header>
  );
}
