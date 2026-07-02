'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Facebook, FileText, ArrowRight, BookOpen, Mail, Sparkles, Calendar, Clock } from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem, scalePop, lineExpand, viewportOnce } from '@/lib/animations';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';
import BlogDetailsModal from '@/components/BlogDetailsModal';
import SkillsSection from '@/components/SkillsSection';
import Timeline from '@/components/Timeline';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const emptyProfile = {
  id: 1,
  name: '',
  designation: '',
  photo_url: '',
  resume_url: '',
  email: '',
  phone: '',
  whatsapp: '',
  about_me: '',
  social_links: {} as Record<string, string | undefined>,
  hobbies: [] as string[]
};

const getTagsFromContent = (content: string) => {
  const hashTags = content.match(/#\w+/g);
  if (hashTags && hashTags.length > 0) {
    return hashTags.map(tag => tag.replace('#', '').toUpperCase());
  }
  const keywords = ['react', 'node', 'javascript', 'typescript', 'css', 'html', 'python', 'database', 'docker', 'nextjs'];
  const lowerContent = content.toLowerCase();
  const found = keywords.filter(kw => lowerContent.includes(kw)).map(kw => kw.toUpperCase());
  if (found.length > 0) return found.slice(0, 3);
  return ['TECH', 'LOG'];
};

const calculateReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 225));
  return `${minutes} MIN READ`;
};

