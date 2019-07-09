DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
USE reviews;

CREATE TABLE reviews(
  id int NOT NULL AUTO_INCREMENT,
  listing_id int(4) NOT NULL,
  date date NOT NULL,
  review_title varchar(300) NOT NULL,
  review_details varchar(500),
  overall_rating int(1) NOT NULL,
  nickname_login varchar(25) NOT NULL,
  location varchar(25),
  athletic_type varchar(25),
  body_type varchar(25) NOT NULL,
  age int(2) NOT NULL,
  what_you_liked varchar(300),
  what_you_did_not_liked varchar(300),
  fit int(1),
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u <USER> < schema.sql
*/