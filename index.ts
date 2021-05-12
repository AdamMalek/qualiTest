require('dotenv').config();
import express from "express";
import slugsController from "./controllers/slugsController";
import questionsController from "./controllers/questionsController";
import { requestLoggerMiddleware } from "./middlewares/requestLoggerMiddleware";

var exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 8000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json(), requestLoggerMiddleware);

app.all("/echo", (req, res) => res.json({ query: req.query, body: req.body }));

const api = express.Router()
  .use('/slugs', slugsController)
  .use('/questions', questionsController);

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
