'use client';

import { X, ExternalLink, Github, Terminal, Milestone, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

interface ProjectDetailsModalProps {
  project: {
    id: number;
    title: string;
    image_url: string;
    description: string;
    tech_stack: string[];
    live_link: string;
    github_link: string;
    challenges: string;
    future_plans: string;
  } | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  const displayImage = project.image_url || 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=800';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div 
        className="glass border-base-content/10 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-base-content/5">
          <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
            <Terminal className="w-6 h-6 text-brand-secondary" />
            {project.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-base-200 text-base-content/60 hover:text-base-content transition-all duration-200 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 flex-grow">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side: Image & Links */}
            <div className="space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-base-200 border border-base-content/5 shadow-inner">
                <img
                  src={displayImage}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Action Links */}
              <div className="flex gap-4">
                {project.live_link && (
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-sm font-semibold text-white transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Project
                  </a>
                )}
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-base-200 border border-base-content/10 hover:bg-base-300 text-sm font-semibold text-base-content hover:text-base-content transition-all duration-300 cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    GitHub Repo
                  </a>
                )}
              </div>
            </div>

            {/* Right side: Summary & Tech Stack */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-2">Project Overview</h3>
                <p className="text-base-content/85 text-sm leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            </div>
          </div>

          <hr className="border-base-content/5" />

          {/* Deep dive sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Challenges faced */}
            <div className="space-y-3 bg-red-500/5 border border-red-500/10 p-5 rounded-2xl">
              <h4 className="text-md font-bold text-red-450 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Challenges Faced
              </h4>
              <p className="text-base-content/80 text-sm leading-relaxed whitespace-pre-line">
                {project.challenges || 'No challenges specified yet.'}
              </p>
            </div>

            {/* Future Plans */}
            <div className="space-y-3 bg-brand-secondary/5 border border-brand-secondary/10 p-5 rounded-2xl">
              <h4 className="text-md font-bold text-brand-secondary flex items-center gap-2">
                <Milestone className="w-5 h-5" />
                Future Plans & Improvements
              </h4>
              <p className="text-base-content/80 text-sm leading-relaxed whitespace-pre-line">
                {project.future_plans || 'No future plans specified yet.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
