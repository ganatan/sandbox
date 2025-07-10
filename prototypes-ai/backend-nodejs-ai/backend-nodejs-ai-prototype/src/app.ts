import express from 'express';
import cors from 'cors';
// import agentRouter from './routes/agent.route';

// import { Router, Request, Response } from 'express';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// app.use('/api/agent', agentRouter);

// app.use('*', (req: Request, res: Response) => {
//   console.log('00000000001');
//   res.status(200).json({ error: 'Error generating CRUD' });
// });

app.get('/persons', (req, res) => {
  res.json({ aaaa: 1111111 });
});

app.get('*', (req, res) => {
  res.json({ aaaa: 1111111 });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
