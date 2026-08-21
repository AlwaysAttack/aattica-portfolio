"use client";

import { useState } from "react";
import type { HomeContent } from "@/content/home.types";

type ContactSectionProps = {
  content: HomeContent["contact"];
};

export function ContactSection({ content }: ContactSectionProps) {
  const [status, setStatus] = useState("");

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <p className="eyebrow">{content.eyebrow}</p>
      <h2 id="contact-title">{content.title}</h2>
      <div className="contact__links">
        <a href="https://t.me/aattica">Telegram</a>
        <a href="mailto:contact@aattica.cc">contact@aattica.cc</a>
      </div>
      <form
        aria-label={content.formLabel}
        onSubmit={(event) => {
          event.preventDefault();
          setStatus(content.submittedStatus);
        }}
      >
        <label>
          {content.fields.name}
          <input name="name" required />
        </label>
        <label>
          {content.fields.replyContact}
          <input name="contact" required />
        </label>
        <label>
          {content.fields.company}
          <input name="company" />
        </label>
        <label>
          {content.fields.message}
          <textarea name="message" required />
        </label>
        <button type="submit">{content.sendLabel}</button>
      </form>
      <p className="contact__note">{content.note}</p>
      <p role="status">{status}</p>
    </section>
  );
}
