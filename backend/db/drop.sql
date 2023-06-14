-- drop tables

SET FOREIGN_KEY_CHECKS = 0;
drop table if exists badges; 
drop table if exists comments; 
drop table if exists post_history; 
drop table if exists post_links; 
drop table if exists posts; 
drop table if exists tags; 
drop table if exists users; 
drop table if exists votes;
drop table if exists credentials;
SET FOREIGN_KEY_CHECKS = 1;

-- use source drop.sql to drop tables