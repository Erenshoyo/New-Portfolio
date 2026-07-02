"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Get profile (Public)
router.get('/', async (req, res) => {
    try {
        const profile = await db_1.db.getProfile();
        return res.json(profile);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
// Update profile (Authenticated)
router.put('/', auth_1.default, async (req, res) => {
    try {
        const updated = await db_1.db.updateProfile(req.body);
        return res.json(updated);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.default = router;
