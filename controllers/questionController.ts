import { Router as router } from "express";

const { pool } = require('../database/db');

const questionController = router();

questionController.get('/', async (req, res) => {
    try {
        const questions = await pool.query("SELECT * FROM question");

        res.json(questions);
    } catch (error) {
        console.error(error.message);
    }
});

questionController.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const questions = await pool.query("SELECT * FROM question WHERE question_id = $1", [id]);

        console.log(questions);

        res.json(questions.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

questionController.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newQuestion = await pool.query("INSERT INTO question (title, content) VALUES ($1, $2) RETURNING *", [title, content]);

        res.json(newQuestion);
    } catch (error) {
        console.error(error.message);
    }
});

export default questionController;