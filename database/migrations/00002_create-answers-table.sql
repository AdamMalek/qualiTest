CREATE TABLE IF NOT EXISTS answers(
    id SERIAL PRIMARY KEY,
    question_id INT,
    content VARCHAR,
    CONSTRAINT fk_question
        FOREIGN KEY(question_id)
            REFERENCES questions(id)
);