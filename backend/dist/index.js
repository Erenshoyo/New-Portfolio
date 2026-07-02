"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
// Load environment variables
dotenv_1.default.config();
// Initialize app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes imports
const auth_1 = __importDefault(require("./routes/auth"));
const profile_1 = __importDefault(require("./routes/profile"));
const projects_1 = __importDefault(require("./routes/projects"));
const skills_1 = __importDefault(require("./routes/skills"));
const experience_1 = __importDefault(require("./routes/experience"));
const education_1 = __importDefault(require("./routes/education"));
const blogs_1 = __importDefault(require("./routes/blogs"));
// Register routes
app.use('/api/auth', auth_1.default);
app.use('/api/profile', profile_1.default);
app.use('/api/projects', projects_1.default);
app.use('/api/skills', skills_1.default);
app.use('/api/experience', experience_1.default);
app.use('/api/education', education_1.default);
app.use('/api/blogs', blogs_1.default);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        time: new Date(),
        environment: process.env.NODE_ENV || 'development'
    });
});
// Start DB & Express Server
async function startServer() {
    await (0, db_1.initDb)();
    app.listen(PORT, () => {
        console.log(`🚀 Portfolio Express backend running on http://localhost:${PORT}`);
        console.log(`ℹ️ Base API URL: http://localhost:${PORT}/api`);
    });
}
startServer().catch(err => {
    console.error('❌ Server startup error:', err);
    process.exit(1);
});
