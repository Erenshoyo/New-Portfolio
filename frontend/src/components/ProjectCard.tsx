'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { staggerItem, viewportOnce } from '@/lib/animations';

interface Project {
  id: number;
  title: string;
  image_url: string;
  description: string;
  tech_stack: string[];
  live_link: string;
  github_link: string;
  challenges: string;
  future_plans: string;
}

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export default function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const displayImage = project.image_url || 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=800';

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="glass hover:border-brand-primary/40 rounded-2xl overflow-hidden transition-colors duration-300 group flex flex-col h-full shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
    >
      {/* Image section */}
      <div className="relative aspect-video w-full overflow-hidden bg-base-200">
        <motion.img
          src={displayImage}
          alt={project.title}
          className="object-cover w-full h-full"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.5 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-base-content mb-2 group-hover:text-brand-primary transition-colors duration-200">
          {project.title}
        </h3>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech_stack.slice(0, 4).map((tech, index) => (
            <motion.span
              key={index}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-base-300 text-base-content/60">
              +{project.tech_stack.length - 4} more
            </span>
          )}
        </div>

        {/* Description snippet */}
        <p className="text-sm text-base-content/70 mb-6 line-clamp-3 flex-grow leading-relaxed">
          {project.description}
        </p>

        {/* Action Button */}
        <div className="mt-auto">
          <motion.button
            onClick={() => onViewDetails(project)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-base-200 border border-base-content/10 hover:bg-brand-primary hover:border-transparent text-sm font-medium text-base-content hover:text-white transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            View More / Details
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
