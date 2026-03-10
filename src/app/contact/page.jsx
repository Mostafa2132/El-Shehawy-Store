"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiMessageSquare,
  FiClock,
  FiGlobe,
} from "react-icons/fi";

const CONTACT_INFO = [
  {
    icon: FiPhone,
    title: "Phone Support",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    desc: "We're available Mon-Fri, 9am-6pm EST.",
    color: "from-blue-500 to-cyan-500",
    bgIcon: "bg-blue-500/10 text-cyan-400",
  },
  {
    icon: FiMail,
    title: "Email Us",
    details: ["support@elshehawy.tech", "sales@elshehawy.tech"],
    desc: "Drop us a line anytime. We reply within 24 hours.",
    color: "from-purple-500 to-pink-500",
    bgIcon: "bg-purple-500/10 text-pink-400",
  },
  {
    icon: FiMapPin,
    title: "Global HQ",
    details: ["123 Tech Boulevard", "Silicon Valley, CA 94025"],
    desc: "Come say hello at our main headquarters.",
    color: "from-emerald-400 to-teal-500",
    bgIcon: "bg-emerald-500/10 text-teal-400",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully! We'll be in touch soon. 🚀", {
      theme: "dark",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-32 pb-24 selection:bg-purple-500/30 text-slate-200 overflow-hidden relative">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 mb-8 transform -rotate-12"
          >
            <FiMessageSquare className="w-10 h-10 text-white rotate-12" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Let's <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Connect</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Have a question, feedback, or need support? We're here to help. Reach out to us and our team will get back to you immediately.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Contact Information Cards (Left side) */}
          <div className="lg:col-span-5 space-y-6">
            {CONTACT_INFO.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="group p-8 rounded-3xl bg-slate-900/50 border border-purple-500/10 hover:border-purple-500/30 hover:bg-slate-800/50 transition-all duration-500 backdrop-blur-xl hover:shadow-2xl hover:shadow-purple-500/10 relative overflow-hidden"
              >
                {/* Hover gradient background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${info.color} transition-opacity duration-500`} />
                
                <div className="relative z-10 flex gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${info.bgIcon} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                    <div className="space-y-1 mb-3">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-300 font-medium">{detail}</p>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{info.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-12 h-12 rounded-full border-2 border-slate-950 bg-gradient-to-br ${i === 1 ? 'from-cyan-400 to-blue-500' : i === 2 ? 'from-purple-400 to-pink-500' : 'from-rose-400 to-orange-500'} flex items-center justify-center text-white font-bold text-sm z-${4-i}`}>
                    {['S', 'E', 'A'][i-1]}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-bold">24/7 Expert Team</p>
                <p className="text-sm text-gray-400">Ready to assist you.</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form (Right side) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-900 border border-purple-500/20 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
              
              <h2 className="text-2xl font-bold text-white mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider group-focus-within:text-cyan-400 transition-colors">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all hover:bg-slate-900 text-lg"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider group-focus-within:text-purple-400 transition-colors">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all hover:bg-slate-900 text-lg"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider group-focus-within:text-pink-400 transition-colors">
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all hover:bg-slate-900 text-lg"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider group-focus-within:text-rose-400 transition-colors">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us everything..."
                    rows={5}
                    className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all hover:bg-slate-900 resize-none text-lg"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 hover:from-purple-600 hover:via-pink-700 hover:to-rose-600 text-white font-black text-lg rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-pink-500/25 disabled:opacity-70 group relative overflow-hidden mt-6"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FiSend className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}
