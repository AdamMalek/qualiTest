import { Router as router } from "express";
import github from './auth/github';

const authController = router();

authController.use('/github', github);
authController.get('/login', (req, res) => {
    res.render('login')
});

export default authController;