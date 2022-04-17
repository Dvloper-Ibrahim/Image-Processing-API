import express from 'express';
import router from './routes/myrouter';

const app = express();
const port = 3000;

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
