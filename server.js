const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path'); // Adăugat pentru a gestiona calea către fișierul 404

const app = express();
const port = 3000;

const users = []; // Array temporar pentru stocarea utilizatorilor

app.use(bodyParser.json());
app.use(cors());

// Secretul pentru semnarea token-urilor
const secretKey = 'your_secret_key';

// Funcție pentru generarea unui token JWT
function generateToken(user) {
    return jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
}

// Înregistrarea utilizatorului
app.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;

    // Verificăm dacă utilizatorul există deja
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash-uim parola înainte de a o stoca
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    users.push(user);

    res.status(201).json({ message: 'User registered successfully' });
});

// Autentificarea utilizatorului
app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Verificăm parola
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generăm token-ul JWT
    const token = generateToken(user);

    res.json({ token });
});

// Middleware pentru gestionarea erorilor 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Rulăm serverul
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
