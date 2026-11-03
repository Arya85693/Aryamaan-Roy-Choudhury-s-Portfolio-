"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/Icons";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="btn-ghost"
      aria-label={copied ? "Email address copied" : "Copy email address"}
    >
      {copied ? <CheckIcon className="h-4 w-4 text-up" /> : <CopyIcon className="h-4 w-4" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
