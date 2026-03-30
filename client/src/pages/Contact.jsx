import React, { useState } from "react";
import toast from "react-hot-toast";

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
    <div className="container mx-auto py-20 px-6 max-w-6xl">

      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions about regulatory reforms or want to collaborate? 
          We're here to help you navigate the business ecosystem.
        </p>
      </section>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Contact Info + Map Sidebar */}
        <div className="lg:col-span-1 space-y-10">
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Details</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wider">Email</p>
                  <p className="text-gray-700">info@easeofdoingbusiness.org</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wider">Phone</p>
                  <p className="text-gray-700">+91-11-2653-7456</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wider">Address</p>
                  <p className="text-gray-700 leading-snug">Centre for Civil Society, <br />A-69 Hauz Khas, New Delhi</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wider">Working Hours</p>
                  <p className="text-gray-700">Mon – Fri, 10:00 AM – 5:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-72 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
            <iframe
              className="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3267.2610125681595!2d77.20840437520192!3d28.553298975708117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2134f81ff19%3A0x6053802de1118894!2sCentre%20for%20Civil%20Society!5e1!3m2!1sen!2sin!4v1767329689941!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form className="bg-white p-10 rounded-4xl shadow-2xl border border-gray-50 space-y-8" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#9A4020] transition outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#9A4020] transition outline-none"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Phone (optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#9A4020] transition outline-none"
                  placeholder="+91-0000000000"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#9A4020] transition outline-none"
                  placeholder="Inquiry about..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-gray-50 border-0 p-4 rounded-xl focus:ring-2 focus:ring-[#9A4020] transition outline-none min-h-[150px]"
                rows="5"
                placeholder="How can we help you?"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-[#9A4020] text-white py-4 px-12 rounded-xl font-bold hover:bg-[#80351A] hover:cursor-pointer transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default ContactPage;
