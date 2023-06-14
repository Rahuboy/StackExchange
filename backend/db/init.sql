-- Create all tables
-- For documentation of schema, see https://meta.stackexchange.com/questions/2677/database-schema-documentation-for-the-public-data-dump-and-sede
-- Also see: https://sedeschema.github.io/

-- use source schema.sql to make tables

-- users
CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	account_id INT, -- User's Stack Exchange Network profile ID
	reputation INT NOT NULL,
	views INT DEFAULT 0, -- Number of times profile is viewed
	down_votes INT DEFAULT 0, -- How many downvotes user has cast
	up_votes INT DEFAULT 0, -- How many upvotes user has cast
	display_name VARCHAR(255) NOT NULL, 
	location VARCHAR(512),
	profile_image_url VARCHAR(255),
	website_url VARCHAR(255),
	about_me MEDIUMTEXT,
	creation_date TIMESTAMP(3) NOT NULL,
	last_access_date TIMESTAMP(3) NOT NULL
);


-- credentials
CREATE TABLE credentials (
	id INT PRIMARY KEY,
	user_name VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	access_token VARCHAR(255),
	FOREIGN KEY (id) REFERENCES users(id) 
	ON DELETE CASCADE
);


-- Posts
CREATE TABLE posts (
	id INT AUTO_INCREMENT PRIMARY KEY,
	owner_user_id INT,
	last_editor_user_id INT,
	post_type_id SMALLINT NOT NULL, -- 1 = question, 2 = answer, 3 = orphaned tag wiki, 4 = tag wiki excerpt, 5 = tag wiki, 6 = moderator nomination, 7 = wiki placeholder, 8 = privilege wiki
	accepted_answer_id INT, -- Only present if post_type_id = 1
	score INT NOT NULL, 
	parent_id INT, -- Only present if post_type_id = 2
	view_count INT,
	answer_count INT DEFAULT 0,
	comment_count INT DEFAULT 0,
	owner_display_name VARCHAR(64),
	last_editor_display_name VARCHAR(64),
	title VARCHAR(512),
	tags VARCHAR(512),
	content_license VARCHAR(64) NOT NULL,
	body MEDIUMTEXT,
	favorite_count INT,
	creation_date TIMESTAMP(3) NOT NULL,
	community_owned_date TIMESTAMP(3),
	closed_date TIMESTAMP(3), -- Present only if post is closed
	last_edit_date TIMESTAMP(3),
	last_activity_date TIMESTAMP(3)
	 
);

-- PostLinks
CREATE TABLE post_links (
	id INT AUTO_INCREMENT PRIMARY KEY,
	related_post_id INT NOT NULL, -- id of the post that is linked to
	post_id INT NOT NULL, -- id of the post that contains the link
	link_type_id TINYINT NOT NULL, -- 1 = linked, 3 = duplicate(postid is a duplicate of relatedpostid)
	creation_date TIMESTAMP(3) NOT NULL,
	FOREIGN KEY (post_id) REFERENCES posts(id) 
	ON DELETE CASCADE,
	FOREIGN KEY (related_post_id) REFERENCES posts(id) 
	ON DELETE CASCADE   
);

-- PostHistory
CREATE TABLE post_history (
	id INT AUTO_INCREMENT PRIMARY KEY,
	post_id INT NOT NULL,
	user_id INT,
	post_history_type_id TINYINT NOT NULL, 
	user_display_name VARCHAR(64),
	content_license VARCHAR(64),
	revision_guid VARCHAR(225),
	text MEDIUMTEXT,
	comment MEDIUMTEXT,
	creation_date TIMESTAMP(3) NOT NULL,
	FOREIGN KEY (post_id) REFERENCES posts(id) 
	ON DELETE CASCADE   
);

-- Comments
CREATE TABLE comments (
	id INT AUTO_INCREMENT PRIMARY KEY,
	post_id INT NOT NULL,
	user_id INT,
	score TINYINT NOT NULL,
	content_license VARCHAR(64) NOT NULL,
	user_display_name VARCHAR(64),
	text MEDIUMTEXT,
	creation_date TIMESTAMP(3) NOT NULL,
	FOREIGN KEY (post_id) REFERENCES posts(id) 
	ON DELETE CASCADE  
);

-- Votes
CREATE TABLE votes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT, -- User who cast the vote
	post_id INT NOT NULL,
	vote_type_id TINYINT NOT NULL, -- 1 = accepted, 2 = up, 3 = down, 4 = offensive, 5 = favorite, 6 = close, 7 = reopen, 8 = bounty start, 9 = bounty close, 10 = delete, 11 = undelete, 12 = spam
	bounty_amount TINYINT,
	creation_date TIMESTAMP(3) NOT NULL
);

-- Badges
CREATE TABLE badges (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	class TINYINT NOT NULL, -- 1 = gold, 2 = silver, 3 = bronze
	name VARCHAR(64) NOT NULL, -- Name of the badge
	tag_based TINYINT(1) NOT NULL,
	date TIMESTAMP(3) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tags
CREATE TABLE tags (
	id INT AUTO_INCREMENT PRIMARY KEY,
	excerpt_post_id INT,
	wiki_post_id INT,
	tag_name VARCHAR(255) NOT NULL,
	count INT DEFAULT 0
);


