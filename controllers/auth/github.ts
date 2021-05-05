import { Router as router } from "express";
import passport from 'passport';

const app = router();

app.get('/',
  passport.authenticate('github'));

app.get('/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

export default app;