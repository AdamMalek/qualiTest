import express from "express";
import slugsController from "./controllers/slugsController";
import questionController from "./controllers/questionController";
import { requestLoggerMiddleware } from "./middlewares/requestLoggerMiddleware";

var exphbs = require('express-handlebars');
const { pool, runMigrations } = require('./database/db');

const app = express();
const PORT = 8000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json(), requestLoggerMiddleware);

app.all("/echo", (req, res) => res.json({ query: req.query, body: req.body }));

const api = express.Router()
  .use('/slugs', slugsController)
  .use('/test', slugsController)
  .use('/question', questionController);

app.use("/api", api);

app.get("/test-view", (req, res) => {
  const body = req.query;
  res.render('testView', { viewName: 'view name from model', model: Object.keys(body).length > 0 ? JSON.stringify(body) : null })
});

app.listen(PORT, async () => {
  await runMigrations();
  console.log(`Server started at ${PORT}`);
});
