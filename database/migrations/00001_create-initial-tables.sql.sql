-- DATABASE

-- SELECT 'CREATE DATABASE quali_test'
-- WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'quali_test')\gexec

-- TABLES

CREATE TABLE IF NOT EXISTS question(
    question_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR, -- alternative type is text, some docs: https://www.postgresql.org/docs/current/datatype-character.html
);