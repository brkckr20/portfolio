"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await addDoc(collection(db, "messages"), {
        ...form,
        createdAt: new Date().toISOString(),
        read: false,
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section data-id="contact" className="animated-section">
      <div className="page-title">
        <h2>Contact <span>Me</span></h2>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-5">
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <i className="fa-solid fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>email@example.com</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <i className="fa-solid fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p>+0123 123 456 789</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <i className="fa-solid fa-location-dot"></i>
              <div>
                <h4>Location</h4>
                <p>88 Some Street, Some Town</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-sm-7">
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xs-6">
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-xs-6">
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <input
              className={styles.input}
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
            />
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              name="message"
              placeholder="Your Message"
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <div className={styles.actions}>
              {status === "sent" && <span className={styles.success}>Message sent successfully!</span>}
              {status === "error" && <span className={styles.error}>Something went wrong. Try again.</span>}
              <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
