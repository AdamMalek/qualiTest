import QuestionEntity from '../entities/questionEntity';
import { BaseRepository } from './baseRepository';


class QuestionsRepository extends BaseRepository {
    async getAllQuestions(): Promise<QuestionEntity[]> {
        let res = await this.query<QuestionEntity>("SELECT * FROM questions");
        return res.rows;
    }

    async getQuestionById(id: number): Promise<QuestionEntity | null> {
        var res = await this.query<QuestionEntity>("SELECT * FROM questions WHERE id = $1", [id]);
        return res.rowCount === 0 ? null : res.rows[0];
    }

    async insertNewQuestion(title: string, content: string): Promise<QuestionEntity> {
        const query = "INSERT INTO questions (title, content) VALUES ($1, $2) RETURNING *";
        const queryParams = [title, content];
        const newQuestion = await this.query<QuestionEntity>(query, queryParams);
        return newQuestion.rows[0];
    }

    async updateQuestion(id: number, title: string, content: string): Promise<QuestionEntity | null> {
        const query = "UPDATE questions SET title = $1, content = $2 WHERE id = $3 RETURNING *";
        const queryParams = [title, content, id];
        const question = await this.query<QuestionEntity>(query, queryParams);
        return question.rowCount === 0 ? null : question.rows[0];
    }

    async deleteQuestion(id: number): Promise<boolean> {
        var res = await this.query<QuestionEntity>("DELETE FROM questions WHERE id = $1", [id]);
        return res.rowCount > 0;
    }
}

const questionsRepository = new QuestionsRepository();
export default questionsRepository;