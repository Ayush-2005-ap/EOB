import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Rankings", to: "/ranking" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Resources", to: "/resources" },
  { label: "Outreach", to: "/outreach" },
  { label: "Contact", to: "/contactUs" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F1E3C] text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1: Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="EODB Logo" className="h-10 w-auto" />
          </div>
          <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-3">
            An initiative of
          </p>
          <p className="text-sm font-bold text-white mb-3">
            Centre for Civil Society
          </p>
          <p className="text-white/50 text-sm leading-relaxed">
            Promoting regulatory reforms and improving India's business
            environment through research and advocacy.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E88C30] mb-5">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-white/55 hover:text-[#E88C30] text-sm transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E88C30] mb-5">
            Contact
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Mail size={14} className="text-[#E88C30] mt-0.5 shrink-0" />
              <span className="text-white/55 text-sm">
                info@easeofdoingbusiness.org
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={14} className="text-[#E88C30] mt-0.5 shrink-0" />
              <span className="text-white/55 text-sm">+91-11-2653-7456</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-[#E88C30] mt-0.5 shrink-0" />
              <span className="text-white/55 text-sm leading-snug">
                A-69 Hauz Khas,
                <br />
                New Delhi — 110016
              </span>
            </li>
          </ul>
        </div>

        {/* Column 4: About CCS + Legal */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E88C30] mb-5">
            About CCS
          </h4>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Centre for Civil Society is an independent, non-profit, public
            policy think tank based in New Delhi, advancing the case for a
            free and open society.
          </p>
          <a
            href="https://ccs.in"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-[#E88C30] hover:text-white transition-colors uppercase tracking-widest"
          >
            Visit ccs.in →
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-white/30 text-xs">
          <p>© {new Date().getFullYear()} Centre for Civil Society. All rights reserved.</p>
          <p>
            Working hours: Mon – Fri, 10:00 AM – 5:30 PM IST
          </p>
        </div>
      </div>
    </footer>
  );
}
