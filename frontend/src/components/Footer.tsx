'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { ArrowUp } from 'lucide-react';
import {
  staggerContainer, staggerItem, fadeUp, viewportOnce,
} from '@/lib/animations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formatted = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      className="border-t border-base-content/5 py-12 bg-base-200/40 transition-all duration-300"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <motion.div variants={fadeUp}>
          <div className="font-mono text-sm text-brand-primary uppercase tracking-widest mb-3 font-bold">
            Asif Shahriar Tauhid
          </div>
          <p className="text-sm text-base-content/70 max-w-md leading-relaxed">
            Designing & engineering web systems with absolute precision, performance, and responsive architecture.
          </p>
        </motion.div>

        {/* Technical metadata table */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-8 font-mono text-xs text-base-content/70"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {[
            { label: 'LOC //', value: 'DHAKA, BGD' },
            { label: 'TIME //', value: time ? `${time} (GMT+6)` : '—' },
            { label: 'STACK //', value: 'PERN' },
          ].map(({ label, value }) => (
            <motion.div key={label} variants={staggerItem}>
              <span className="text-brand-primary block mb-1 uppercase tracking-wider">{label}</span>
              <span className="text-base-content font-medium">{value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-base-content/5 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-base-content/60 gap-4">
        <span>© {currentYear} Asif Shahriar Tauhid. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <span className="uppercase tracking-widest text-brand-primary/80">DESIGNED & CODED BY TAUHID</span>
          <motion.button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-full bg-base-200 border border-base-content/10 text-base-content/75 hover:text-base-content hover:bg-base-300 hover:border-brand-primary/40 transition-colors duration-300 cursor-pointer"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
}
