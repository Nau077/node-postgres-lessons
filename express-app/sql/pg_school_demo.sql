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
                id         SERIAL PRIMARY KEY,
                subject_id VARCHAR(50) NOT NULL,
                name       VARCHAR(50) NOT NULL,
                phone_number        TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
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
                name       VARCHAR(50) NOT NULL,
                phone_number TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
            );
        THEN
            ALTER TABLE students FOREIGN KEY(id)
            REFERENCES subjectsstudents(students_id)
            ON DELETE CASCADE;   
        END IF;
    END
$$;


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
                FOREIGN KEY (students_id) REFERENCES students (id),
                FOREIGN KEY (subjects_id) REFERENCES subjects (id)
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
                id         SERIAL PRIMARY KEY,
                subjects_students_id   INTEGER NOT NULL,
                teachers_id INTEGER NOT NULL,
                FOREIGN KEY (teachers_id) REFERENCES teachers (id),
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
                id         SERIAL PRIMARY KEY,
                lessons_id INTEGER NOT NULL,
                payment_start_time  TIMESTAMP,
				payment_end_time  TIMESTAMP,
                payment_amount        DECIMAL,
                FOREIGN KEY (lessons_id) REFERENCES lessons (id)
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
            INSERT INTO public.teachers (id, subject_id, name, phone_number)
            VALUES (1, 1, 'Ivan', '87516562122'),
                   (2, 2, 'Sonya', '87516562222'),
                   (3, 3, 'Pavel', '87516562225');
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
                   (3, 2, 3);
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
            INSERT INTO public.lessons (teachers_id, subjects_students_id, id)
            VALUES (1, 1, 1),
                   (2, 2, 2),
                   (3, 3, 3);
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