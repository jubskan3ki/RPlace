const Pixel = require('../models/pixel.model');

exports.setPixel = async (req, res) => {
    try {
        const { x, y, color } = req.body;
        const username = req.user.username; 

        console.log(`x: ${x}, y: ${y}, color: ${color}, username: ${username}`);

        const pixel = new Pixel({ x, y, color, username });
        await pixel.save();

        res.status(201).send(pixel);
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la pose du pixel' });
    }
};

exports.getPixel = async (req, res) => {
    try {
        const pixels = await Pixel.find();
        res.status(200).send(pixels);
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la récupération des pixels' });
    }
};

exports.getPixelHistoryByUser = async (req, res) => {
    try {
        const username = req.user.username; 

        const pixels = await Pixel.find({ username: username });

        // Vérifie si le tableau est vide
        if (pixels.length === 0) {
            return res.status(404).send({ message: "Pas d'historique trouvé pour cet utilisateur." });
        }

        res.status(200).send(pixels);
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la récupération de l\'historique.' });
    }
};
