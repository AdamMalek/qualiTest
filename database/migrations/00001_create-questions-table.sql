CREATE TABLE IF NOT EXISTS questions(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR
);

INSERT INTO public.questions(
	question_id, title, content)
	VALUES (1, 'What SOLID is?', 'Ive got this question during the interview. Would be grateful for help.')
	ON CONFLICT DO NOTHING;

INSERT INTO public.questions(
	question_id, title, content)
	VALUES (2, 'What is the difference between readonly and const?', 
        'Ive got this question during the interview. Would be grateful for help.')
	ON CONFLICT DO NOTHING;