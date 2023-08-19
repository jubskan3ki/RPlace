const Pixel = require('../models/pixel.model');

exports.colorGrenade = async (req, res) => {
    try {
        if (!req.body || !req.body.x || !req.body.y || !req.body.color) {
            return res.status(400).send({ message: 'Données de requête incomplètes.' });
        }

        const { x: xString, y: yString, color } = req.body;
        const x = parseInt(xString, 10);
        const y = parseInt(yString, 10);
        const username = req.user.username; 

        console.log(`x: ${x}, y: ${y}, color: ${color}, username: ${username}`);

        // List of offsets for the adjacent pixels
        const offsets = [
            [-1, -1], [0, -1], [1, -1],
            [-1, 0], [0, 0], [1, 0],
            [-1, 1], [0, 1], [1, 1]
        ];

        const pixels = [];
        for (const offset of offsets) {
            const xOffset = offset[0];
            const yOffset = offset[1];
            if (x + xOffset >= 0 && x + xOffset < 50 && y + yOffset >= 0 && y + yOffset < 50) {
                pixels.push(new Pixel({ x: x + xOffset, y: y + yOffset, color, username }));
            }
        }

        if (pixels.length === 0) {
            return res.status(400).send({ message: 'Aucun pixel valide à insérer.' });
        }

        await Pixel.insertMany(pixels);
        res.status(201).send(pixels);
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la pose des pixels' });
    }
};


exports.colorLine = async (req, res) => {
    try {
        const { y, color } = req.body;
        const username = req.user.username; 
        console.log(`y: ${y}, color: ${color}, username: ${username}`);

        const pixels = [];
        for (let x = 0; x < 50; x++) {
            pixels.push(new Pixel({ x, y, color, username }));
        }

        await Pixel.insertMany(pixels);
        res.status(201).send(pixels);
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la pose des pixels' });
    }
};
