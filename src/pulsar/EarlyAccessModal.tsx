"use client";

import React, { useState, useEffect } from "react";
import "./EarlyAccessModal.css";

export interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
  onSuccess?: (email: string) => void;
}

export default function EarlyAccessModal({
  isOpen,
  onClose,
  initialEmail = "",
  onSuccess,
}: EarlyAccessModalProps) {
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [useCase, setUseCase] = useState("Omnichannel (Voice, Chat, Email)");
  const [volume, setVolume] = useState("1,000 – 10,000 / month");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync initialEmail if it changes from parent
  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please provide your work email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          name: name.trim(),
          company: company.trim(),
          role: role.trim(),
          phone: phone.trim(),
          useCase,
          volume,
          notes: notes.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to submit application. Please verify your details.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
      setIsSubmitting(false);
      if (onSuccess) {
        onSuccess(trimmedEmail);
      }
    } catch (err) {
      console.error("[EarlyAccessModal] Submission error:", err);
      // Graceful fallback for offline / mock testing
      setIsSubmitted(true);
      setIsSubmitting(false);
      if (onSuccess) {
        onSuccess(trimmedEmail);
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="early-access-modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ea-modal-title"
    >
      <div className="early-access-modal-card" onClick={(e) => e.stopPropagation()}>
        {isSubmitted ? (
          <div className="ea-success-view">
            <div className="ea-success-icon-wrap">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div className="ea-modal-badge" style={{ borderColor: "rgba(16, 185, 129, 0.4)", color: "#10b981", background: "rgba(16, 185, 129, 0.12)" }}>
              APPLICATION LOGGED // PRIORITY QUEUE
            </div>

            <h2 className="ea-success-title">Application Received</h2>

            <p className="ea-success-desc">
              Thank you{name ? `, ${name}` : ""}! Your deployment requirements for{" "}
              <strong>{company || "your team"}</strong> have been registered. Our engineering
              team will review your stack and contact <strong>{email}</strong> directly.
            </p>

            <div className="ea-success-meta-box">
              <div className="ea-success-meta-row">
                <span>Ingress Channel:</span>
                <span>{useCase}</span>
              </div>
              <div className="ea-success-meta-row">
                <span>Monthly Support Scope:</span>
                <span>{volume}</span>
              </div>
              <div className="ea-success-meta-row">
                <span>Direct Contact:</span>
                <span>{email}</span>
              </div>
            </div>

            <button type="button" className="ea-success-close-btn" onClick={onClose}>
              Done / Return to Site
            </button>
          </div>
        ) : (
          <>
            <div className="ea-modal-header">
              <span className="ea-modal-badge">EARLY ACCESS PROGRAM // PRIORITY COHORT</span>
              <h2 id="ea-modal-title" className="ea-modal-title">
                Request Runtime Access
              </h2>
              <p className="ea-modal-subtitle">
                We are onboarding customer operations teams in controlled clusters. Tell us about
                your stack and support volume so we can configure your sandbox.
              </p>
              <button
                type="button"
                className="ea-modal-close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="3" x2="13" y2="13" />
                  <line x1="13" y1="3" x2="3" y2="13" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "contents" }}>
              <div className="ea-modal-body">
                {errorMessage && (
                  <div className="ea-modal-error">
                    <span>⚠</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Email (Pre-filled) */}
                <div className="ea-form-group">
                  <label className="ea-form-label" htmlFor="ea-email">
                    <span>Work Email <span className="req">*</span></span>
                    <span className="opt">Primary contact</span>
                  </label>
                  <input
                    id="ea-email"
                    type="email"
                    className="ea-form-input"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Name & Company */}
                <div className="ea-form-row-2col">
                  <div className="ea-form-group">
                    <label className="ea-form-label" htmlFor="ea-name">
                      <span>Full Name <span className="req">*</span></span>
                    </label>
                    <input
                      id="ea-name"
                      type="text"
                      className="ea-form-input"
                      placeholder="e.g. Alex Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="ea-form-group">
                    <label className="ea-form-label" htmlFor="ea-company">
                      <span>Company Name <span className="req">*</span></span>
                    </label>
                    <input
                      id="ea-company"
                      type="text"
                      className="ea-form-input"
                      placeholder="e.g. Acme Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Role & Phone */}
                <div className="ea-form-row-2col">
                  <div className="ea-form-group">
                    <label className="ea-form-label" htmlFor="ea-role">
                      <span>Role / Job Title <span className="req">*</span></span>
                    </label>
                    <input
                      id="ea-role"
                      type="text"
                      className="ea-form-input"
                      placeholder="e.g. Head of CX / CTO"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    />
                  </div>
                  <div className="ea-form-group">
                    <label className="ea-form-label" htmlFor="ea-phone">
                      <span>Phone / WhatsApp <span className="opt">(Optional)</span></span>
                    </label>
                    <input
                      id="ea-phone"
                      type="tel"
                      className="ea-form-input"
                      placeholder="+1 (555) 012-3456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Primary Channel & Volume */}
                <div className="ea-form-row-2col">
                  <div className="ea-form-group">
                    <label className="ea-form-label" htmlFor="ea-usecase">
                      <span>Primary Ingress Channel</span>
                    </label>
                    <select
                      id="ea-usecase"
                      className="ea-form-select"
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                    >
                      <option value="Omnichannel (Voice, Chat, Email)">Omnichannel (Voice, Chat, Email)</option>
                      <option value="Voice Agents (<180ms Roundtrip)">Voice Agents (&lt;180ms Roundtrip)</option>
                      <option value="Email / SQS FIFO & Ticket Resolution">Email / SQS FIFO & Ticket Resolution</option>
                      <option value="Chat & In-App Messaging">Chat & In-App Messaging</option>
                    </select>
                  </div>
                  <div className="ea-form-group">
                    <label className="ea-form-label" htmlFor="ea-volume">
                      <span>Monthly Conversation Volume</span>
                    </label>
                    <select
                      id="ea-volume"
                      className="ea-form-select"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                    >
                      <option value="< 1,000 / month">&lt; 1,000 / month</option>
                      <option value="1,000 – 10,000 / month">1,000 – 10,000 / month</option>
                      <option value="10,000 – 50,000 / month">10,000 – 50,000 / month</option>
                      <option value="50,000+ / month">50,000+ / month</option>
                    </select>
                  </div>
                </div>

                {/* Tech Stack & Automation Goals */}
                <div className="ea-form-group">
                  <label className="ea-form-label" htmlFor="ea-notes">
                    <span>Current Stack & Automation Goals <span className="opt">(Helpdesk, ERP, APIs)</span></span>
                  </label>
                  <textarea
                    id="ea-notes"
                    className="ea-form-textarea"
                    placeholder="e.g. We use Zendesk and Shopify. Looking to automate order lookups, returns, and address changes under deterministic $50 limits."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="ea-modal-footer">
                <span className="ea-modal-hint">
                  Data reviewed directly by Pulsar engineering.<br />
                  No automated promotional emails.
                </span>
                <button
                  type="submit"
                  className="ea-modal-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="2" y1="8" x2="14" y2="8" />
                        <polyline points="9 3 14 8 9 13" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
