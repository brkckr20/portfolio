"use client";
import { useSettings } from "@/context/SettingsContext";
import styles from "./ResumeSection.module.css";

export default function ResumeSection() {
  const { settings } = useSettings();

  const experience = (settings?.experience || []).sort((a, b) => {
    const aEnd = a.endDate || a.startDate || "";
    const bEnd = b.endDate || b.startDate || "";
    return bEnd.localeCompare(aEnd);
  });
  const education = (settings?.education || []).sort((a, b) => {
    const aEnd = a.endYear || a.startYear || "";
    const bEnd = b.endYear || b.startYear || "";
    return bEnd.localeCompare(aEnd);
  });
  const skills = settings?.skills || [];

  return (
    <section data-id="resume" className="animated-section">
      <div className="page-title">
        <h2>Resume</h2>
      </div>
      <div className="section-content">
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className={styles.blockTitle}>
              <i className="fa-solid fa-briefcase"></i>
              <span>Experience</span>
            </div>
            <div className={styles.timeline}>
              {experience.length === 0 && <p className={styles.empty}>No experience added yet.</p>}
              {experience.map((exp, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineDate}>{exp.startDate}{exp.endDate ? ` - ${exp.endDate}` : ''}</div>
                    <h4 className={styles.timelineTitle}>{exp.position}</h4>
                    <span className={styles.timelineSubtitle}>{exp.company}</span>
                    {exp.description && <p className={styles.timelineDesc}>{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-xs-12 col-sm-6">
            <div className={styles.blockTitle}>
              <i className="fa-solid fa-graduation-cap"></i>
              <span>Education</span>
            </div>
            <div className={styles.timeline}>
              {education.length === 0 && <p className={styles.empty}>No education added yet.</p>}
              {education.map((edu, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineDate}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</div>
                    <h4 className={styles.timelineTitle}>{edu.degree ? `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}` : edu.field}</h4>
                    <span className={styles.timelineSubtitle}>{edu.school}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="row" style={{ marginTop: 40 }}>
            <div className="col-xs-12">
              <div className={styles.blockTitle}>
                <i className="fa-solid fa-code"></i>
                <span>Skills</span>
              </div>
              <div className="row">
                {skills.map((skill, i) => (
                  <div key={i} className="col-xs-12 col-sm-6">
                    <div className={styles.skillItem}>
                      <div className={styles.skillHeader}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span className={styles.skillPercent}>{skill.level}%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div className={styles.skillBarFill} style={{ width: `${Math.min(skill.level, 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {settings?.cvURL && (
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <a href={settings.cvURL} target="_blank" rel="noopener noreferrer" className={styles.cvButton}>
              <i className="fa-solid fa-download"></i> Download CV
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