export default function Home() {
  const [profile, setProfile] = useState(emptyProfile);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    setMousePosition({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  // Hidden Dashboard route hash monitor
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#/dashboard') {
        window.location.href = '/dashboard';
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Fetch portfolio data from Express server API
  useEffect(() => {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api`;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [profRes, projRes, skillsRes, expRes, eduRes, blogRes] = await Promise.all([
          fetch(`${API_URL}/profile`),
          fetch(`${API_URL}/projects`),
          fetch(`${API_URL}/skills`),
          fetch(`${API_URL}/experience`),
          fetch(`${API_URL}/education`),
          fetch(`${API_URL}/blogs`)
        ]);

        if (profRes.ok) setProfile(await profRes.json());
        if (projRes.ok) setProjects(await projRes.json());
        if (skillsRes.ok) setSkills(await skillsRes.json());
        if (expRes.ok) setExperience(await expRes.json());
        if (eduRes.ok) setEducation(await eduRes.json());
        if (blogRes.ok) setBlogs(await blogRes.json());
      } catch (e) {
        console.error('Error fetching backend data:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center relative overflow-hidden text-base-content">
        {/* Background glow */}
        <div className="absolute w-[300px] h-[300px] bg-brand-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-brand-primary/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-brand-primary animate-spin"></div>
            <Sparkles className="w-6 h-6 text-brand-primary animate-pulse" />
          </div>
          <span className="text-sm font-semibold tracking-widest text-base-content/60 uppercase animate-pulse">
            Loading Portfolio...
          </span>
        </div>
      </div>
    );
  }

  // Social Links Helper
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      default:
        return <Facebook className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-brand-primary/30 selection:text-white">
      {/* Background Glowing Drifting Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-brand-primary/10 blur-[100px] -z-10 animate-glow-drift"></div>
      <div className="absolute top-2/3 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-secondary/10 blur-[120px] -z-10 animate-glow-drift-slow"></div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 group overflow-hidden"
      >
        <div className="absolute inset-0 technical-grid pointer-events-none"></div>
        <div className="absolute inset-0 grain-overlay pointer-events-none"></div>
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(195, 203, 154, 0.08), transparent 45%)`,
          }}
        ></div>

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Hero Content */}
          <motion.div
            className="space-y-6 text-left order-2 md:order-1"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={scalePop} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-semibold text-brand-primary">
              <Sparkles className="w-3.5 h-3.5" />
              Available for work
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Hi, I am <span className="text-brand-primary">{profile.name}</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl sm:text-2xl font-bold text-base-content/85">
              {profile.designation}
            </motion.p>
            
            <motion.p variants={fadeUp} className="text-base-content/65 text-base max-w-lg leading-relaxed">
              I construct robust architectural backends and client-focused, immersive frontend designs. Let us build something extraordinary.
            </motion.p>

            {/* Resume Button */}
            <motion.div variants={fadeUp} className="pt-2 flex flex-wrap gap-4 items-center">
              <motion.a
                href={profile.resume_url || '#'}
                target={profile.resume_url ? '_blank' : undefined}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-sm font-semibold text-white transition-all duration-300 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  if (!profile.resume_url) {
                    e.preventDefault();
                    alert('Resume is not ready yet! You can upload it from the admin dashboard.');
                  }
                }}
              >
                <FileText className="w-4 h-4" />
                View & Download Resume
              </motion.a>

              {/* Social Icons */}
              <div className="flex gap-2">
                {Object.entries(profile.social_links).map(([platform, url]) => {
                  if (!url) return null;
                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-base-200 border border-base-content/10 text-base-content/60 hover:text-base-content hover:border-brand-primary/40 hover:bg-base-300 transition-all duration-300"
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.93 }}
                    >
                      {getSocialIcon(platform)}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Photo */}
          <motion.div
            className="order-1 md:order-2 flex justify-center"
            variants={fadeRight}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {/* Outer decorative primary border */}
              <div className="absolute inset-0.5 bg-brand-primary rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-3xl overflow-hidden bg-base-200 border-2 border-base-content/10 flex items-center justify-center">
                <img
                  src={profile.photo_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'}
                  alt={profile.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400';
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-base-content/5 bg-base-200/30">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div className="text-center space-y-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">About Me</h2>
            <motion.div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" variants={lineExpand} initial="hidden" whileInView="visible" viewport={viewportOnce} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            <motion.div className="md:col-span-3 glass p-6 md:p-8 rounded-3xl space-y-4" variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h3 className="text-xl font-bold text-base-content">My Programming Journey</h3>
              <p className="text-base-content/70 text-sm leading-relaxed whitespace-pre-line">
                {profile.about_me}
              </p>
            </motion.div>

            <motion.div className="md:col-span-2 space-y-6" variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <div className="glass p-6 md:p-8 rounded-3xl space-y-4">
                <h3 className="text-xl font-bold text-base-content">Hobbies & Interests</h3>
                <motion.div className="flex flex-wrap gap-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                  {profile.hobbies && profile.hobbies.map((hobby, idx) => (
                    <motion.span
                      key={idx}
                      variants={scalePop}
                      whileHover={{ scale: 1.08 }}
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-base-200 border border-base-content/10 text-base-content/80"
                    >
                      {hobby}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-base-content/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div className="text-center space-y-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">My Skillset</h2>
            <p className="text-base-content/60 text-sm">Visualizing my technological competence across different sectors.</p>
            <motion.div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" variants={lineExpand} initial="hidden" whileInView="visible" viewport={viewportOnce} />
          </motion.div>

          <SkillsSection skills={skills} />
        </div>
      </section>

      {/* Experience & Education Section */}
      <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-base-content/5 bg-base-200/30">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div className="text-center space-y-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">Journey & Milestones</h2>
            <motion.div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" variants={lineExpand} initial="hidden" whileInView="visible" viewport={viewportOnce} />
          </motion.div>

          <Timeline experience={experience} education={education} />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-base-content/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div className="text-center space-y-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">Featured Projects</h2>
            <p className="text-base-content/60 text-sm">A small selection of my recent developments.</p>
            <motion.div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" variants={lineExpand} initial="hidden" whileInView="visible" viewport={viewportOnce} />
          </motion.div>

          {projects.length === 0 ? (
            <p className="text-center text-base-content/50 py-10">No projects added yet.</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={setSelectedProject}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section id="blogs" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-base-content/5 bg-base-200/30">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div className="text-center space-y-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-primary font-bold block">
              KNOWLEDGE_BASE // WRITINGS
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">Technical Log Archives</h2>
            <p className="text-base-content/60 text-sm">Sharing my thoughts and insights on software engineering.</p>
            <motion.div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" variants={lineExpand} initial="hidden" whileInView="visible" viewport={viewportOnce} />
          </motion.div>

          {blogs.length === 0 ? (
            <p className="text-center text-base-content/50 py-10">No blog posts published yet.</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {blogs.map((blog) => {
                const tags = getTagsFromContent(blog.content);
                const readTime = calculateReadTime(blog.content);
                return (
                  <motion.article
                    key={blog.id}
                    variants={staggerItem}
                    whileHover={{ y: -6, transition: { duration: 0.22 } }}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedBlog(blog);
                    }}
                    className="group cursor-pointer border border-base-content/10 rounded-2xl p-6 bg-base-200/20 hover:bg-base-200/50 transition-all duration-300 relative flex flex-col justify-between h-full shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] overflow-hidden"
                  >
                    {/* Decorative Corner Accents */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-base-content/20 group-hover:border-brand-primary transition-colors"></div>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-base-content/20 group-hover:border-brand-primary transition-colors"></div>
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-base-content/20 group-hover:border-brand-primary transition-colors"></div>
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-base-content/20 group-hover:border-brand-primary transition-colors"></div>

                    <div className="space-y-4">
                      {/* Meta details */}
                      <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-base-content/50 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-brand-primary" />
                          {new Date(blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} className="text-brand-primary" />
                          {readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-base-content group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-base-content/70 line-clamp-3 leading-relaxed mb-4">
                        {blog.content.replace(/#\w+/g, '').trim()}
                      </p>
                    </div>

                    {/* Tags & Action Row */}
                    <div className="flex items-center justify-between border-t border-base-content/5 pt-4 mt-6">
                      <div className="flex flex-wrap gap-1.5">
                        {tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-base-300/50 border border-base-content/5 rounded text-[9px] font-mono text-base-content/70 uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-brand-primary flex items-center gap-1 group-hover:underline">
                        LOG_READ <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-base-content/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div className="text-center space-y-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">Get In Touch</h2>
            <p className="text-base-content/60 text-sm">Let us coordinate and collaborate on your next project.</p>
            <motion.div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" variants={lineExpand} initial="hidden" whileInView="visible" viewport={viewportOnce} />
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <ContactForm email={profile.email} phone={profile.phone} whatsapp={profile.whatsapp} />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Blog Details Modal */}
      <BlogDetailsModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />
    </div>
  );
}
