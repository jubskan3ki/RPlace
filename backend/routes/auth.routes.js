const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', [
    body('username').notEmpty().withMessage('Nom d’utilisateur requis'),
    body('email').isEmail().withMessage('Email non valide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit avoir au moins 6 caractères')
], authController.signup);

router.post('/login', [
    body('username').notEmpty().withMessage('Nom d’utilisateur requis'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit avoir au moins 6 caractères')
], authController.login);

module.exports = router;
