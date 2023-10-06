const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/database');
const socketIo = require('socket.io');
const Pixel = require('./models/pixel.model');

const pixelRoutes = require('./routes/pixel.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

connectDB();

app.use(express.json());

app.use(cors());

// Routes
app.use('/api/pixels', pixelRoutes);
app.use('/api/auth', authRoutes);

io.on('connection', async (socket) => {
    console.log('Client connecté via websocket');
  
    const pixels = await Pixel.find(); 
    socket.emit('pixels', pixels); 
  
    socket.on('newPixel', async (pixelData) => {
        try {
            const { x, y, color, username } = pixelData;
            const newPixel = new Pixel({ x, y, color, username });
            await newPixel.save();
    
            const updatedPixels = await Pixel.find();
            io.emit('pixels', updatedPixels);
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un nouveau pixel :', error);
        }
    });
  
});
  
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});