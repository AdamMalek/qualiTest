import { Router as router } from "express";

import { dbPool } from "../database/db";

const answersController = router();

answersController.get('/', async (req, res) => {
    try {
        const answers = await dbPool.query("SELECT * FROM answers");

        res.json(answers);
    } catch (error) {
        console.error(error.message);
    }
});

answersController.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const answers = await dbPool.query("SELECT * FROM answers WHERE answer_id = $1", [id]);

        console.log(answers);

        res.json(answers.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

answersController.post('/', async (req, res) => {
    try {
        const { content, question_id } = req.body;
        const newAnswer = await dbPool.query("INSERT INTO answers (content, question_id) VALUES ($1, $2) RETURNING *", 
            [content, question_id]);

        res.json(newAnswer);
    } catch (error) {
        console.error(error.message);
    }
});

answersController.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        await dbPool.query("UPDATE answers SET content = $1 WHERE answer_id = $2",
            [content, id]);

        res.json("answer has been updated.");
    } catch (error) {
        console.error(error.message);
    }
});

answersController.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await dbPool.query("DELETE FROM answers WHERE answer_id = $1", [id]);

        res.json("answer has been deleted.");
    } catch (error) {
        console.error(error.message);
    }
});

export default answersController;