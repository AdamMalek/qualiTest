import { Router as router } from "express";

import { dbPool } from "../database/db";

const questionsController = router();

questionsController.get('/', async (req, res) => {
    const questions = await dbPool.query("SELECT * FROM questions");

    res.render('questions', { questions: questions.rows });
});

questionsController.get('/:id(\\d+)', async (req, res) => {
    const { id } = req.params;

    try {
        const questionAndAnswers = await dbPool.query(
        "SELECT Q.question_id, Q.title as questionTitle, Q.content as questionContent, A.answer_id, A.content as answerContent " + 
        "FROM questions AS Q " +
        "INNER JOIN answers AS A ON Q.question_id = A.question_id " + 
        "WHERE Q.question_id = $1", [id]);

        res.render('question', {question: questionAndAnswers.rows[0], answers: questionAndAnswers.rows});
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

questionsController.put('/:id(\\d+)', async (req, res) => {
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

questionsController.delete('/:id(\\d+)', async (req, res) => {
    try {
        const { id } = req.params;

        await dbPool.query("DELETE FROM questions WHERE question_id = $1", [id]);

        res.json("Question has been deleted.");
    } catch (error) {
        console.error(error.message);
    }
});

export default questionsController;