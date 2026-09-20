"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribed(true);
      } else {
        const data = await res.json();
        setError(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white border-b border-[#E0E0E0]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-[24px] p-8 lg:p-12 text-center max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-widest font-mono">
              EXCLUSIVE INSIDER LETTER
            </span>
            <h2 className="font-heebo text-[32px] sm:text-[40px] font-extrabold text-[#232323] tracking-tight uppercase">
              STAY AHEAD WITH CURATED DROPS
            </h2>
            <p className="text-[14px] text-[#676767] max-w-lg mx-auto">
              Subscribe to get notification about special product drops, exclusive
              early access, and curated style tips.
            </p>
          </div>

          {subscribed ? (
            <div className="p-4 bg-[#E8F5E9] text-[#1B5E20] font-bold text-[14px] rounded-[12px] max-w-md mx-auto">
              ✓ Thank you for subscribing to CURA Drops!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <div className="w-full flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full h-[46px] bg-white border border-[#E0E0E0] rounded-[10px] px-4 text-[13px] text-[#232323] placeholder-[#A0A0A0] focus:outline-none focus:border-[#232323]"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="h-[46px] px-7 uppercase font-bold shrink-0 w-full sm:w-auto"
              >
                {loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
              </Button>
            </form>
          )}

          {error && (
            <p className="text-[12px] text-red-600 font-medium">{error}</p>
          )}

          <p className="text-[11px] text-[#A0A0A0] font-mono">
            No spam. Unsubscribe anytime with one click.
          </p>
        </div>
      </div>
    </section>
  );
};

