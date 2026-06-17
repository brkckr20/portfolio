"use client";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const info = [
    { title: "Age", value: "32" },
    { title: "Residence", value: "USA" },
    { title: "Address", value: "88 Some Street, Some Town" },
    { title: "e-mail", value: "email@example.com" },
    { title: "Phone", value: "+0123 123 456 789" },
  ];

  return (
    <section data-id="about-me" className="animated-section">
      <div className="page-title">
        <h2>About <span>Me</span></h2>
      </div>
      <div className="section-content">
        <div className="row">
          <div className="col-xs-12 col-sm-7">
            <p>Proin volutpat mauris ac pellentesque pharetra. Suspendisse congue elit vel odio suscipit, sit amet tempor nisl imperdiet. Quisque ex justo, faucibus ut mi in, condimentum finibus dolor. Aliquam vitae hendrerit dolor, eget imperdiet mauris. Maecenas et ante id ipsum condimentum dictum et vel massa. Ut in imperdiet dolor, vel consectetur dui.</p>
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
