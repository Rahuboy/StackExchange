-- Example of schema 

-- Users
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS post_links;
DROP TABLE IF EXISTS post_history;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS badges;
DROP TABLE IF EXISTS tags;


CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	account_id INT,
	reputation INT NOT NULL,
	views INT DEFAULT 0,
	down_votes INT DEFAULT 0,
	up_votes INT DEFAULT 0,
	display_name VARCHAR(255) NOT NULL,
	location VARCHAR(512),
	profile_image_url VARCHAR(255),
	website_url VARCHAR(255),
	about_me MEDIUMTEXT,
	creation_date TIMESTAMP(3) NOT NULL,
	last_access_date TIMESTAMP(3) NOT NULL
);

-- Posts
CREATE TABLE posts (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	owner_user_id INT,
	last_editor_user_id INT,
	post_type_id SMALLINT NOT NULL,
	accepted_answer_id INT,
	score INT NOT NULL,
	parent_id INT,
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
	closed_date TIMESTAMP(3),
	last_edit_date TIMESTAMP(3),
	last_activity_date TIMESTAMP(3)    
);

-- PostLinks
CREATE TABLE post_links (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	related_post_id INT NOT NULL,
	post_id INT NOT NULL,
	link_type_id TINYINT NOT NULL,
	creation_date TIMESTAMP(3) NOT NULL
);

-- PostHistory
-- <row Id="1" post_history_type_id="2" PostId="1" RevisionGUID="09047374-2b75-4102-9a0d-44204a8e5eb0" CreationDate="2010-09-01T19:34:48.000" UserId="6" Text="A coworker of mine believes that there *any* use of in-code comments (ie, not javadoc style method or class comments) is a [code smell](http://en.wikipedia.org/wiki/Code_smell).  What do you think?" ContentLicense="CC BY-SA 2.5" />
CREATE TABLE post_history (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	post_id INT NOT NULL,
	user_id INT,
	post_history_type_id TINYINT NOT NULL,
	user_display_name VARCHAR(64),
	content_license VARCHAR(64),
	revision_guid VARCHAR(225),
	text MEDIUMTEXT,
	comment MEDIUMTEXT,
	creation_date TIMESTAMP(3) NOT NULL
);

-- Comments
CREATE TABLE comments (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	post_id INT NOT NULL,
	user_id INT,
	score TINYINT NOT NULL,
	content_license VARCHAR(64) NOT NULL,
	user_display_name VARCHAR(64),
	text MEDIUMTEXT,
	creation_date TIMESTAMP(3) NOT NULL
);

-- Votes
CREATE TABLE votes (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT,
	post_id INT NOT NULL,
	vote_type_id TINYINT NOT NULL,
	bounty_amount TINYINT,
	creation_date TIMESTAMP(3) NOT NULL,
	UNIQUE (user_id, post_id)
);

-- Badges
CREATE TABLE badges (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	class TINYINT NOT NULL,
	name VARCHAR(64) NOT NULL,
	tag_based TINYINT(1) NOT NULL,
	date TIMESTAMP(3) NOT NULL
);

-- Tags
CREATE TABLE tags (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	excerpt_post_id INT,
	wiki_post_id INT,
	tag_name VARCHAR(255) NOT NULL,
	count INT DEFAULT 0
);
	