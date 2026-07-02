'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import {
  fadeLeft, fadeRight, staggerContainer, staggerItem, viewportOnce,
} from '@/lib/animations';

interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

interface TimelineProps {
  experience: Experience[];
  education: Education[];
}

function TimelineCard({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      variants={staggerItem}
      custom={index}
      className="relative group"
    >
      {children}
    </motion.div>
  );
}

export default function Timeline({ experience, education }: TimelineProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Experience Column */}
      <motion.div
        className="space-y-8"
        variants={fadeLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="p-3 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Briefcase className="w-6 h-6" />
          </motion.div>
          <h3 className="text-2xl font-bold text-base-content tracking-wide">Work Experience</h3>
        </div>

        <motion.div
          className="relative border-l border-base-content/10 pl-6 ml-4 space-y-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {experience.length === 0 ? (
            <p className="text-base-content/50 text-sm">No work experience listed yet.</p>
          ) : (
            experience.map((exp, i) => (
              <TimelineCard key={exp.id} index={i}>
                {/* Bullet node */}
                <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-base-100 border-2 border-brand-primary transition-all duration-300 group-hover:bg-brand-primary group-hover:scale-125 shadow-[0_0_10px_rgba(139,92,246,0.3)]"></span>

                {/* Content Box */}
                <motion.div
                  className="glass border-base-content/5 group-hover:border-base-content/10 hover:bg-base-200/20 p-6 rounded-2xl transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-lg font-bold text-base-content group-hover:text-brand-primary transition-colors duration-200">
                      {exp.role}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-base-300 text-base-content/85">
                      <Calendar className="w-3.5 h-3.5 text-base-content/60" />
                      {exp.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-base-content/70 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-base-content/50" />
                    <span>{exp.company}</span>
                  </div>

                  <p className="text-sm text-base-content/70 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </motion.div>
              </TimelineCard>
            ))
          )}
        </motion.div>
      </motion.div>

      {/* Education Column */}
      <motion.div
        className="space-y-8"
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="p-3 rounded-2xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <GraduationCap className="w-6 h-6" />
          </motion.div>
          <h3 className="text-2xl font-bold text-base-content tracking-wide">Education & Qualifications</h3>
        </div>

        <motion.div
          className="relative border-l border-base-content/10 pl-6 ml-4 space-y-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {education.length === 0 ? (
            <p className="text-base-content/50 text-sm">No education credentials listed yet.</p>
          ) : (
            education.map((edu, i) => (
              <TimelineCard key={edu.id} index={i}>
                {/* Bullet node */}
                <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-base-100 border-2 border-brand-secondary transition-all duration-300 group-hover:bg-brand-secondary group-hover:scale-125 shadow-[0_0_10px_rgba(6,182,212,0.3)]"></span>

                {/* Content Box */}
                <motion.div
                  className="glass border-base-content/5 group-hover:border-base-content/10 hover:bg-base-200/20 p-6 rounded-2xl transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-lg font-bold text-base-content group-hover:text-brand-secondary transition-colors duration-200">
                      {edu.degree}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-base-300 text-base-content/85">
                      <Calendar className="w-3.5 h-3.5 text-base-content/60" />
                      {edu.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-base-content/70 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-base-content/50" />
                    <span>{edu.institution}</span>
                  </div>

                  <p className="text-sm text-base-content/70 leading-relaxed whitespace-pre-line">
                    {edu.description}
                  </p>
                </motion.div>
              </TimelineCard>
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
