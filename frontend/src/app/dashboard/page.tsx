"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Cpu,
  Code,
  BookOpen,
  User,
  Plus,
  Trash2,
  Edit2,
  LogOut,
  Save,
  Globe,
  AlertCircle,
  Info,
} from "lucide-react";
import { getSkillIcon } from "@/lib/skillIcons";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://new-portfolio-oqtj.onrender.com"}/api`;

export default function Dashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "profile" | "projects" | "skills" | "experience" | "education" | "blogs"
  >("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Statuses
  const [isMockDb, setIsMockDb] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Data States
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [educations, setEducations] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  // Modals for Create/Update
  const [currentEditItem, setCurrentEditItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: "",
    image_url: "",
    description: "",
    tech_stack: "",
    live_link: "",
    github_link: "",
    challenges: "",
    future_plans: "",
  });
  const [skillForm, setSkillForm] = useState({
    name: "",
    percentage: 80,
    category: "Frontend",
  });
  const [experienceForm, setExperienceForm] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
  });
  const [educationForm, setEducationForm] = useState({
    degree: "",
    institution: "",
    duration: "",
    description: "",
  });
  const [blogForm, setBlogForm] = useState({
    title: "",
    image_url: "",
    content: "",
  });

  // Load token and load data
  useEffect(() => {
    const savedToken = localStorage.getItem("dashboard_token");
    if (savedToken) {
      verifyToken(savedToken);
    }
  }, []);

  const verifyToken = async (authToken: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        setToken(authToken);
        fetchDashboardData(authToken);
      } else {
        localStorage.removeItem("dashboard_token");
      }
    } catch (e) {
      console.error("Verify failed, fallback load");
      setToken(authToken); // allow offline dev
      fetchDashboardData(authToken);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("dashboard_token", data.token);
        setToken(data.token);
        fetchDashboardData(data.token);
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch (e) {
      // Offline fallback login for easy testing
      if (password === "admin123") {
        const dummyToken = "dummy-dev-jwt-token";
        localStorage.setItem("dashboard_token", dummyToken);
        setToken(dummyToken);
        fetchDashboardData(dummyToken);
        setIsMockDb(true);
      } else {
        setLoginError(
          "Could not reach API server. Default password for fallback is admin123",
        );
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dashboard_token");
    setToken(null);
  };

  const fetchDashboardData = async (authToken: string) => {
    const headers = { Authorization: `Bearer ${authToken}` };
    try {
      // Check if DB is using mock
      const profileRes = await fetch(`${API_URL}/profile`, { headers });
      if (profileRes.ok) {
        const p = await profileRes.json();
        setProfile(p);
      }

      const projectsRes = await fetch(`${API_URL}/projects`, { headers });
      if (projectsRes.ok) setProjects(await projectsRes.json());

      const skillsRes = await fetch(`${API_URL}/skills`, { headers });
      if (skillsRes.ok) setSkills(await skillsRes.json());

      const expRes = await fetch(`${API_URL}/experience`, { headers });
      if (expRes.ok) setExperiences(await expRes.json());

      const eduRes = await fetch(`${API_URL}/education`, { headers });
      if (eduRes.ok) setEducations(await eduRes.json());

      const blogRes = await fetch(`${API_URL}/blogs`, { headers });
      if (blogRes.ok) setBlogs(await blogRes.json());
    } catch (e) {
      console.warn(
        "Dashboard data fetch failed, using frontend local fallbacks",
      );
      setIsMockDb(true);
    }
  };

  // Profile Save
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaveStatus("Saving Profile...");
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        showStatus("Profile saved successfully!");
      } else {
        showStatus("Failed to save profile on server.");
      }
    } catch (e) {
      showStatus("Offline mock save: Profile updated locally.");
    }
  };

  const showStatus = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // CRUD handlers
  const handleCreateOrUpdate = async (
    type: string,
    route: string,
    body: any,
    setList: any,
  ) => {
    setSaveStatus("Processing...");
    const isEdit = !!currentEditItem;
    const url = isEdit
      ? `${API_URL}/${route}/${currentEditItem.id}`
      : `${API_URL}/${route}`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        showStatus(`${type} ${isEdit ? "updated" : "created"} successfully!`);
        fetchDashboardData(token!);
        closeFormModal();
      } else {
        showStatus("Server returned an error.");
      }
    } catch (e) {
      // Fallback local operations
      showStatus(
        `Mock Mode: ${type} simulated ${isEdit ? "update" : "creation"}.`,
      );
      if (isEdit) {
        setList((prev: any[]) =>
          prev.map((item) =>
            item.id === currentEditItem.id ? { ...item, ...body } : item,
          ),
        );
      } else {
        const newId = Math.floor(Math.random() * 10000);
        setList((prev: any[]) => [...prev, { id: newId, ...body }]);
      }
      closeFormModal();
    }
  };

  const handleDelete = async (
    type: string,
    route: string,
    id: number,
    setList: any,
  ) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    setSaveStatus("Deleting...");
    try {
      const res = await fetch(`${API_URL}/${route}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showStatus(`${type} deleted successfully.`);
        fetchDashboardData(token!);
      } else {
        showStatus("Failed to delete on server.");
      }
    } catch (e) {
      showStatus(`Mock Mode: Deleted locally.`);
      setList((prev: any[]) => prev.filter((item: any) => item.id !== id));
    }
  };

  const openFormModal = (item: any = null) => {
    setCurrentEditItem(item);
    setIsAdding(true);
    if (activeTab === "projects") {
      setProjectForm(
        item
          ? {
              title: item.title,
              image_url: item.image_url || "",
              description: item.description,
              tech_stack: Array.isArray(item.tech_stack)
                ? item.tech_stack.join(", ")
                : item.tech_stack,
              live_link: item.live_link || "",
              github_link: item.github_link || "",
              challenges: item.challenges || "",
              future_plans: item.future_plans || "",
            }
          : {
              title: "",
              image_url: "",
              description: "",
              tech_stack: "",
              live_link: "",
              github_link: "",
              challenges: "",
              future_plans: "",
            },
      );
    } else if (activeTab === "skills") {
      setSkillForm(
        item
          ? {
              name: item.name,
              percentage: item.percentage,
              category: item.category,
            }
          : { name: "", percentage: 80, category: "Frontend" },
      );
    } else if (activeTab === "experience") {
      setExperienceForm(
        item
          ? {
              role: item.role,
              company: item.company,
              duration: item.duration,
              description: item.description,
            }
          : { role: "", company: "", duration: "", description: "" },
      );
    } else if (activeTab === "education") {
      setEducationForm(
        item
          ? {
              degree: item.degree,
              institution: item.institution,
              duration: item.duration,
              description: item.description,
            }
          : { degree: "", institution: "", duration: "", description: "" },
      );
    } else if (activeTab === "blogs") {
      setBlogForm(
        item
          ? {
              title: item.title,
              image_url: item.image_url || "",
              content: item.content,
            }
          : { title: "", image_url: "", content: "" },
      );
    }
  };

  const closeFormModal = () => {
    setIsAdding(false);
    setCurrentEditItem(null);
  };

  // Submit functions
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stack = projectForm.tech_stack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    handleCreateOrUpdate(
      "Project",
      "projects",
      { ...projectForm, tech_stack: stack },
      setProjects,
    );
  };

  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateOrUpdate("Skill", "skills", skillForm, setSkills);
  };

  const handleExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateOrUpdate(
      "Experience",
      "experience",
      experienceForm,
      setExperiences,
    );
  };

  const handleEducationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateOrUpdate(
      "Education",
      "education",
      educationForm,
      setEducations,
    );
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateOrUpdate("Blog", "blogs", blogForm, setBlogs);
  };

  // Password Login Overlay Page
  if (!token) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4">
        {/* Glow */}
        <div className="absolute w-[300px] h-[300px] bg-brand-primary/10 rounded-full blur-[80px] -z-10"></div>

        <div className="w-full max-w-md glass border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col items-center space-y-4 mb-8 text-center">
            <div className="p-4 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Admin Authentication
            </h1>
            <p className="text-zinc-500 text-sm">
              Please log in to manage your portfolio information.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="dashboard-pw"
                className="text-xs font-semibold text-zinc-400 uppercase"
              >
                Dashboard Password
              </label>
              <input
                id="dashboard-pw"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-primary transition-colors text-sm"
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-sm font-semibold text-white transition-all duration-300"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] flex flex-col md:flex-row">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#07070b]">
        <h2 className="text-sm font-bold tracking-wider text-brand-primary">ADMIN</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {sidebarOpen ? (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block fixed md:relative inset-y-0 left-0 z-40 w-64 border-r border-white/5 bg-[#07070b] flex flex-col justify-between md:top-0 top-16 h-screen md:h-auto`}>
        <div className="p-6">
          <h2 className="hidden md:block text-lg font-bold tracking-wider text-brand-primary mb-8">
            ADMIN PANEL
          </h2>

          <nav className="space-y-1">
            {[
              { id: "profile", label: "Basic Profile", icon: User },
              { id: "projects", label: "Projects", icon: Code },
              { id: "skills", label: "Skills", icon: Cpu },
              { id: "experience", label: "Experience", icon: Briefcase },
              { id: "education", label: "Education", icon: GraduationCap },
              { id: "blogs", label: "Blogs", icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-brand-primary/10 text-brand-primary border-l-2 border-brand-primary"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto w-full md:max-h-screen">
        {/* Top bar info */}
        <header className="px-4 md:px-8 py-4 md:py-5 border-b border-white/5 bg-[#050508] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-brand-secondary flex-shrink-0" />
            <h1 className="text-base md:text-lg font-bold text-white uppercase tracking-wider truncate">
              {activeTab} Manager
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {isMockDb && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs whitespace-nowrap">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Offline Mock Mode</span>
                <span className="sm:hidden">Mock</span>
              </div>
            )}
            <a
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-all duration-200 whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">View Site</span>
              <span className="sm:hidden">Site</span>
            </a>
          </div>
        </header>

        {/* Dynamic Save Status Toast Banner */}
        {saveStatus && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-brand-primary text-white text-sm font-medium shadow-[0_4px_20px_rgba(139,92,246,0.4)] animate-slide-up flex items-center gap-2">
            <span>{saveStatus}</span>
          </div>
        )}

        <div className="p-4 md:p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* TAB 1: Profile Manager */}
          {activeTab === "profile" && profile && (
            <form
              onSubmit={handleProfileSave}
              className="glass border-white/5 rounded-3xl p-4 md:p-8 space-y-6 shadow-md"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="prof-name"
                    className="text-xs font-semibold text-zinc-400 uppercase"
                  >
                    Your Name
                  </label>
                  <input
                    id="prof-name"
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="prof-desig"
                    className="text-xs font-semibold text-zinc-400 uppercase"
                  >
                    Designation
                  </label>
                  <input
                    id="prof-desig"
                    type="text"
                    required
                    value={profile.designation}
                    onChange={(e) =>
                      setProfile({ ...profile, designation: e.target.value })
                    }
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="prof-pic"
                    className="text-xs font-semibold text-zinc-400 uppercase"
                  >
                    Photo URL
                  </label>
                  <input
                    id="prof-pic"
                    type="text"
                    value={profile.photo_url}
                    onChange={(e) =>
                      setProfile({ ...profile, photo_url: e.target.value })
                    }
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="prof-resume"
                    className="text-xs font-semibold text-zinc-400 uppercase"
                  >
                    Resume URL
                  </label>
                  <input
                    id="prof-resume"
                    type="text"
                    value={profile.resume_url}
                    onChange={(e) =>
                      setProfile({ ...profile, resume_url: e.target.value })
                    }
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="prof-email"
                    className="text-xs font-semibold text-zinc-400 uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    id="prof-email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="prof-phone"
                    className="text-xs font-semibold text-zinc-400 uppercase"
                  >
                    Phone Number
                  </label>
                  <input
                    id="prof-phone"
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="prof-wa"
                    className="text-xs font-semibold text-zinc-400 uppercase"
                  >
                    WhatsApp Number (Optional)
                  </label>
                  <input
                    id="prof-wa"
                    type="text"
                    value={profile.whatsapp}
                    onChange={(e) =>
                      setProfile({ ...profile, whatsapp: e.target.value })
                    }
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="prof-hobbies"
                    className="text-xs font-semibold text-zinc-400 uppercase"
                  >
                    Hobbies (comma separated)
                  </label>
                  <input
                    id="prof-hobbies"
                    type="text"
                    value={
                      Array.isArray(profile.hobbies)
                        ? profile.hobbies.join(", ")
                        : profile.hobbies
                    }
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        hobbies: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Social Links Sub-Grid */}
              <div className="p-4 md:p-5 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white">
                  Social Media Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {["github", "linkedin", "twitter", "facebook"].map((plat) => (
                    <div key={plat} className="space-y-2">
                      <label
                        htmlFor={`soc-${plat}`}
                        className="text-xs font-semibold text-zinc-400 uppercase"
                      >
                        {plat}
                      </label>
                      <input
                        id={`soc-${plat}`}
                        type="text"
                        value={profile.social_links[plat] || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            social_links: {
                              ...profile.social_links,
                              [plat]: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-[#09090b] border border-white/10 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="prof-journey"
                  className="text-xs font-semibold text-zinc-400 uppercase"
                >
                  About Me / Journey
                </label>
                <textarea
                  id="prof-journey"
                  rows={4}
                  value={profile.about_me}
                  onChange={(e) =>
                    setProfile({ ...profile, about_me: e.target.value })
                  }
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2 px-4 md:px-6 py-3 md:py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-sm font-semibold text-white transition-all duration-200"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save Profile Configuration</span>
                <span className="sm:hidden">Save</span>
              </button>
            </form>
          )}

          {/* TAB 2: Projects CRUD */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3 className="text-lg font-bold text-white">Project List</h3>
                <button
                  onClick={() => openFormModal()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-sm font-semibold text-white hover:bg-brand-primary/95 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>

              {/* List grid */}
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="glass p-3 md:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-white/5"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 overflow-hidden min-w-0">
                      <div className="w-12 h-8 sm:w-16 sm:h-10 rounded-lg overflow-hidden bg-zinc-950 flex-shrink-0">
                        <img
                          src={
                            project.image_url ||
                            "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=150"
                          }
                          alt={project.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-white truncate text-sm sm:text-base">
                          {project.title}
                        </h4>
                        <p className="text-xs text-zinc-500 truncate max-w-xs">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 justify-end w-full sm:w-auto">
                      <button
                        onClick={() => openFormModal(project)}
                        className="p-2.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(
                            "Project",
                            "projects",
                            project.id,
                            setProjects,
                          )
                        }
                        className="p-2.5 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Skills CRUD */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3 className="text-lg font-bold text-white">Skills Matrix</h3>
                <button
                  onClick={() => openFormModal()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-sm font-semibold text-white hover:bg-brand-primary/95 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Skill
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {skills.map((skill) => {
                  const iconResult = getSkillIcon(skill.name);
                  return (
                    <div
                      key={skill.id}
                      className="glass p-3 md:p-5 rounded-2xl flex items-center justify-between border-white/5"
                    >
                      <div className="flex items-center gap-2 md:gap-3 min-w-0 overflow-hidden">
                        {iconResult ? (
                          <span className="text-xl md:text-2xl leading-none flex-shrink-0">
                            {iconResult.icon}
                          </span>
                        ) : (
                          <span className="w-5 md:w-6 h-5 md:h-6 rounded bg-white/10 inline-block flex-shrink-0" />
                        )}
                        <div className="min-w-0 overflow-hidden">
                          <h4 className="font-bold text-white truncate text-sm md:text-base">{skill.name}</h4>
                          <p className="text-xs text-zinc-400">
                            {skill.category} — {skill.percentage}%
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 md:gap-2 flex-shrink-0">
                        <button
                          onClick={() => openFormModal(skill)}
                          className="p-1.5 md:p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                        >
                          <Edit2 className="w-3.5 md:w-4 h-3.5 md:h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete("Skill", "skills", skill.id, setSkills)
                          }
                          className="p-1.5 md:p-2 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all"
                        >
                          <Trash2 className="w-3.5 md:w-4 h-3.5 md:h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Experience CRUD */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3 className="text-lg font-bold text-white">
                  Experiences Timeline
                </h3>
                <button
                  onClick={() => openFormModal()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-sm font-semibold text-white hover:bg-brand-primary/95 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Work
                </button>
              </div>

              <div className="space-y-3 md:space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="glass p-3 md:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-white/5"
                  >
                    <div className="min-w-0 overflow-hidden">
                      <h4 className="font-bold text-white text-sm sm:text-base">{exp.role}</h4>
                      <p className="text-xs text-zinc-400">
                        {exp.company} | {exp.duration}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 justify-end w-full sm:w-auto">
                      <button
                        onClick={() => openFormModal(exp)}
                        className="p-1.5 md:p-2.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                      >
                        <Edit2 className="w-3.5 md:w-4 h-3.5 md:h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(
                            "Experience",
                            "experience",
                            exp.id,
                            setExperiences,
                          )
                        }
                        className="p-1.5 md:p-2.5 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all"
                      >
                        <Trash2 className="w-3.5 md:w-4 h-3.5 md:h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Education CRUD */}
          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3 className="text-lg font-bold text-white">
                  Education History
                </h3>
                <button
                  onClick={() => openFormModal()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-sm font-semibold text-white hover:bg-brand-primary/95 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Degree
                </button>
              </div>

              <div className="space-y-3 md:space-y-4">
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="glass p-3 md:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-white/5"
                  >
                    <div className="min-w-0 overflow-hidden">
                      <h4 className="font-bold text-white text-sm sm:text-base">{edu.degree}</h4>
                      <p className="text-xs text-zinc-400">
                        {edu.institution} | {edu.duration}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 justify-end w-full sm:w-auto">
                      <button
                        onClick={() => openFormModal(edu)}
                        className="p-1.5 md:p-2.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                      >
                        <Edit2 className="w-3.5 md:w-4 h-3.5 md:h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(
                            "Education",
                            "education",
                            edu.id,
                            setEducations,
                          )
                        }
                        className="p-1.5 md:p-2.5 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all"
                      >
                        <Trash2 className="w-3.5 md:w-4 h-3.5 md:h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Blogs CRUD */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3 className="text-lg font-bold text-white">
                  Published Blogs
                </h3>
                <button
                  onClick={() => openFormModal()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-sm font-semibold text-white hover:bg-brand-primary/95 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Post
                </button>
              </div>

              <div className="space-y-3 md:space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="glass p-3 md:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-white/5"
                  >
                    <div className="min-w-0 overflow-hidden">
                      <h4 className="font-bold text-white text-sm sm:text-base">{blog.title}</h4>
                      <p className="text-xs text-zinc-500 truncate">
                        {blog.content}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 justify-end w-full sm:w-auto">
                      <button
                        onClick={() => openFormModal(blog)}
                        className="p-1.5 md:p-2.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                      >
                        <Edit2 className="w-3.5 md:w-4 h-3.5 md:h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete("Blog", "blogs", blog.id, setBlogs)
                        }
                        className="p-1.5 md:p-2.5 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all"
                      >
                        <Trash2 className="w-3.5 md:w-4 h-3.5 md:h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CREATE / EDIT DYNAMIC MODAL GATES */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-3 md:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass border-white/10 w-full md:max-w-xl max-h-[95vh] md:max-h-[85vh] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-slide-up">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#050508] z-10">
              <h3 className="text-base md:text-lg font-bold text-white truncate">
                {currentEditItem ? "Edit" : "Add New"} {activeTab.slice(0, -1)}
              </h3>
              <button
                onClick={closeFormModal}
                className="text-zinc-500 hover:text-white transition-all flex-shrink-0 ml-4"
              >
                ✕
              </button>
            </div>

            <div className="p-4 md:p-6 overflow-y-auto space-y-4 flex-grow">
              {/* Form Render based on ActiveTab */}
              {activeTab === "projects" && (
                <form onSubmit={handleProjectSubmit} className="space-y-3 md:space-y-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="proj-title"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Project Name
                    </label>
                    <input
                      id="proj-title"
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="proj-img"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Image URL
                    </label>
                    <input
                      id="proj-img"
                      type="text"
                      value={projectForm.image_url}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          image_url: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="proj-stack"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Tech Stack (comma separated)
                    </label>
                    <input
                      id="proj-stack"
                      type="text"
                      required
                      placeholder="React, Express, PostgreSQL"
                      value={projectForm.tech_stack}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          tech_stack: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1">
                      <label
                        htmlFor="proj-live"
                        className="text-xs font-semibold text-zinc-400 uppercase"
                      >
                        Live Link
                      </label>
                      <input
                        id="proj-live"
                        type="text"
                        value={projectForm.live_link}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            live_link: e.target.value,
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="proj-git"
                        className="text-xs font-semibold text-zinc-400 uppercase"
                      >
                        GitHub Repo Link
                      </label>
                      <input
                        id="proj-git"
                        type="text"
                        value={projectForm.github_link}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            github_link: e.target.value,
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="proj-desc"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Description
                    </label>
                    <textarea
                      id="proj-desc"
                      required
                      rows={2}
                      value={projectForm.description}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="proj-challenges"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Challenges Faced
                    </label>
                    <textarea
                      id="proj-challenges"
                      rows={2}
                      value={projectForm.challenges}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          challenges: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="proj-future"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Future Plans
                    </label>
                    <textarea
                      id="proj-future"
                      rows={2}
                      value={projectForm.future_plans}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          future_plans: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 md:py-3 rounded-xl bg-brand-primary text-sm font-semibold text-white"
                  >
                    Save Project
                  </button>
                </form>
              )}

              {activeTab === "skills" && (
                <form onSubmit={handleSkillSubmit} className="space-y-3 md:space-y-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="sk-name"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Skill Name
                    </label>
                    <input
                      id="sk-name"
                      type="text"
                      required
                      value={skillForm.name}
                      onChange={(e) =>
                        setSkillForm({ ...skillForm, name: e.target.value })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                    />
                    {/* Auto icon preview */}
                    {skillForm.name &&
                      (() => {
                        const iconResult = getSkillIcon(skillForm.name);
                        return iconResult ? (
                          <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 w-fit">
                            <span className="text-xl leading-none">
                              {iconResult.icon}
                            </span>
                            <span className="text-xs text-zinc-400">
                              Icon auto-detected
                            </span>
                          </div>
                        ) : (
                          <p className="text-xs text-zinc-600 mt-1">
                            No icon found — will display a placeholder
                          </p>
                        );
                      })()}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1">
                      <label
                        htmlFor="sk-pct"
                        className="text-xs font-semibold text-zinc-400 uppercase"
                      >
                        Competency Percentage
                      </label>
                      <input
                        id="sk-pct"
                        type="number"
                        required
                        min={0}
                        max={100}
                        value={
                          Number.isNaN(skillForm.percentage)
                            ? ""
                            : skillForm.percentage
                        }
                        onChange={(e) =>
                          setSkillForm({
                            ...skillForm,
                            percentage: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="sk-cat"
                        className="text-xs font-semibold text-zinc-400 uppercase"
                      >
                        Category
                      </label>
                      <select
                        id="sk-cat"
                        value={skillForm.category}
                        onChange={(e) =>
                          setSkillForm({
                            ...skillForm,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                      >
                        <option>Frontend</option>
                        <option>Backend</option>
                        <option>Tools</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 md:py-3 rounded-xl bg-brand-primary text-sm font-semibold text-white"
                  >
                    Save Skill
                  </button>
                </form>
              )}

              {activeTab === "experience" && (
                <form onSubmit={handleExperienceSubmit} className="space-y-3 md:space-y-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="exp-role"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Role / Title
                    </label>
                    <input
                      id="exp-role"
                      type="text"
                      required
                      value={experienceForm.role}
                      onChange={(e) =>
                        setExperienceForm({
                          ...experienceForm,
                          role: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1">
                      <label
                        htmlFor="exp-comp"
                        className="text-xs font-semibold text-zinc-400 uppercase"
                      >
                        Company Name
                      </label>
                      <input
                        id="exp-comp"
                        type="text"
                        required
                        value={experienceForm.company}
                        onChange={(e) =>
                          setExperienceForm({
                            ...experienceForm,
                            company: e.target.value,
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="exp-dur"
                        className="text-xs font-semibold text-zinc-400 uppercase"
                      >
                        Duration (e.g. 2024 - Present)
                      </label>
                      <input
                        id="exp-dur"
                        type="text"
                        required
                        value={experienceForm.duration}
                        onChange={(e) =>
                          setExperienceForm({
                            ...experienceForm,
                            duration: e.target.value,
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="exp-desc"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Responsibilities / Summary
                    </label>
                    <textarea
                      id="exp-desc"
                      rows={3}
                      value={experienceForm.description}
                      onChange={(e) =>
                        setExperienceForm({
                          ...experienceForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 md:py-3 rounded-xl bg-brand-primary text-sm font-semibold text-white"
                  >
                    Save Experience
                  </button>
                </form>
              )}

              {activeTab === "education" && (
                <form onSubmit={handleEducationSubmit} className="space-y-3 md:space-y-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="edu-deg"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Degree Name
                    </label>
                    <input
                      id="edu-deg"
                      type="text"
                      required
                      value={educationForm.degree}
                      onChange={(e) =>
                        setEducationForm({
                          ...educationForm,
                          degree: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1">
                      <label
                        htmlFor="edu-inst"
                        className="text-xs font-semibold text-zinc-400 uppercase"
                      >
                        Institution
                      </label>
                      <input
                        id="edu-inst"
                        type="text"
                        required
                        value={educationForm.institution}
                        onChange={(e) =>
                          setEducationForm({
                            ...educationForm,
                            institution: e.target.value,
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="edu-dur"
                        className="text-xs font-semibold text-zinc-400 uppercase"
                      >
                        Duration (e.g. 2020 - 2024)
                      </label>
                      <input
                        id="edu-dur"
                        type="text"
                        required
                        value={educationForm.duration}
                        onChange={(e) =>
                          setEducationForm({
                            ...educationForm,
                            duration: e.target.value,
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="edu-desc"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Academic Details / Summary
                    </label>
                    <textarea
                      id="edu-desc"
                      rows={3}
                      value={educationForm.description}
                      onChange={(e) =>
                        setEducationForm({
                          ...educationForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 md:py-3 rounded-xl bg-brand-primary text-sm font-semibold text-white"
                  >
                    Save Education Record
                  </button>
                </form>
              )}

              {activeTab === "blogs" && (
                <form onSubmit={handleBlogSubmit} className="space-y-3 md:space-y-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="bl-title"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Blog Title
                    </label>
                    <input
                      id="bl-title"
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) =>
                        setBlogForm({ ...blogForm, title: e.target.value })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="bl-content"
                      className="text-xs font-semibold text-zinc-400 uppercase"
                    >
                      Blog Content
                    </label>
                    <textarea
                      id="bl-content"
                      required
                      rows={4}
                      value={blogForm.content}
                      onChange={(e) =>
                        setBlogForm({ ...blogForm, content: e.target.value })
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 md:py-3 rounded-xl bg-brand-primary text-sm font-semibold text-white"
                  >
                    Publish Post
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
