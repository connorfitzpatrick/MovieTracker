"""
1. Grab JSON data from internet. Grab what I need and arrange it into my own hashtable.
2. Convert that hashtable into JSON
3. Make separate branch to try and to protect progress in Demo.
3. Have MovieList API grab that data and fill the it into the database (default unwatched)
"""

import urllib.request, json
import psycopg2

with urllib.request.urlopen("https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json") as url:
    data = json.load(url)

top250 = []

for i, entry in enumerate(data):
    row = []
    row.append(entry['name'])
    row.append(entry['directors'][0])
    row.append(entry['year'])
    row.append(entry['rating'])
    row.append(False)
    row.append(False)
    top250.append(row)

# This info should come from .env file 
conn = psycopg2.connect(database="movies",
                        host="localhost",
                        user="",
                        password="",
                        port="5432")


cursor = conn.cursor()
for i in top250:
    name = i[0]
    director = i[1]
    year = i[2]
    rating = i[3]
    seen = i[4]
    top_250 = i[5]
    cursor.execute("INSERT INTO topmovies (movie_name, director, release_year, ranking, watched, in_top) VALUES (%s, %s, %s, %s, %s, %s)", (name, director, year, rating, seen, top_250))
    
conn.commit()
cursor.close()
conn.close()



