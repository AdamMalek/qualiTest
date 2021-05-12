import { Router as router } from "express";

const { dbPool } = require('../database/db');

const questionsController = router();

questionsController.get('/', async (req, res) => {
    try {
        const questions = await dbPool.query("SELECT * FROM question");

        res.json(questions);
    } catch (error) {
        console.error(error.message);
    }
});

questionsController.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const questions = await dbPool.query("SELECT * FROM question WHERE question_id = $1", [id]);

        console.log(questions);

        res.json(questions.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

questionsController.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newQuestion = await dbPool.query("INSERT INTO question (title, content) VALUES ($1, $2) RETURNING *", [title, content]);

        res.json(newQuestion);
    } catch (error) {
        console.error(error.message);
    }
});

questionsController.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        await dbPool.query("UPDATE question SET title = $1, content = $2 WHERE question_id = $3",
            [title, content, id]);

        res.json("Question has been updated.");
    } catch (error) {
        console.error(error.message);
    }
});

questionsController.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await dbPool.query("DELETE FROM question WHERE question_id = $1", [id]);

        res.json("Question has been deleted.");
    } catch (error) {
        console.error(error.message);
    }
});

export default questionsController;