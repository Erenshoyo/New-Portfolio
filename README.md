# 🚀 Tauhid's Portfolio Website

A full-stack, professionally designed portfolio website built with **Next.js** and **Express.js**. Features a responsive UI, secure admin dashboard for content management, and a comprehensive project showcase.

**Live Demo:** [asiftauhid.vercel.app](https://asiftauhid.vercel.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Admin Dashboard](#admin-dashboard)
- [Deployment](#deployment)
- [Development](#development)
- [Contributing](#contributing)

---

## 🎯 Overview

This is a modern, full-stack portfolio website designed to showcase professional work, skills, experience, education, and blog posts. It includes:

- **Public Portfolio Website:** A beautiful, responsive portfolio landing page
- **Secure Admin Dashboard:** Password-protected dashboard for managing portfolio content
- **RESTful API Backend:** Express.js backend with PostgreSQL database
- **Real-time Updates:** Changes in the admin panel instantly reflect on the portfolio

Perfect for developers, designers, and professionals looking to showcase their work with a custom, self-hosted solution.

---

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **DaisyUI** - Tailwind component library
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library
- **React Icons** - Additional icons

### **Backend**
- **Express.js** - Web server framework
- **TypeScript** - Type-safe backend
- **PostgreSQL** - Relational database
- **JWT** - Authentication & authorization
- **CORS** - Cross-origin resource sharing
- **Node.js** - JavaScript runtime

### **DevOps & Deployment**
- **Vercel** - Frontend hosting
- **Render/Railway** - Backend hosting
- **Git/GitHub** - Version control

---

## ✨ Features

### **Portfolio Website**
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Animated hero section with profile photo
- ✅ About me section with hobbies/interests
- ✅ Skills matrix with category organization
- ✅ Experience timeline
- ✅ Education credentials timeline
- ✅ Featured projects showcase
- ✅ Technical blog with tags and read time
- ✅ Contact form with message storage
- ✅ Social media links
- ✅ Resume download
- ✅ Dark/Light theme support
- ✅ Smooth scrolling & page transitions

### **Admin Dashboard**
- 🔐 Password-protected login
- 📝 Profile management (name, designation, bio, contact info)
- 🖼️ Project CRUD operations
- 💼 Skills management with auto-icon detection
- 🏢 Experience timeline management
- 🎓 Education credentials management
- 📰 Blog post publishing
- 👥 Message viewing
- 🔄 Real-time data sync with backend
- 📱 Fully mobile-responsive admin interface
- 🌐 Fallback mock mode for offline testing

---

## 📁 Project Structure

```
portfolio3/
├── backend/                          # Express.js backend
│   ├── src/
│   │   ├── index.ts                 # Server entry point
│   │   ├── db/
│   │   │   └── index.ts             # Database initialization & schema
│   │   ├── middleware/
│   │   │   └── auth.ts              # JWT authentication middleware
│   │   └── routes/
│   │       ├── auth.ts              # Authentication endpoints
│   │       ├── profile.ts           # Profile management
│   │       ├── projects.ts          # Projects CRUD
│   │       ├── skills.ts            # Skills CRUD
│   │       ├── experience.ts        # Experience CRUD
│   │       ├── education.ts         # Education CRUD
│   │       ├── blogs.ts             # Blog posts CRUD
│   │       └── messages.ts          # Contact messages storage
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── dist/                        # Compiled JavaScript (after build)
│
├── frontend/                         # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx             # Home/portfolio page
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── globals.css          # Global styles
│   │   │   └── dashboard/
│   │   │       └── page.tsx         # Admin dashboard
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Navigation component
│   │   │   ├── ProjectCard.tsx      # Project showcase card
│   │   │   ├── ProjectDetailsModal.tsx  # Project details popup
│   │   │   ├── BlogDetailsModal.tsx # Blog details popup
│   │   │   ├── SkillsSection.tsx    # Skills display
│   │   │   ├── Timeline.tsx         # Experience/Education timeline
│   │   │   ├── ContactForm.tsx      # Contact form
│   │   │   ├── MarkdownRenderer.tsx # Markdown to JSX converter
│   │   │   └── Footer.tsx           # Footer component
│   │   └── lib/
│   │       ├── animations.ts        # Framer Motion animation variants
│   │       └── skillIcons.tsx       # Skill icon mapper
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── .env.example
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   └── public/                      # Static assets
│
└── README.md                         # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and **npm/yarn/pnpm**
- **PostgreSQL** database (local or cloud-hosted)
- **Git** for version control

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio3.git
cd portfolio3
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your database URL and settings
nano .env

# Start development server
npm run dev

# Or build and start production
npm run build
npm start
```

**Backend runs on:** `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your API URL
nano .env.local

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:3000`

### 4. Access the Application
- **Portfolio:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/dashboard
  - Default password: `admin123` (change in backend `.env`)

---

## 🔧 Backend Setup (Detailed)

### Installation
```bash
cd backend
npm install
```

### Environment Configuration
Create a `.env` file in the backend directory:

```bash
# Server port
PORT=5000

# PostgreSQL connection string
# Example: postgresql://user:password@localhost:5432/portfolio
DATABASE_URL=your_database_url_here

# JWT secret for token signing (use a strong secret in production)
JWT_SECRET=your_super_secret_jwt_key_here

# Admin dashboard password
DASHBOARD_PASSWORD=your_secure_password_here
```

### Database Setup
The database schema is automatically initialized on first server start. Tables created:
- `profile`
- `projects`
- `skills`
- `experience`
- `education`
- `blogs`
- `messages`

### Running the Backend
```bash
# Development (with auto-reload)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

### API Health Check
```bash
curl http://localhost:5000/api/health
```

---

## 🎨 Frontend Setup (Detailed)

### Installation
```bash
cd frontend
npm install
```

### Environment Configuration
Create a `.env.local` file in the frontend directory:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000
# For production: https://your-backend-domain.com
```

### Running the Frontend
```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Features
- **App Router:** Modern Next.js 13+ routing
- **Type Safety:** Full TypeScript support
- **CSS:** Tailwind CSS 4 with DaisyUI components
- **Animations:** Framer Motion for smooth transitions
- **Responsive Design:** Mobile-first design approach
- **SEO:** Optimized metadata and Open Graph tags

---

## 🔐 Environment Variables

### Backend (`.env`)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Express server port | `5000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/portfolio` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_super_secret_key_min_32_chars` |
| `DASHBOARD_PASSWORD` | Admin dashboard password | `secure_password_here` |

### Frontend (`.env.local`)
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

### Endpoints

#### **Authentication**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `POST` | `/auth/login` | Login with password | No |
| `GET` | `/auth/verify` | Verify JWT token | Yes |

**Login Request:**
```json
{
  "password": "admin123"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **Profile**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/profile` | Get profile data | No |
| `PUT` | `/profile` | Update profile | Yes |

#### **Projects**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/projects` | Get all projects | No |
| `POST` | `/projects` | Create project | Yes |
| `PUT` | `/projects/:id` | Update project | Yes |
| `DELETE` | `/projects/:id` | Delete project | Yes |

#### **Skills**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/skills` | Get all skills | No |
| `POST` | `/skills` | Create skill | Yes |
| `PUT` | `/skills/:id` | Update skill | Yes |
| `DELETE` | `/skills/:id` | Delete skill | Yes |

#### **Experience**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/experience` | Get all experiences | No |
| `POST` | `/experience` | Create experience | Yes |
| `PUT` | `/experience/:id` | Update experience | Yes |
| `DELETE` | `/experience/:id` | Delete experience | Yes |

#### **Education**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/education` | Get all education | No |
| `POST` | `/education` | Create education | Yes |
| `PUT` | `/education/:id` | Update education | Yes |
| `DELETE` | `/education/:id` | Delete education | Yes |

#### **Blogs**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/blogs` | Get all blog posts | No |
| `POST` | `/blogs` | Create blog post | Yes |
| `PUT` | `/blogs/:id` | Update blog post | Yes |
| `DELETE` | `/blogs/:id` | Delete blog post | Yes |

#### **Messages**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/messages` | Get all messages | Yes |
| `POST` | `/messages` | Submit contact form | No |
| `PUT` | `/messages/:id` | Mark message as read | Yes |

#### **Health Check**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server health status |

---

## 🗄️ Database Schema

### Profile Table
```sql
CREATE TABLE profile (
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
  hobbies JSONB
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url TEXT,
  description TEXT NOT NULL,
  tech_stack JSONB NOT NULL,
  live_link VARCHAR(255),
  github_link VARCHAR(255),
  challenges TEXT,
  future_plans TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Skills Table
```sql
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  percentage INT DEFAULT 80,
  category VARCHAR(100) DEFAULT 'Frontend'
);
```

### Experience Table
```sql
CREATE TABLE experience (
  id SERIAL PRIMARY KEY,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  description TEXT
);
```

### Education Table
```sql
CREATE TABLE education (
  id SERIAL PRIMARY KEY,
  degree VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  description TEXT
);
```

### Blogs Table
```sql
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🛡️ Admin Dashboard

### Access
- **URL:** `/dashboard`
- **Default Password:** `admin123`
- **Change Password:** Update `DASHBOARD_PASSWORD` in backend `.env`

### Features

#### Profile Manager
- Update personal information (name, designation, contact)
- Add profile photo URL
- Set resume download link
- Manage social media links (GitHub, LinkedIn, Twitter, Facebook)
- Add biography and hobbies

#### Projects Manager
- Create/edit/delete projects
- Add project images, description, and tech stack
- Link to live project and GitHub repository
- Document challenges faced and future plans

#### Skills Manager
- Add skills with competency percentage (0-100%)
- Organize by category (Frontend, Backend, Tools)
- Icons automatically detected for popular skills

#### Experience Timeline
- Add work experience entries
- Specify role, company, and duration
- Document responsibilities and achievements

#### Education Manager
- Add degree and institution details
- Record graduation dates
- Add academic details and achievements

#### Blog Publishing
- Create and publish blog posts
- Support for markdown content
- Auto-generate tags from hashtags
- Calculate read time automatically

#### Message Inbox
- View contact form submissions
- Mark messages as read
- All messages stored in database

#### Mobile Responsiveness
- Hamburger menu navigation (mobile)
- Responsive form layouts
- Mobile-optimized modals
- Bottom sheet modals on small screens

---

## 🌐 Deployment

### Frontend (Vercel)

1. **Connect Repository**
   ```bash
   vercel link
   ```

2. **Set Environment Variables**
   - `NEXT_PUBLIC_API_URL`: Your backend API URL

3. **Deploy**
   ```bash
   vercel deploy --prod
   ```

### Backend (Render/Railway)

#### Option 1: Render
1. Create account on [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables in dashboard
5. Deploy

#### Option 2: Railway
1. Create account on [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL plugin
4. Deploy from GitHub
5. Set environment variables

### Database (Railway or Neon)

#### Railway PostgreSQL
1. Add PostgreSQL plugin to Railway project
2. Copy connection string
3. Set as `DATABASE_URL` in backend environment

#### Neon PostgreSQL
1. Create account on [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Set as `DATABASE_URL` in backend environment

### CORS Configuration
Update `CORS_ORIGIN` in backend for production domain:
```typescript
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://yourdomain.vercel.app",
    "https://your-backend-domain.com"
  ],
  credentials: true
};
```

---

## 👨‍💻 Development

### Running Both Servers Simultaneously
Open two terminals:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Code Style
- **Linting:** ESLint configured
- **TypeScript:** Strict mode enabled
- **Formatting:** Use `npm run lint` to check

### Hot Reload
- **Frontend:** Automatic on file changes
- **Backend:** Enabled via `tsx watch`

### Browser DevTools
- React DevTools extension recommended
- Redux DevTools (if Redux is added)

---

## 📝 Creating New Components

### Frontend Component Template
```typescript
import { motion } from 'framer-motion';

interface MyComponentProps {
  title: string;
  // Add other props
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      {/* Component content */}
    </motion.div>
  );
}
```

### Backend Route Template
```typescript
import express, { Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Public endpoint
router.get('/', (req: Request, res: Response) => {
  // Logic here
  res.json({ data: [] });
});

// Protected endpoint
router.post('/', authenticate, (req: Request, res: Response) => {
  // Admin-only logic
  res.json({ success: true });
});

export default router;
```

---

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Error**
- Verify `DATABASE_URL` is correct
- Check PostgreSQL is running
- Ensure network access (for cloud databases)

**Port Already in Use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**CORS Errors**
- Update `CORS_ORIGIN` array in backend
- Ensure frontend URL is included

### Frontend Issues

**API Not Responding**
- Check backend is running
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check browser console for network errors

**Module Not Found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 Already in Use**
```bash
next dev -p 3001
```

---

## 📚 Technologies Deep Dive

### Frontend Architecture
- **Server Components:** Layout, error boundaries
- **Client Components:** Interactive features
- **API Routes:** Future extensibility
- **Static Optimization:** Image optimization, font loading

### Backend Architecture
- **Middleware Stack:** CORS, JSON parsing, authentication
- **Route Modularity:** Separate route files per entity
- **Database Pooling:** Connection management via `pg` pool
- **Error Handling:** Try-catch blocks with meaningful responses

### Security
- **JWT Authentication:** Token-based auth for admin routes
- **Password Hashing:** Ready for bcrypt integration
- **CORS:** Restricted origins
- **Environment Variables:** Sensitive data protected
- **SQL Injection Prevention:** Parameterized queries via `pg`

---

## 🚦 Future Enhancements

- [ ] Email notifications for contact form submissions
- [ ] Comment system for blog posts
- [ ] Analytics dashboard
- [ ] Dark/Light theme toggle persistence
- [ ] Progressive Web App (PWA) capabilities
- [ ] Search functionality for blog posts
- [ ] Social media share buttons
- [ ] Sitemap and robots.txt for SEO
- [ ] Newsletter subscription
- [ ] Project filtering and sorting

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Tauhid** - Full Stack Software Engineer

- Portfolio: [asiftauhid.vercel.app](https://asiftauhid.vercel.app)
- GitHub: [@asiftauhid](https://github.com/asiftauhid)
- LinkedIn: [linkedin.com/in/asiftauhid](https://linkedin.com/in/asiftauhid)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact via email: [your-email@example.com]
- Visit the portfolio website's contact form

---

**Last Updated:** July 2026  
**Version:** 1.0.0

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
