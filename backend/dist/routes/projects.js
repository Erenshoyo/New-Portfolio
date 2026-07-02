"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Get all projects (Public)
router.get('/', async (req, res) => {
    try {
        const list = await db_1.db.getProjects();
        return res.json(list);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
// Get single project (Public)
router.get('/:id', async (req, res) => {
    try {
        const item = await db_1.db.getProjectById(req.params.id);
        if (!item)
            return res.status(404).json({ message: 'Project not found' });
        return res.json(item);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
// Create project (Authenticated)
router.post('/', auth_1.default, async (req, res) => {
    try {
        const created = await db_1.db.createProject(req.body);
        return res.status(201).json(created);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
// Update project (Authenticated)
router.put('/:id', auth_1.default, async (req, res) => {
    try {
        const updated = await db_1.db.updateProject(req.params.id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'Project not found' });
        return res.json(updated);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
// Delete project (Authenticated)
router.delete('/:id', auth_1.default, async (req, res) => {
    try {
        const deleted = await db_1.db.deleteProject(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: 'Project not found or already deleted' });
        return res.json({ message: 'Project deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.default = router;
