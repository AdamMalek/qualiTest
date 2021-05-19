CREATE TABLE IF NOT EXISTS questions(
    question_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR
);