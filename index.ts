require('dotenv').config();
import express from "express";
import slugsController from "./controllers/slugsController";
import questionController from "./controllers/questionController";
import testController from "./controllers/testController";
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
  .use('/test', slugsController)
  .use('/question', questionController);

app.use("/api", api);
app.use("/test", testController)

app.listen(PORT, async () => {
  console.log(`Server started at ${PORT}`);
});
