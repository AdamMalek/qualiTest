import { Router as router } from "express";
import questionsRepository from '../repositories/questionsRepository';

const questionsController = router();

questionsController.get('/', async (req, res) => {
    const questions = await questionsRepository.getAllQuestions();
    res.json(questions);
});

questionsController.get('/:id', async (req, res) => {
    const { id } = req.params;

    const question = await questionsRepository.getQuestionById(parseInt(id));
    if (question === null) {
        res.sendStatus(404);
        return;
    }
    res.json(question);
});

questionsController.post('/', async (req, res) => {
    const { title, content } = req.body;
    const newQuestion = await questionsRepository.insertNewQuestion(title, content)
    res.json(newQuestion);
});

questionsController.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    let updatedQuestion = await questionsRepository.updateQuestion(parseInt(id), title, content);
    if (updatedQuestion === null) {
        return res.sendStatus(404);
    }
    return res.json(updatedQuestion);
});

questionsController.delete('/:id', async (req, res) => {
    const { id } = req.params;

    let questionDeleted = await questionsRepository.deleteQuestion(parseInt(id));

    return res.sendStatus(questionDeleted ? 204 : 404);
});

export default questionsController;