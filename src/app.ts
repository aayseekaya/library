import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';

const app = express();

// CORS Middleware
app.use(cors());

// JSON parse middleware
app.use(bodyParser.json());

// Routers
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
