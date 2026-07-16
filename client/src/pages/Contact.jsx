import React, { useState } from "react";
import toast from "react-hot-toast";

// Crisp SVG Icons (World Bank style: filled solid, single-colour)
const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.24 2.46.69 3.58a1 1 0 0 1-.27 1.11l-2.2 2.2z"/>
  </svg>
);

const IconLocation = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
  
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
  
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5050/api";
      await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      toast.success("Message sent! Check your email 📩");
      e.target.reset();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Hero */}
        <section className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            
            <span className="text-[#0071BC] text-xs font-bold uppercase tracking-[0.18em]">
              Support &amp; Collaboration
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#002244] tracking-tight mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Get in Touch
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            Have questions about regulatory reforms or want to collaborate? 
            We're here to help you navigate the business ecosystem.
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-[#002244]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Contact Details
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#0071BC]/10 text-[#0071BC] flex items-center justify-center shrink-0">
                    <IconEmail />
                  </div>
                  <div>
                    <p className="font-bold text-[#002244] text-xs uppercase tracking-wider">Email</p>
                    <p className="text-gray-600 text-sm">info@easeofdoingbusiness.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#00538A]/10 text-[#00538A] flex items-center justify-center shrink-0">
                    <IconPhone />
                  </div>
                  <div>
                    <p className="font-bold text-[#002244] text-xs uppercase tracking-wider">Phone</p>
                    <p className="text-gray-600 text-sm">+91-11-2653-7456</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#002244]/10 text-[#002244] flex items-center justify-center shrink-0">
                    <IconLocation />
                  </div>
                  <div>
                    <p className="font-bold text-[#002244] text-xs uppercase tracking-wider">Address</p>
                    <p className="text-gray-600 text-sm leading-snug">Centre for Civil Society, <br />A-69 Hauz Khas, New Delhi</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#0071BC]/10 text-[#0071BC] flex items-center justify-center shrink-0">
                    <IconClock />
                  </div>
                  <div>
                    <p className="font-bold text-[#002244] text-xs uppercase tracking-wider">Working Hours</p>
                    <p className="text-gray-600 text-sm">Mon – Fri, 10:00 AM – 5:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white p-2">
              <iframe
                title="Google Map Location"
                className="w-full h-full border-0 rounded"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3267.2610125681595!2d77.20840437520192!3d28.553298975708117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2134f81ff19%3A0x6053802de1118894!2sCentre%20for%20Civil%20Society!5e1!3m2!1sen!2sin!4v1767329689941!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form className="bg-white p-8 md:p-10 rounded-lg border border-gray-200 shadow-sm space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#002244] uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 p-3.5 rounded focus:ring-2 focus:ring-[#0071BC] focus:border-transparent outline-none text-sm transition text-gray-700"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#002244] uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 p-3.5 rounded focus:ring-2 focus:ring-[#0071BC] focus:border-transparent outline-none text-sm transition text-gray-700"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#002244] uppercase tracking-wide">Phone (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 p-3.5 rounded focus:ring-2 focus:ring-[#0071BC] focus:border-transparent outline-none text-sm transition text-gray-700"
                    placeholder="+91-0000000000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#002244] uppercase tracking-wide">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 p-3.5 rounded focus:ring-2 focus:ring-[#0071BC] focus:border-transparent outline-none text-sm transition text-gray-700"
                    placeholder="Inquiry about..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#002244] uppercase tracking-wide">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 p-3.5 rounded focus:ring-2 focus:ring-[#0071BC] focus:border-transparent outline-none text-sm transition text-gray-700 min-h-[150px]"
                  rows="5"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-[#0071BC] hover:bg-[#C8793F] text-white py-3.5 px-10 rounded font-bold hover:cursor-pointer transition-all shadow-sm text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
