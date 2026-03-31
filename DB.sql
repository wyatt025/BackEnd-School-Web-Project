/*
db user name = postgres
db password = root
*/

/*
create database webDevTestdb;

open query tool for webDevTestDB
*/

/* first table and user */
create table test_users (
    id serial primary key,
    username varchar(20),
    email varchar(30),
    role varchar(10),
    password varchar(100)
);

insert into test_users (username, email, role, password) values ('John_User', 'John_User@example.com', 'user', 'John-pswrd');

/* 2nd & 3rd user for testing  */
insert into test_users (username, email, role, password) values ('John_Coder', 'J_C@code.com', 'user', 'pswrd');
insert into test_users (username, email, role, password) values ('John_Programmer', 'John_Pro@pro.com', 'user', 'John0');

/* create the video table  */
create table user_videos (
    id serial primary key,
    video_title varchar(500),
    description varchar(2000),
    file_path varchar(100),
    userID int,
    CONSTRAINT fk_user
    FOREIGN KEY (userID)
    REFERENCES test_users(id)
);
/* insert test videos into the user_videos table  */
insert into user_videos (video_title, description, file_path, userID) 
values ('Test Video 1', 'This is just a test placeholder', 
'..\Server\videos\testVidPic_01.jpg', 2);

insert into user_videos (video_title, description, file_path, userID) 
values ('Test Video 2', 'This is just a test placeholder', 
'..\Server\videos\testVidPic_02.png', 3);