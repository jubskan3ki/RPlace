require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const pixelRoutes = require('./routes/pixel.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

connectDB();

app.use(express.json());

app.use(cors());

// Routes
app.use('/api/pixels', pixelRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
