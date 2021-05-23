CREATE TABLE IF NOT EXISTS answers(
    answer_id SERIAL PRIMARY KEY,
    question_id INT,
    content VARCHAR,
    CONSTRAINT fk_question
        FOREIGN KEY(question_id)
            REFERENCES questions(question_id)
);

INSERT INTO public.answers(
	answer_id, question_id, content)
	VALUES (1, 1, 'SOLID is the mnemonic describing 5 useful rules in objective programming.')
	ON CONFLICT DO NOTHING;

INSERT INTO public.answers(
	answer_id, question_id, content)
	VALUES (2, 1, 'Seriously? You can check that by entering wikipedia and find out the answer faster than writing this stupid question.')
	ON CONFLICT DO NOTHING;

INSERT INTO public.answers(
	answer_id, question_id, content)
	VALUES (3, 2, 'Const value is assigned in a compile time in opposite to the readonly which is initialized in a run time. Also readonly can be declared in a class and assigned inside constructor. 
        Const must be always initialized immediately during the declaration.')
	ON CONFLICT DO NOTHING;

INSERT INTO public.answers(
	answer_id, question_id, content)
	VALUES (4, 2, 'Const - initialized runtime, readonly - compile time')
	ON CONFLICT DO NOTHING;