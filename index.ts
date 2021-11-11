require('dotenv').config();
import express from "express";
import questionsController from "./controllers/questionsController";

var exphbs = require('express-handlebars');
import morgan from "morgan";
import { notFound, serverError } from "./helpers/responseHelpers";

const app = express();
const PORT = process.env.PORT || 8000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(morgan('combined'));
app.use(express.json());

app.use(express.static('./views/public'));

app.all("/echo", (req, res) => res.json({ query: req.query, body: req.body }));

const api = express.Router()
  .use('/questions', questionsController);

app.use(api);

app.get("/notFoundTest", (req, res) => {
  notFound(res);
});
app.get("/errorTest", (req, res) => {
  serverError(res, 'test');
});
app.get("/error", (req, res) => {
  throw new Error('unhandled error test')
});

// Handle 404
app.use((req, res) => {
  res.status(404);
  res.render('error_404');
});

// Handle 500
app.use((err: Error, req: any, res: any, next: any) => {
  res.status(500);
  serverError(res, err.message)
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
