"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useSettings } from "@/context/SettingsContext";
import styles from "./Header.module.css";

const menuItems = [
  { href: "#home", icon: "fa-solid fa-house", label: "Home" },
  { href: "#about-me", icon: "fa-solid fa-user", label: "About Me" },
  { href: "#resume", icon: "fa-solid fa-graduation-cap", label: "Resume" },
  { href: "#portfolio", icon: "fa-solid fa-briefcase", label: "Portfolio" },
  { href: "#blog", icon: "fa-solid fa-book", label: "Blog" },
  { href: "#contact", icon: "fa-solid fa-envelope", label: "Contact" },
];

const animIn = [
  "animated-section-moveFromRight",
  "animated-section-moveFromLeft",
  "animated-section-moveFromTop",
  "animated-section-moveFromBottom",
  "animated-section-fadeIn",
  "animated-section-scaleUp",
];

const animOut = [
  "animated-section-moveToRight",
  "animated-section-moveToLeft",
  "animated-section-moveToTop",
  "animated-section-moveToBottom",
  "animated-section-fadeOut",
  "animated-section-scaleDown",
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { settings } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace("#", "");
    const target = document.querySelector(`[data-id="${id}"]`);
    if (!target) return;

    const active = document.querySelector(".animated-section.section-active");
    if (active && active !== target) {
      active.classList.remove("section-active");
      [...animIn, ...animOut].forEach((c) => {
        active.classList.remove(c);
        target.classList.remove(c);
      });
      const outAnim = animOut[Math.floor(Math.random() * animOut.length)];
      const inAnim = animIn[Math.floor(Math.random() * animIn.length)];
      active.classList.add(outAnim);
      target.classList.add(inAnim);
    }
    target.classList.add("section-active");
  };

  const headerClass = `${styles.header} ${isMobile && !mobileOpen ? styles.mobileHide : ""}`;

  return (
    <>
      {isMobile && (
        <div
          className={`${styles.menuToggle} ${mobileOpen ? styles.menuOpen : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <header className={headerClass}>
        <div className={styles.headerContent}>
          <div className={styles.headerPhoto}>
            <img src={settings?.photoURL || "/images/placeholder.svg"} alt={settings?.fullName || "Profile"} />
          </div>
          <div className={styles.headerTitles}>
            <h2>{settings?.fullName || "Burak Çakır"}</h2>
            <h4>{settings?.title || "Web Designer"}</h4>
          </div>
        </div>

        <ul className={styles.mainMenu}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                <i className={`${styles.menuIcon} ${item.icon}`}></i>
                <span className={styles.linkText}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.socialLinks}>
          <ul>
            {settings?.linkedin && <li><a href={settings.linkedin} target="_blank"><i className="fab fa-linkedin-in"></i></a></li>}
            {settings?.github && <li><a href={settings.github} target="_blank"><i className="fab fa-github"></i></a></li>}
            {settings?.twitter && <li><a href={settings.twitter} target="_blank"><i className="fab fa-twitter"></i></a></li>}
          </ul>
        </div>

        <div className={styles.headerButtons}>
          <button className={styles.themeBtn} onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <a href={settings?.cvURL || "#"} className="btn btn-primary" target={settings?.cvURL ? "_blank" : "_self"} rel="noopener noreferrer">Download CV</a>
        </div>

        <div className={styles.copyrights}>© 2020 - {new Date().getFullYear()} All rights reserved.</div>
      </header>
    </>
  );
}
