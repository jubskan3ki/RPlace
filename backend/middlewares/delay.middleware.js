const Pixel = require('../models/pixel.model');

const checkPixelDelay = async (req, res, next) => {
    const username = req.user.username;
    const { url } = req;

    // Temps d'attente minimum (en ms) entre les pixels et les actions bonus
    const delayPixel = 5 * 60 * 1000; // 5 minutes
    const delayBonus = 30 * 60 * 1000; // 30 minutes

    const delay = url.includes('grenade') || url.includes('line') ? delayBonus : delayPixel;

    try {
        // Trouver le dernier pixel placé par cet utilisateur
        const lastPixel = await Pixel.findOne({ username: username }).sort({ timestamp: -1 });

        if (lastPixel) {
            const now = Date.now();
            const timeSinceLastPixel = now - lastPixel.timestamp;

            // Si l'utilisateur n'a pas attendu assez longtemps, terminer la requête avec un message d'erreur
            if (timeSinceLastPixel < delay) {
                const timeLeft = delay - timeSinceLastPixel;
                return res.status(429).json({
                    error: 'Veuillez attendre avant de placer un autre pixel.',
                    timeLeft: Math.round(timeLeft / 1000) // Temps restant en secondes
                });
            }
        }

        // Si l'utilisateur a attendu assez longtemps ou n'a jamais placé de pixel, passer au middleware ou au contrôleur suivant
        next();
    } catch (error) {
        console.error('Erreur lors de la vérification du délai entre les pixels:', error);
        res.status(500).json({ error: 'Erreur lors de la vérification du délai entre les pixels' });
    }
};

module.exports = checkPixelDelay;