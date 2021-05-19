require('dotenv').config();
import express from "express";
import questionsController from "./controllers/questionsController";
import answersController from "./controllers/answersController";
import { requestLoggerMiddleware } from "./middlewares/requestLoggerMiddleware";
import { requestErrorHandlingMiddleware } from "./middlewares/requestErrorHandlingMiddleware";

var exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 8000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json(), requestErrorHandlingMiddleware, requestLoggerMiddleware);

app.all("/echo", (req, res) => res.json({ query: req.query, body: req.body }));

const api = express.Router()
  .use('/questions', questionsController)
  .use('/answers', answersController);

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
