"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post('/login', (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.DASHBOARD_PASSWORD || 'admin123';
    if (password === adminPassword) {
        const token = jsonwebtoken_1.default.sign({ role: 'admin' }, process.env.JWT_SECRET || 'supersecretjwtkeyforportfolio', { expiresIn: '7d' });
        return res.json({ token });
    }
    else {
        return res.status(401).json({ message: 'Invalid password' });
    }
});
router.get('/verify', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        return res.status(401).json({ valid: false });
    const token = authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ valid: false });
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'supersecretjwtkeyforportfolio');
        return res.json({ valid: true });
    }
    catch (err) {
        return res.status(401).json({ valid: false });
    }
});
exports.default = router;
