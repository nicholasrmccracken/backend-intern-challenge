import express from 'express';
import pointsRoutes from './routes/points-routes';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(pointsRoutes);

/**
 * Starts the server if not in test mode.
 */
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  });
}

export default app; // Exporting the app for testing
