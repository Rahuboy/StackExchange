# this code will connect to the database and will populate the credentials table
# there is a users table which has a column called display_name.
# -- users
# CREATE TABLE users (
# 	id INT AUTO_INCREMENT PRIMARY KEY,
# 	account_id INT, -- User's Stack Exchange Network profile ID
# 	reputation INT NOT NULL,
# 	views INT DEFAULT 0, -- Number of times profile is viewed
# 	down_votes INT DEFAULT 0, -- How many downvotes user has cast
# 	up_votes INT DEFAULT 0, -- How many upvotes user has cast
# 	display_name VARCHAR(255) NOT NULL, 
# 	location VARCHAR(512),
# 	profile_image_url VARCHAR(255),
# 	website_url VARCHAR(255),
# 	about_me MEDIUMTEXT,
# 	creation_date TIMESTAMP(3) NOT NULL,
# 	last_access_date TIMESTAMP(3) NOT NULL
# );


# -- credentials
# CREATE TABLE credentials (
# 	id INT PRIMARY KEY,
# 	user_name VARCHAR(255) NOT NULL UNIQUE,
# 	password VARCHAR(255) NOT NULL,
# 	access_token VARCHAR(255),
# 	FOREIGN KEY (id) REFERENCES users(id) 
# 	ON DELETE CASCADE
# );

# these are the tables

# The username should be the display_name of the user concatenated with the id, and the password should be the bcrypt hash of their username with some salt (for details on this, look at the pre existing sign up API).  Access token should be null

# the password for the database is in the .env file and the user is root


# this is the code

import mysql.connector
import bcrypt
import os
import sys
import random
import string
import psycopg2
from psycopg2.extras import RealDictCursor

# load the environment variables
from dotenv import load_dotenv
load_dotenv()

MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')

# this is the code to connect to the database
mydb = mysql.connector.connect(
    database='cqadb',
    user='root',
    passwd=MYSQL_PASSWORD,
    host='localhost'
)

# this is the code to get the data from the users table
mycursor = mydb.cursor()
mycursor.execute("SELECT display_name, id FROM users")
myresult = mycursor.fetchall()

# this is the code to insert the data into the credentials table
for x in myresult:
    password = x[0] + str(x[1])
    user_name = x[0] + str(x[1])
    mycursor.execute("INSERT INTO credentials (id, user_name, password) VALUES (%s, %s, %s)", (x[1], user_name, password))
    mydb.commit()

# this is the code to close the connection
mycursor.close()
mydb.close()