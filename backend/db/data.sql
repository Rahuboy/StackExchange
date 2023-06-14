-- Empty all tables
DELETE FROM posts;
DELETE FROM comments;
DELETE FROM post_history;
DELETE FROM post_links;
DELETE FROM tags;
DELETE FROM users;
DELETE FROM votes;
DELETE FROM badges;

-- Rahul's path: /Users/rahulramachandran/Desktop/DBMS-2-Application/backend/db/xml/
-- Suryaansh's path: /Users/suryanshjain/Desktop/xml/

-- use source data.sql to dump data
-- If there is an error loading local files, first, on mysql, run: SET GLOBAL local_infile=1;
-- Then exit, and use the command mysql --local-infile=1 -uroot -p<password> <database_name>

-- Put the absolute path of the xml files not relative path

LOAD XML LOCAL INFILE '/Users/rahulramachandran/Desktop/DBMS-2-Application/backend/db/xml/Posts1.xml'
INTO TABLE posts
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/rahulramachandran/Desktop/DBMS-2-Application/backend/db/xml/Comments1.xml'
INTO TABLE comments
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/rahulramachandran/Desktop/DBMS-2-Application/backend/db/xml/PostHistory1.xml'
INTO TABLE post_history
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/rahulramachandran/Desktop/DBMS-2-Application/backend/db/xml/PostLinks1.xml'
INTO TABLE post_links
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/rahulramachandran/Desktop/DBMS-2-Application/backend/db/xml/Tags1.xml'
INTO TABLE tags
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/rahulramachandran/Desktop/DBMS-2-Application/backend/db/xml/Users.xml'
INTO TABLE users
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/rahulramachandran/Desktop/DBMS-2-Application/backend/db/xml/Votes1.xml'
INTO TABLE votes
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/rahulramachandran/Desktop/DBMS-2-Application/backend/db/xml/Badges1.xml'
INTO TABLE badges
ROWS IDENTIFIED BY '<row>';

-- Print all the counts
SELECT count(*) as posts FROM posts;
SELECT count(*) as comments FROM comments;
SELECT count(*) as post_history FROM post_history;
SELECT count(*) as post_links FROM post_links;
SELECT count(*) as tags FROM tags;
SELECT count(*) as users FROM users;
SELECT count(*) as votes FROM votes;
SELECT count(*) as badges FROM badges;
