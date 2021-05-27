require('dotenv').config();
import express from "express";
import questionsController from "./controllers/questionsController";
import answersController from "./controllers/answersController";
import { requestLoggerMiddleware } from "./middlewares/requestLoggerMiddleware";

var exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 8000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json(), requestLoggerMiddleware);

app.use('/questions', questionsController)
  .use('/answers', answersController);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
