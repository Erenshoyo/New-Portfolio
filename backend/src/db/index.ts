import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export interface Profile {
  id: number;
  name: string;
  designation: string;
  photo_url: string;
  resume_url: string;
  email: string;
  phone: string;
  whatsapp: string;
  about_me: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    [key: string]: string | undefined;
  };
  hobbies: string[];
}

export interface Project {
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

export interface Skill {
  id: number;
  name: string;
  percentage: number;
  category: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === '') {
  throw new Error('❌ DATABASE_URL is not set. A live PostgreSQL database connection is required.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const INIT_SQL = `
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY DEFAULT 1,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255) NOT NULL,
  photo_url TEXT,
  resume_url TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),
  whatsapp VARCHAR(50),
  about_me TEXT,
  social_links JSONB,
  hobbies JSONB,
  CONSTRAINT single_profile CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url TEXT,
  description TEXT,
  tech_stack JSONB,
  live_link TEXT,
  github_link TEXT,
  challenges TEXT,
  future_plans TEXT
);

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  percentage INTEGER NOT NULL,
  category VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS experience (
  id SERIAL PRIMARY KEY,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS education (
  id SERIAL PRIMARY KEY,
  degree VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO profile (id, name, designation, photo_url, resume_url, email, phone, whatsapp, about_me, social_links, hobbies)
VALUES (
  1,
  'Asif Shahriar Tauhid',
  'Full Stack Developer',
  'https://i.ibb.co.com/r2rqVMTC/Gemini-Generated-Image-og2dtnog2dtnog2d.png',
  '',
  'asifshahriartauhid@gmail.com',
  '+8801937165042',
  '+8801570234257',
  'I am a passionate software engineer with a strong focus on building highly scalable, responsive, and beautiful web applications. My journey started with curiosity, and now I specialize in full stack development using modern frameworks.',
  '{"github": "https://github.com", "linkedin": "https://linkedin.com", "twitter": "https://twitter.com", "facebook": "https://facebook.com"}',
  '["Coding", "Reading Tech Blogs", "Gaming", "Photography"]'
)
ON CONFLICT (id) DO NOTHING;
`;

export async function initDb() {
  try {
    const client = await pool.connect();
    console.log('⚡ Successfully connected to PostgreSQL/NeonDB!');
    await client.query(INIT_SQL);
    console.log('✅ DB tables verified and initialized.');
    client.release();
  } catch (err: any) {
    console.error('❌ Database connection/query failed:', err.message);
    throw err;
  }
}

function safeJsonParse(val: any) {
  if (!val) return val;
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }
  return val;
}

export const db = {
  isMock: () => false,

  // Profile operations
  getProfile: async (): Promise<Profile> => {
    const res = await pool.query('SELECT * FROM profile WHERE id = 1');
    if (res.rows.length === 0) {
      throw new Error('Profile table is empty and was not initialized.');
    }
    const profile = res.rows[0];
    profile.social_links = safeJsonParse(profile.social_links);
    profile.hobbies = safeJsonParse(profile.hobbies);
    return profile as Profile;
  },

  updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const social_links = typeof data.social_links === 'object' ? JSON.stringify(data.social_links) : data.social_links;
    const hobbies = Array.isArray(data.hobbies) ? JSON.stringify(data.hobbies) : data.hobbies;

    const res = await pool.query(
      `UPDATE profile SET 
        name = $1, designation = $2, photo_url = $3, resume_url = $4, 
        email = $5, phone = $6, whatsapp = $7, about_me = $8, 
        social_links = $9, hobbies = $10 
       WHERE id = 1 RETURNING *`,
      [
        data.name ?? '',
        data.designation ?? '',
        data.photo_url ?? '',
        data.resume_url ?? '',
        data.email ?? '',
        data.phone ?? '',
        data.whatsapp ?? '',
        data.about_me ?? '',
        social_links ?? '{}',
        hobbies ?? '[]'
      ]
    );

    const profile = res.rows[0];
    profile.social_links = safeJsonParse(profile.social_links);
    profile.hobbies = safeJsonParse(profile.hobbies);
    return profile as Profile;
  },

  // Projects CRUD
  getProjects: async (): Promise<Project[]> => {
    const res = await pool.query('SELECT * FROM projects ORDER BY id DESC');
    return res.rows.map(row => ({
      ...row,
      tech_stack: safeJsonParse(row.tech_stack)
    })) as Project[];
  },

  getProjectById: async (id: string | number): Promise<Project | null> => {
    const res = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    row.tech_stack = safeJsonParse(row.tech_stack);
    return row as Project;
  },

  createProject: async (data: Omit<Project, 'id'>): Promise<Project> => {
    const tech_stack = Array.isArray(data.tech_stack) ? JSON.stringify(data.tech_stack) : (data.tech_stack || '[]');
    const res = await pool.query(
      `INSERT INTO projects (title, image_url, description, tech_stack, live_link, github_link, challenges, future_plans)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [data.title, data.image_url, data.description, tech_stack, data.live_link, data.github_link, data.challenges, data.future_plans]
    );
    const row = res.rows[0];
    row.tech_stack = safeJsonParse(row.tech_stack);
    return row as Project;
  },

  updateProject: async (id: string | number, data: Partial<Project>): Promise<Project | null> => {
    const original = await db.getProjectById(id);
    if (!original) return null;

    const merged = { ...original, ...data };
    const tech_stack = Array.isArray(merged.tech_stack) ? JSON.stringify(merged.tech_stack) : (merged.tech_stack || '[]');

    const res = await pool.query(
      `UPDATE projects SET 
        title = $1, image_url = $2, description = $3, tech_stack = $4,
        live_link = $5, github_link = $6, challenges = $7, future_plans = $8
       WHERE id = $9 RETURNING *`,
      [merged.title, merged.image_url, merged.description, tech_stack, merged.live_link, merged.github_link, merged.challenges, merged.future_plans, id]
    );
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    row.tech_stack = safeJsonParse(row.tech_stack);
    return row as Project;
  },

  deleteProject: async (id: string | number): Promise<boolean> => {
    const res = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);
    return res.rows.length > 0;
  },

  // Skills CRUD
  getSkills: async (): Promise<Skill[]> => {
    const res = await pool.query('SELECT * FROM skills ORDER BY percentage DESC');
    return res.rows as Skill[];
  },

  createSkill: async (data: Omit<Skill, 'id'>): Promise<Skill> => {
    const res = await pool.query(
      'INSERT INTO skills (name, percentage, category) VALUES ($1, $2, $3) RETURNING *',
      [data.name, data.percentage, data.category]
    );
    return res.rows[0] as Skill;
  },

  updateSkill: async (id: string | number, data: Partial<Skill>): Promise<Skill | null> => {
    const res = await pool.query(
      'UPDATE skills SET name = COALESCE($1, name), percentage = COALESCE($2, percentage), category = COALESCE($3, category) WHERE id = $4 RETURNING *',
      [data.name, data.percentage, data.category, id]
    );
    if (res.rows.length === 0) return null;
    return res.rows[0] as Skill;
  },

  deleteSkill: async (id: string | number): Promise<boolean> => {
    const res = await pool.query('DELETE FROM skills WHERE id = $1 RETURNING id', [id]);
    return res.rows.length > 0;
  },

  // Experience CRUD
  getExperiences: async (): Promise<Experience[]> => {
    const res = await pool.query('SELECT * FROM experience ORDER BY id DESC');
    return res.rows as Experience[];
  },

  createExperience: async (data: Omit<Experience, 'id'>): Promise<Experience> => {
    const res = await pool.query(
      'INSERT INTO experience (role, company, duration, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.role, data.company, data.duration, data.description]
    );
    return res.rows[0] as Experience;
  },

  updateExperience: async (id: string | number, data: Partial<Experience>): Promise<Experience | null> => {
    const res = await pool.query(
      'UPDATE experience SET role = COALESCE($1, role), company = COALESCE($2, company), duration = COALESCE($3, duration), description = COALESCE($4, description) WHERE id = $5 RETURNING *',
      [data.role, data.company, data.duration, data.description, id]
    );
    if (res.rows.length === 0) return null;
    return res.rows[0] as Experience;
  },

  deleteExperience: async (id: string | number): Promise<boolean> => {
    const res = await pool.query('DELETE FROM experience WHERE id = $1 RETURNING id', [id]);
    return res.rows.length > 0;
  },

  // Education CRUD
  getEducations: async (): Promise<Education[]> => {
    const res = await pool.query('SELECT * FROM education ORDER BY id DESC');
    return res.rows as Education[];
  },

  createEducation: async (data: Omit<Education, 'id'>): Promise<Education> => {
    const res = await pool.query(
      'INSERT INTO education (degree, institution, duration, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.degree, data.institution, data.duration, data.description]
    );
    return res.rows[0] as Education;
  },

  updateEducation: async (id: string | number, data: Partial<Education>): Promise<Education | null> => {
    const res = await pool.query(
      'UPDATE education SET degree = COALESCE($1, degree), institution = COALESCE($2, institution), duration = COALESCE($3, duration), description = COALESCE($4, description) WHERE id = $5 RETURNING *',
      [data.degree, data.institution, data.duration, data.description, id]
    );
    if (res.rows.length === 0) return null;
    return res.rows[0] as Education;
  },

  deleteEducation: async (id: string | number): Promise<boolean> => {
    const res = await pool.query('DELETE FROM education WHERE id = $1 RETURNING id', [id]);
    return res.rows.length > 0;
  },

  // Blogs CRUD
  getBlogs: async (): Promise<Blog[]> => {
    const res = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
    return res.rows as Blog[];
  },

  createBlog: async (data: Omit<Blog, 'id' | 'created_at'>): Promise<Blog> => {
    const res = await pool.query(
      'INSERT INTO blogs (title, content, image_url) VALUES ($1, $2, $3) RETURNING *',
      [data.title, data.content, data.image_url]
    );
    return res.rows[0] as Blog;
  },

  updateBlog: async (id: string | number, data: Partial<Blog>): Promise<Blog | null> => {
    const res = await pool.query(
      'UPDATE blogs SET title = COALESCE($1, title), content = COALESCE($2, content), image_url = COALESCE($3, image_url) WHERE id = $4 RETURNING *',
      [data.title, data.content, data.image_url, id]
    );
    if (res.rows.length === 0) return null;
    return res.rows[0] as Blog;
  },

  deleteBlog: async (id: string | number): Promise<boolean> => {
    const res = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING id', [id]);
    return res.rows.length > 0;
  },

  // Messages
  getMessages: async (): Promise<Message[]> => {
    const res = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    return res.rows as Message[];
  },

  createMessage: async (data: Omit<Message, 'id' | 'created_at' | 'is_read'>): Promise<Message> => {
    const res = await pool.query(
      'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.name, data.email, data.subject, data.message]
    );
    return res.rows[0] as Message;
  },

  markMessageRead: async (id: string | number): Promise<Message | null> => {
    const res = await pool.query(
      'UPDATE messages SET is_read = true WHERE id = $1 RETURNING *',
      [id]
    );
    if (res.rows.length === 0) return null;
    return res.rows[0] as Message;
  },

  deleteMessage: async (id: string | number): Promise<boolean> => {
    const res = await pool.query('DELETE FROM messages WHERE id = $1 RETURNING id', [id]);
    return res.rows.length > 0;
  }
};

