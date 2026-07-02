"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Get all education (Public)
router.get('/', async (req, res) => {
    try {
        const list = await db_1.db.getEducations();
        return res.json(list);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
// Create education (Authenticated)
router.post('/', auth_1.default, async (req, res) => {
    try {
        const created = await db_1.db.createEducation(req.body);
        return res.status(201).json(created);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
// Update education (Authenticated)
router.put('/:id', auth_1.default, async (req, res) => {
    try {
        const updated = await db_1.db.updateEducation(req.params.id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'Education history not found' });
        return res.json(updated);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
// Delete education (Authenticated)
router.delete('/:id', auth_1.default, async (req, res) => {
    try {
        const deleted = await db_1.db.deleteEducation(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: 'Education history not found' });
        return res.json({ message: 'Education history deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.default = router;
