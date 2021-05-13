CREATE TABLE IF NOT EXISTS answers(
    answer_id SERIAL PRIMARY KEY,
    question_id INT,
    content VARCHAR,
    CONSTRAINT fk_question
        FOREIGN KEY(question_id)
            REFERENCES questions(question_id)
);