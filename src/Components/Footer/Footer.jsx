"use client";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiArrowRight,
  FiCheck,
  FiZap,
} from "react-icons/fi";
import Link from "next/link";
import NewsletterSection from "../NewsletterSection/NewsletterSection";

export default function Footer() {
  const footerSections = [
    {
      title: "Products",
      links: [
        { name: "Processors", href: "/products?category=cpu" },
        { name: "Graphics Cards", href: "/products?category=gpu" },
        { name: "Memory", href: "/products?category=ram" },
        { name: "Storage", href: "/products?category=storage" },
        { name: "Motherboards", href: "/products?category=motherboard" },
      ],
    },
    {
      title: "Peripherals",
      links: [
        { name: "Monitors", href: "/products?category=screen" },
        { name: "Keyboards", href: "/products?category=keyboard" },
        { name: "Mice", href: "/products?category=mouse" },
        { name: "Speakers", href: "/products?category=speakers" },
        { name: "Cases", href: "/products?category=case" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "FAQs", href: "/faqs" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns", href: "/returns" },
        { name: "Warranty", href: "/warranty" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-slate-950 text-gray-400 border-t border-purple-500/10">
      {/* Newsletter Section */}
      <NewsletterSection />
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300">
                <FiZap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">El-Shehawy</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your ultimate destination for premium electronics and computer
              hardware at competitive prices.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FiMapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>+20 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>support@elshop.com</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h4 className="text-white font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                    >
                      <FiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Payment Methods & Features */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 py-12 border-t border-b border-purple-500/10"
        >
          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-white font-bold mb-6">Why Choose Us</h4>
            <div className="space-y-3">
              {[
                "Fast Shipping Worldwide",
                "Secure Payment Options",
                "24/7 Customer Support",
                "Money Back Guarantee",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-400">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-white font-bold mb-6">Payment Methods</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Visa",
                "Mastercard",
                "PayPal",
                "Apple Pay",
                "Google Pay",
                "Bank Transfer",
              ].map((method) => (
                <div
                  key={method}
                  className="px-4 py-2 bg-slate-800/50 border border-purple-500/20 rounded-lg text-gray-400 text-sm flex items-center justify-center hover:border-cyan-500/40 transition-colors"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-12"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-slate-800/50 border border-purple-500/20 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                aria-label={social.label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-slate-900/50 border-t border-purple-500/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} El-Shehawy. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex justify-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>

            {/* Design Credit */}
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">
                Designed with Mostafa M.Ebrahem{" "}
                <span className="text-cyan-400">♥</span> for you
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
