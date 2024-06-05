import express from 'express';

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Take home challenge!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
