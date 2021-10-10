-- CREATE "subjects"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'subjects'
            )
        THEN
            CREATE TABLE subjects
            (
                id   SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL
            );
        END IF;
    END
$$;


-- CREATE "teachers" table if it is not exist
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'teachers'
            )
        THEN
            CREATE TABLE teachers
            (
                id                  INTEGER PRIMARY KEY,
                subject_id          INTEGER NOT NULL,
                name                VARCHAR(50) NOT NULL,
                is_union_member     BOOLEAN NOT NULL,
                work_experience     NUMERIC CHECK(work_experience > 1),
                phone_number        TEXT,
                created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (subject_id) REFERENCES subjects (id)
            );
        END IF;
    END
$$;

-- CREATE "fired_workers_log" table if it is not exist
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'fired_workers_log'
            )
        THEN
            CREATE TABLE fired_workers_log
            (
                id          SERIAL PRIMARY KEY,
                teacher_id  INTEGER,
                name       VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        END IF;
    END
$$;    
    
    CREATE OR REPLACE FUNCTION aftertecheardel()
        RETURNS trigger AS
        $$
        BEGIN
            INSERT INTO fired_workers_log(name, teacher_id) VALUES
            (OLD.name, OLD.id);
        RETURN NEW;
        END
    $$
    LANGUAGE plpgsql; 
 
    END;
 
DO
$$
    BEGIN
    IF NOT EXISTS (
        SELECT *
        FROM information_schema.triggers
        WHERE trigger_name= 'after_teacher_del'
     )
    THEN
        CREATE TRIGGER after_teacher_del
            AFTER DELETE
            ON teachers
            FOR EACH ROW
            EXECUTE PROCEDURE aftertecheardel();
        END IF;
    END
$$;


-- CREATE "students"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'students'
            )
        THEN
            CREATE TABLE students
            (
                id           SERIAL PRIMARY KEY,
                name         VARCHAR(50) NOT NULL,
                phone_number TEXT,
                created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
            ); 
        END IF;
    END
$$;



-- CREATE "subjectsstudents"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'subjectsstudents'
            )
        THEN
            CREATE TABLE subjectsstudents
            (
                id       SERIAL PRIMARY KEY,
                students_id  INTEGER NOT NULL,
                subjects_id INTEGER NOT NULL,
                FOREIGN KEY (students_id) REFERENCES students (id) ON DELETE CASCADE,
                FOREIGN KEY (subjects_id) REFERENCES subjects (id) ON DELETE CASCADE
            );
        END IF;
    END
$$;

-- CREATE "lessons"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'lessons'
            )
        THEN
            CREATE TABLE lessons
            (
                id                      SERIAL PRIMARY KEY,
                subjects_students_id    INTEGER NOT NULL,
				lessons_start_time      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
				lessons_end_time        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP + INTERVAL '2 hour',
                FOREIGN KEY (subjects_students_id) REFERENCES subjectsstudents (id)
            );
        END IF;
    END
$$;

-- CREATE "payment"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'payment'
            )
        THEN
            CREATE TABLE payment
            (
                id                    SERIAL PRIMARY KEY,
                lessons_id            INTEGER NOT NULL,
                payment_start_time    TIMESTAMP,
				payment_end_time      TIMESTAMP,
                payment_amount        DECIMAL,
                FOREIGN KEY (lessons_id) REFERENCES lessons (id) ON DELETE CASCADE
            );
        END IF;
    END
$$;

-- FILL "subjects" with some data
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM public.subjects
             WHERE id = 1
               AND name = 'Biology'
            )
        THEN
            INSERT INTO public.subjects (id, name)
            VALUES (1, 'Biology'),
                   (2, 'Chemistry'),
                   (3, 'Computer science'),
                   (4, 'English'),
                   (5, 'Geography'),
                   (6, 'node.js');
        END IF;
    END
$$;

-- FILL "teachers"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM public.teachers
             WHERE id = 1
            )
        THEN
            INSERT INTO public.teachers (id, subject_id, name, is_union_member, work_experience, phone_number)
            VALUES (1, 1, 'Ivan', true, 3.7, '87516562122'),
                   (2, 2, 'Sonya', false, 2.5, '87516562222'),
                   (3, 3, 'Pavel', false, 12, '87516562225');
        END IF;
    END
$$;

-- FILL "students"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM public.students
             WHERE id = 1
            )
        THEN
            INSERT INTO public.students (id, name, phone_number)
            VALUES (1, 'Kristina', '87516562229'),
                   (2, 'Michael', '87516562227'),
                   (3, 'R2D2', '87516562226');
        END IF;
    END
$$;

-- FILL "subjectsstudents"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM public.subjectsstudents
             WHERE id = 1
            )
        THEN
            INSERT INTO public.subjectsstudents (id, students_id, subjects_id)
            VALUES (1, 1, 1),
                   (2, 1, 2),
                   (3, 2, 3),
				   (4, 3, 3);
        END IF;
    END
$$;

-- FILL "lessons"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM public.lessons
             WHERE id = 1
            )
        THEN
            INSERT INTO public.lessons (id, subjects_students_id )
            VALUES (1, 1),
                   (2, 2),
                   (3, 3);
        END IF;
    END
$$;

-- FILL "payment"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM public.payment
             WHERE id = 1
               AND payment_amount = 23.5
            )
        THEN
            INSERT INTO public.payment (id, lessons_id, payment_amount)
            VALUES (1, 1, 23.5);
        END IF;
    END
$$;

-- DROP SEQUENCE IF EXISTS teachers_id_seq;
-- SELECT MAX(id) + 1 FROM teachers;
-- CREATE SEQUENCE teachers_id_seq START WITH 5;
-- ALTER TABLE teachers ALTER COLUMN id SET DEFAULT nextval('teachers_id_seq');
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public to schooluser;

-- -- UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'schooltestdb';
-- -- SELECT pg_terminate_backend(pg_stat_activity.pid)
-- -- FROM pg_stat_activity
-- -- WHERE pg_stat_activity.datname = 'schooltestdb' AND pid <> pg_backend_pid();

-- -- ALTER TABLE lessons 
-- --   DROP CONSTRAINT IF EXISTS teachers_id;
-- -- ALTER TABLE lessons  
-- --   ADD CONSTRAINT teachers_id
-- --   FOREIGN KEY (teachers_id) 
-- --   REFERENCES teachers(id) 
-- --   ON DELETE CASCADE;