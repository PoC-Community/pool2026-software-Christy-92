const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

let tasks = [];
let id = 1;

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.sendStatus(404);
  res.json(task);
});

app.post('/api/tasks', (req, res) => {
  if (!req.body.title) return res.sendStatus(400);

  const now = new Date().toISOString();
  const task = {
    id: id++,
    title: req.body.title,
    completed: false,
    createdAt: now,
    updatedAt: now
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.sendStatus(404);

  if (req.body.title !== undefined) task.title = req.body.title;
  if (req.body.completed !== undefined) task.completed = req.body.completed;
  task.updatedAt = new Date().toISOString();

  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.sendStatus(404);

  tasks.splice(index, 1);
  res.sendStatus(204);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});