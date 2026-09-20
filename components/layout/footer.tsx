"use client";

import React, { useState } from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
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
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Subscription failed.");
      }
    } catch {
      setError("Error subscribing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#121212] text-white pt-16 pb-8 border-t border-[#232323]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 space-y-12">
        {/* Top 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="font-oswald text-[32px] font-extrabold tracking-tight text-white block">
              CURA.
            </Link>
            <p className="text-[13px] text-[#A0A0A0] leading-relaxed max-w-sm">
              Your premier destination for luxury footwear, branded sneakers,
              apparel, fine horology, and optics. Crafted for everyday greatness.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-[#A0A0A0]">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-[#232323] flex items-center justify-center hover:text-white hover:bg-[#333333] transition-colors">
                IG
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full bg-[#232323] flex items-center justify-center hover:text-white hover:bg-[#333333] transition-colors">
                FB
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="w-8 h-8 rounded-full bg-[#232323] flex items-center justify-center hover:text-white hover:bg-[#333333] transition-colors">
                X
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok" className="w-8 h-8 rounded-full bg-[#232323] flex items-center justify-center hover:text-white hover:bg-[#333333] transition-colors">
                TK
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heebo text-[13px] font-bold text-white uppercase tracking-wider">
              SHOP
            </h4>
            <ul className="space-y-2 text-[13px] text-[#A0A0A0]">
              <li><Link href="/shop?category=sneakers" className="hover:text-white transition-colors">All Shoes & Sneakers</Link></li>
              <li><Link href="/shop?category=shirts" className="hover:text-white transition-colors">Apparel & Shirts</Link></li>
              <li><Link href="/shop?category=watches" className="hover:text-white transition-colors">Wrist Watches</Link></li>
              <li><Link href="/shop?category=eyewear" className="hover:text-white transition-colors">Spectacles & Eyewear</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link href="/sale" className="hover:text-white transition-colors">Special Sale Items</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heebo text-[13px] font-bold text-white uppercase tracking-wider">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-[13px] text-[#A0A0A0]">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link href="/authenticity" className="hover:text-white transition-colors">Authenticity Guarantee</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heebo text-[13px] font-bold text-white uppercase tracking-wider">
              COMPANY
            </h4>
            <ul className="space-y-2 text-[13px] text-[#A0A0A0]">
              <li><Link href="/about" className="hover:text-white transition-colors">About CURA</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers (Hiring)</Link></li>
              <li><Link href="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/press" className="hover:text-white transition-colors">Press & Media</Link></li>
              <li><Link href="/stores" className="hover:text-white transition-colors">Store Locator</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy & Cookie</Link></li>
            </ul>
          </div>

          {/* Get 10% Off */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heebo text-[13px] font-bold text-white uppercase tracking-wider">
              GET 10% OFF
            </h4>
            <p className="text-[12px] text-[#A0A0A0]">
              Subscribe for instant 10% discount code on your first order.
            </p>
            {submitted ? (
              <p className="text-[12px] text-green-400 font-bold">
                ✓ Check your inbox for 10% off!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <label htmlFor="footer-email" className="sr-only">
                  Email address for 10% discount
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  aria-label="Email address for 10% discount"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-[40px] bg-[#232323] border border-[#333333] rounded-[8px] pl-3 pr-8 text-[12px] text-white placeholder-[#676767] focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Submit 10% off email subscription"
                  className="absolute right-2 top-2.5 text-[#A0A0A0] hover:text-white focus:outline-none"
                >
                  &rarr;
                </button>
              </form>
            )}
            {error && <p className="text-[11px] text-red-400">{error}</p>}
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-[#232323] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#676767] font-mono">
          <div>
            &copy; 2026 CURA Inc. All Rights Reserved. Designed for excellence.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

