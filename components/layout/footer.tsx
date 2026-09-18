import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121212] text-white pt-16 pb-8 border-t border-[#232323]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 space-y-12">
        {/* Top 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-oswald text-[32px] font-extrabold tracking-tight text-white">
              CURA.
            </div>
            <p className="text-[13px] text-[#A0A0A0] leading-relaxed max-w-sm">
              Your premier destination for luxury footwear, branded sneakers,
              apparel, fine horology, and optics. Crafted for everyday greatness.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-[#A0A0A0]">
              <a href="#" className="w-8 h-8 rounded-full bg-[#232323] flex items-center justify-center hover:text-white hover:bg-[#333333] transition-colors">
                IG
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#232323] flex items-center justify-center hover:text-white hover:bg-[#333333] transition-colors">
                FB
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#232323] flex items-center justify-center hover:text-white hover:bg-[#333333] transition-colors">
                X
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#232323] flex items-center justify-center hover:text-white hover:bg-[#333333] transition-colors">
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
              <li><a href="#" className="hover:text-white transition-colors">All Shoes & Sneakers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Apparel & Shirts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wrist Watches</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Spectacles & Eyewear</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Special Sale Items</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heebo text-[13px] font-bold text-white uppercase tracking-wider">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-[13px] text-[#A0A0A0]">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Authenticity Guarantee</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heebo text-[13px] font-bold text-white uppercase tracking-wider">
              COMPANY
            </h4>
            <ul className="space-y-2 text-[13px] text-[#A0A0A0]">
              <li><a href="#" className="hover:text-white transition-colors">About CURA</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers (Hiring)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press & Media</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy & Cookie</a></li>
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
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-[40px] bg-[#232323] border border-[#333333] rounded-[8px] pl-3 pr-8 text-[12px] text-white placeholder-[#676767] focus:outline-none focus:border-white"
              />
              <button className="absolute right-2 top-2.5 text-[#A0A0A0] hover:text-white">
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-[#232323] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#676767] font-mono">
          <div>
            &copy; 2026 CURA Inc. All Rights Reserved. Designed for excellence.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
