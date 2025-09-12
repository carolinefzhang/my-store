const express = require('express');
const { connectDB } = require('./config/db.js');
const dotenv = require('dotenv');
const productRoutes = require('./routes/product.route.js');
const path = require('path');
const { Permit } = require('permitio');

dotenv.config();

// Initialize Permit SDK
// Make sure PERMIT_API_KEY is in your .env file
// The PDP URL defaults to a local agent (http://localhost:7766) if PERMIT_PDP_URL is not set.
// If using Permit.io Cloud PDP, this may not be needed or will be a different URL.
const permit = new Permit({
    token: process.env.PERMIT_API_KEY,
    pdp: process.env.PERMIT_PDP_URL || "http://localhost:7766",
});

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('/*splat', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
module.exports.permit = permit;

