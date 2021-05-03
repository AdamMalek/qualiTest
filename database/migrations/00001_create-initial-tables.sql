CREATE TABLE IF NOT EXISTS question(
    question_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR
);