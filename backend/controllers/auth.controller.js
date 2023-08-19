const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ $or: [{username}, {email}] });
        if (userExists) {
            return res.status(400).json({ error: 'Le nom d\'utilisateur ou l\'email existe déjà.' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        // Include username in the token
        const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token, userId: newUser._id, message: 'Inscription réussie et connecté!' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            console.log("Utilisateur non trouvé");
            return res.status(400).json({ error: 'Utilisateur non trouvé' });
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        
        if (!isPasswordMatch) {
            console.log("Identifiants invalides");
            return res.status(400).json({ error: 'Identifiants invalides' });
        }

        // Include username in the token
        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, userId: user._id });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: error.message });
    }
};

