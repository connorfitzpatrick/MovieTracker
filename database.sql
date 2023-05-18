-- Enter Database:
-- \c movies 


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

CREATE TABLE topmovies (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    movie_name VARCHAR(200),
    director VARCHAR(200),
    release_year int,
    ranking decimal,
    watched BOOLEAN,
    in_top BOOLEAN
);

INSERT INTO topmovies (movie_name, director, release_year, ranking, watched, in_top) values ('The Prestige', 'Christopher Nolan', 2005, 8.7, TRUE, TRUE);
INSERT INTO topmovies (movie_name, director, release_year, ranking, watched, in_top) values ('Predator', 'John McTiernan', 1987, 8.9, TRUE, TRUE);
INSERT INTO topmovies (movie_name, director, release_year, ranking, watched, in_top) values ('The Dark Knight', 'Christopher Nolan', 2009, 9.0, TRUE, TRUE);
INSERT INTO topmovies (movie_name, director, release_year, ranking, watched, in_top) values ('The Room', 'Tommy Wiseau', 2002, 6.1, FALSE, TRUE);
INSERT INTO topmovies (movie_name, director, release_year, ranking, watched, in_top) values ('Cats', 'Tom Hooper', 2020, 4.0, FALSE, FALSE);
INSERT INTO topmovies (movie_name, director, release_year, ranking, watched, in_top) values ('Shrek', 'Vicky Jenson', 2002, 8.7, TRUE, TRUE);
INSERT INTO topmovies (movie_name, director, release_year, ranking, watched, in_top) values ('2001 A Space Odyssey', 'Stanley Kubrick', 1967, 8.3, TRUE, TRUE);



CREATE TABLE mymovies (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    movie_name VARCHAR(200),
    director VARCHAR(200),
    release_year int,
    ranking decimal DEFAULT 5.0,
    watched BOOLEAN,
    in_top BOOLEAN DEFAULT FALSE
);

INSERT INTO mymovies (movie_name, director, release_year, ranking, watched, in_top) values ('The Social Network', 'David Fincher', 2010, 5.0, TRUE, FALSE);
INSERT INTO mymovies (movie_name, director, release_year, ranking, watched, in_top) values ('Jaws', 'Steven Spielberg', 1987, 5.0, FALSE, FALSE);