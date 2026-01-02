import React from "react";
import toast from "react-hot-toast";

function ContactPage() {

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent successfully!");
        e.target.reset();
    }

  return (
    <div className="container mx-auto py-12 px-4">

      {/* Hero */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold">Contact Ease Of Doing Business</h1>
        <p className="mt-2 text-lg text-gray-600">
          We’re here to help you. Reach out for support, queries, or collaboration.
        </p>
      </section>

      {/* TOP SECTION: Contact Info + Map */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <p><strong>Email:</strong> info@easeofdoingbusiness.org</p>
          <p><strong>Phone:</strong> +91-XXXXXXXXXX</p>
          <p><strong>Address:</strong> Your Office Address Here</p>
          <p><strong>Working Hours:</strong> Mon – Fri, 10:00 AM – 5:30 PM</p>
        </div>

        {/* Map (Square Box) */}
        <div className="w-full h-64 md:h-72 rounded-lg overflow-hidden shadow">
          <iframe
            className="w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3267.2610125681595!2d77.20840437520192!3d28.553298975708117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2134f81ff19%3A0x6053802de1118894!2sCentre%20for%20Civil%20Society!5e1!3m2!1sen!2sin!4v1767329689941!5m2!1sen!2sin"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </section>

      {/* BOTTOM SECTION: Contact Form */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Get in Touch
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="w-full border p-2 rounded-md"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone (optional)</label>
            <input
              type="tel"
              className="w-full border p-2 rounded-md"
              placeholder="+91-"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Subject</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              placeholder="Subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              className="w-full border p-2 rounded-md"
              rows="4"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 hover:cursor-pointer transition"
          >
            Send Message
          </button>
        </form>
      </section>

    </div>
  );
}

export default ContactPage;
