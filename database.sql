CREATE TABLE movies (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    movie_name VARCHAR(200),
    director VARCHAR(200),
    imdb_rating decimal,
    tomatoes_critics VARCHAR(5),
    tomatoes_audience VARCHAR(5),
    watched BOOLEAN
);

INSERT INTO movies (movie_name, director, imdb_rating, tomatoes_critics, tomatoes_audience, watched) values ('The Prestige', 'Christopher Nolan', 8.7, '76%', '92%', TRUE);
INSERT INTO movies (movie_name, director, imdb_rating, tomatoes_critics, tomatoes_audience, watched) values ('Predator', 'John McTiernan', 8.9, '67%', '100%', TRUE);
INSERT INTO movies (movie_name, director, imdb_rating, tomatoes_critics, tomatoes_audience, watched) values ('The Dark Knight', 'Christopher Nolan', 8.7, '97%', '100%', TRUE);
INSERT INTO movies (movie_name, director, imdb_rating, tomatoes_critics, tomatoes_audience, watched) values ('The Room', 'Tommy Wiseau', 6.1, '30%', '77%', FALSE);
INSERT INTO movies (movie_name, director, imdb_rating, tomatoes_critics, tomatoes_audience, watched) values ('Cats', 'Tom Hooper', 4.0, '50%', '29%', FALSE);
INSERT INTO movies (movie_name, director, imdb_rating, tomatoes_critics, tomatoes_audience, watched) values ('Shrek', 'Vicky Jenson', 8.7, '86%', '89%', TRUE);
INSERT INTO movies (movie_name, director, imdb_rating, tomatoes_critics, tomatoes_audience, watched) values ('2001 A Space Odyssey', 'Stanley Kubrick', 8.3, '78%', '65%', FALSE);

