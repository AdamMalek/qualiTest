import { Router as router } from "express";

const { pool } = require('../database/db');

const questionController = router();

questionController.post('/create', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newQuestion = await pool.query("INSERT INTO question (title, content) VALUES ($1, $2) RETURNING *", [title, content]);

        res.json(newQuestion);
    } catch (err) {
        console.error(err.message);
    }
});

export default questionController;