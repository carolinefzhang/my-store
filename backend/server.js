import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import productRoutes from './routes/product.route.js';
import path from 'path'
import { Permit } from 'permitio';

dotenv.config();

// Initialize Permit SDK
// Make sure PERMIT_API_KEY is in your .env file
// The PDP URL defaults to a local agent (http://localhost:7766) if PERMIT_PDP_URL is not set.
// If using Permit.io Cloud PDP, this may not be needed or will be a different URL.
export const permit = new Permit({
    token: process.env.PERMIT_API_KEY,
    pdp: process.env.PERMIT_PDP_URL || "http://localhost:7766",
});

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

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

