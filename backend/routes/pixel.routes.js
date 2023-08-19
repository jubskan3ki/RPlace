const express = require('express');
const pixelController = require('../controllers/pixel.controller');
const bonusController = require('../controllers/Bonus.controller');

const authenticateToken = require('../middlewares/auth.middleware');
const checkPixelDelay = require('../middlewares/delay.middleware');

const router = express.Router();

// Placer un pixel
router.post('/',authenticateToken ,checkPixelDelay, pixelController.setPixel);

// Récupérer tous les pixels
router.get('/',authenticateToken , pixelController.getPixel);

router.get('/history', authenticateToken, pixelController.getPixelHistoryByUser);

router.post('/grenade',authenticateToken ,checkPixelDelay, bonusController.colorGrenade);

router.post('/line',authenticateToken ,checkPixelDelay, bonusController.colorLine);


module.exports = router;