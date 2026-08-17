"use client";

import { useState } from "react";

const demoStatus = "Demo submitted — Django delivery will be connected later.";

export function ContactSection() {
  const [status, setStatus] = useState("");

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <p className="eyebrow">03 / CONTACT</p>
      <h2 id="contact-title">Let’s make something human.</h2>
      <div className="contact__links">
        <a href="https://t.me/aattica">Telegram</a>
        <a href="mailto:contact@aattica.cc">contact@aattica.cc</a>
      </div>
      <form
        aria-label="Contact form"
        onSubmit={(event) => {
          event.preventDefault();
          setStatus(demoStatus);
        }}
      >
        <label>
          Name
          <input name="name" required />
        </label>
        <label>
          Reply contact
          <input name="contact" required />
        </label>
        <label>
          Company
          <input name="company" />
        </label>
        <label>
          Message
          <textarea name="message" required />
        </label>
        <button type="submit">Send message</button>
      </form>
      <p className="contact__note">
        Frontend demonstration — messages are not delivered yet.
      </p>
      <p role="status">{status}</p>
    </section>
  );
}
