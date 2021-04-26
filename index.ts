import express from "express";
import slugsController from "./controllers/slugsController";
import bodyParser from "body-parser";
import { requestLoggerMiddleware } from "./middlewares/requestLoggerMiddleware";

const app = express();
const PORT = 8000;

app.use(bodyParser.json(), requestLoggerMiddleware);

app.all("/echo", (req, res) => res.json({ query: req.query, body: req.body }));

const api = express.Router()
                    .use('/slugs', slugsController)
                    .use('/test', slugsController);

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
