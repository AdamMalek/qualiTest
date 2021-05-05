import express from "express";
import expressSession from "express-session";
import cookieParser from 'cookie-parser';
import passport from "passport";
import authController from "./controllers/authController";
import slugsController from "./controllers/slugsController";
import testController from "./controllers/testController";
import configurePassport from "./passport/configure";
var exphbs = require('express-handlebars');

const app = express();
const PORT = 8000;

configurePassport(passport as any);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user as any);
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(cookieParser());
app.use(expressSession({ secret: 'session secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const api = express.Router()
  .use('/slugs', slugsController);

app.use("/api", api);
app.use("/test", testController)
app.use("/auth", authController)
app.get("/", (req, res) => {
  res.json({ user: req.user, cookie: req.cookies})
})

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
