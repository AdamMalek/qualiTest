import { Router as router } from "express";

import { dbPool } from "../database/db";

const questionsController = router();

questionsController.get('/', async (req, res) => {
    try {
        const questions = await dbPool.query("SELECT * FROM questions");
        
        res.render('questions', { questions: questions.rows });
    } catch (error) {
        console.error(error.message);
    }
});

questionsController.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const questions = await dbPool.query("SELECT * FROM questions WHERE question_id = $1", [id]);

        res.json(questions.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

questionsController.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newQuestion = await dbPool.query("INSERT INTO questions (title, content) VALUES ($1, $2) RETURNING *", [title, content]);

        res.json(newQuestion);
    } catch (error) {
        console.error(error.message);
    }
});

questionsController.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        await dbPool.query("UPDATE questions SET title = $1, content = $2 WHERE question_id = $3",
            [title, content, id]);

        res.json("Question has been updated.");
    } catch (error) {
        console.error(error.message);
    }
});

questionsController.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await dbPool.query("DELETE FROM questions WHERE question_id = $1", [id]);

        res.json("Question has been deleted.");
    } catch (error) {
        console.error(error.message);
    }
});

export default questionsController;