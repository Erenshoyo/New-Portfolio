'use client';

import { motion } from 'framer-motion';
import { Cpu, Server, Wrench } from 'lucide-react';
import { staggerContainer, staggerItem, viewportOnce, fadeUp } from '@/lib/animations';
import { getSkillIcon } from '@/lib/skillIcons';

interface Skill {
  id: number;
  name: string;
  percentage: number;
  category: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

// Solid theme-matching bar colors (no gradient, avoiding background-blending secondary)
const BAR_COLOR: Record<string, string> = {
  Frontend: 'bg-brand-primary',
  Backend:  'bg-brand-accent',
  Tools:    'bg-brand-primary/50',
};

const CATEGORY_ICONS: Record<string, React.ReactElement> = {
  Frontend: <Cpu   className="w-5 h-5 text-brand-primary"   />,
  Backend:  <Server className="w-5 h-5 text-brand-secondary" />,
  Tools:    <Wrench className="w-5 h-5 text-brand-accent"    />,
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = {
    Frontend: skills.filter((s) => s.category.toLowerCase() === 'frontend'),
    Backend:  skills.filter((s) => s.category.toLowerCase() === 'backend'),
    Tools:    skills.filter((s) =>
      s.category.toLowerCase() === 'tools' || s.category.toLowerCase() === 'other'
    ),
  };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {(Object.keys(categories) as Array<keyof typeof categories>).map((catName) => {
        const catSkills = categories[catName];
        if (catSkills.length === 0) return null;

        const barColor = BAR_COLOR[catName] ?? 'bg-brand-primary';

        return (
          <motion.div
            key={catName}
            variants={fadeUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass border-base-content/5 rounded-3xl p-6 md:p-8 flex flex-col h-full hover:border-base-content/10 transition-colors duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-base-content/5">
              <motion.div
                className="p-2.5 rounded-xl bg-base-200 border border-base-content/10"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {CATEGORY_ICONS[catName]}
              </motion.div>
              <h3 className="text-lg font-bold text-base-content tracking-wide uppercase">{catName}</h3>
            </div>

            {/* Skills List */}
            <motion.div
              className={`space-y-5 flex-grow ${catSkills.length > 5 ? 'max-h-72 overflow-y-auto pr-2 minimal-scrollbar' : ''}`}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {catSkills.map((skill) => {
                const iconResult = getSkillIcon(skill.name);

                return (
                  <motion.div key={skill.id} variants={staggerItem} className="space-y-2">
                    {/* Skill name row with icon */}
                    <div className="flex justify-between items-center text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {iconResult ? (
                          <motion.span
                            className="text-lg leading-none"
                            title={skill.name}
                            whileHover={{ scale: 1.25, rotate: -8 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            {iconResult.icon}
                          </motion.span>
                        ) : (
                          <span className="w-[1.15rem] h-[1.15rem] rounded-sm bg-base-300 inline-block" />
                        )}
                        <span className="text-base-content/90">{skill.name}</span>
                      </div>
                      <span className="text-base-content/50 text-xs font-mono">{skill.percentage}%</span>
                    </div>

                    {/* Progress Bar — solid theme color, no gradient */}
                    <div className="h-1.5 w-full bg-base-300 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${barColor} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
