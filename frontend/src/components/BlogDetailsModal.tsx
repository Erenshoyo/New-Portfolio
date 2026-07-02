'use client';

import { X, Calendar, BookOpen } from 'lucide-react';
import { useEffect } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

interface BlogDetailsModalProps {
  blog: {
    id: number;
    title: string;
    content: string;
    created_at: string;
  } | null;
  onClose: () => void;
}

export default function BlogDetailsModal({ blog, onClose }: BlogDetailsModalProps) {
  useEffect(() => {
    if (blog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [blog]);

  if (!blog) return null;

  const formattedDate = new Date(blog.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div 
        className="glass border-base-content/10 w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-base-content/5">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-brand-secondary" />
            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-widest">Technical Blog</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-base-200 text-base-content/60 hover:text-base-content transition-all duration-200 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6 flex-grow">
          {/* Metadata */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-brand-secondary text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Published on {formattedDate}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content leading-tight">
              {blog.title}
            </h1>
          </div>

          <hr className="border-base-content/5" />

          {/* Full Markdown Rendered Content */}
          <div className="pb-6 text-base-content/95">
            <MarkdownRenderer content={blog.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
