"use client";
import { useSettings } from "@/context/SettingsContext";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const { settings } = useSettings();

  const info = [
    { title: "e-mail", value: settings?.email || "email@example.com" },
    { title: "Phone", value: "+90 541 621 50 73" },
  ];

  return (
    <section data-id="about-me" className="animated-section">
      <div className="page-title">
        <h2>About <span>Me</span></h2>
      </div>
      <div className="section-content">
        <div className="row">
          <div className="col-xs-12 col-sm-7">
            {settings?.bio ? (
              <div className={styles.bioContent} dangerouslySetInnerHTML={{ __html: settings.bio }} />
            ) : (
              <p>Proin volutpat mauris ac pellentesque pharetra. Suspendisse congue elit vel odio suscipit, sit amet tempor nisl imperdiet. Quisque ex justo, faucibus ut mi in, condimentum finibus dolor.</p>
            )}
          </div>
          <div className="col-xs-12 col-sm-5">
            <div className="info-list">
              <ul>
                {info.map((item) => (
                  <li key={item.title}>
                    <span className="title">{item.title}: </span>
                    <span className="value">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
