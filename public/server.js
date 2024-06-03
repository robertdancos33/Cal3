const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views'));

// Routes
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://robiroby792:5bjs65X2rlPBf7OZ@firma.w1worwe.mongodb.net/?retryWrites=true&w=majority&appName=Firma', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Importăm modulul http pentru a crea serverul
const http = require('http');
const fs = require('fs'); // Modulul fs (file system) este folosit pentru a citi fișiere

// Definim portul pe care serverul nostru va asculta
const port = process.env.PORT || 3029;

// Creăm un server HTTP
const server = http.createServer((req, res) => {
    // Citim fișierul HTML
    fs.readFile('public/index.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data); // Trimitem conținutul fișierului HTML către client
        }
    });
});

// Ascultăm pe portul definit și afișăm un mesaj când serverul este pornit
server.listen(port, () => {
    console.log(`Serverul rulează la adresa http://localhost:${port}/`);
});