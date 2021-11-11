import { Router as router } from "express";
import questionsRepository from '../repositories/questionsRepository';

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
    res.json(question);
});

questionsController.post('/', async (req, res) => {
    const { title, content } = req.body;
    const newQuestion = await questionsRepository.insertNewQuestion(title, content)
    res.json(newQuestion);
});

questionsController.put('/:id(\\d+)', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        await dbPool.query("UPDATE questions SET title = $1, content = $2 WHERE question_id = $3",
            [title, content, id]);

    let updatedQuestion = await questionsRepository.updateQuestion(parseInt(id), title, content);
    if (updatedQuestion === null) {
        return res.sendStatus(404);
    }
    return res.json(updatedQuestion);
});

questionsController.delete('/:id(\\d+)', async (req, res) => {
    try {
        const { id } = req.params;

    let questionDeleted = await questionsRepository.deleteQuestion(parseInt(id));

    return res.sendStatus(questionDeleted ? 204 : 404);
});

export default questionsController;