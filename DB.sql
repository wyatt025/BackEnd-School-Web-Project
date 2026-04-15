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
    firstname varchar(20),
    lastname varchar(20),
    dob date,
    gender varchar(20),
    email varchar(30),
    password varchar(100),
    role varchar(10),
);

insert into test_users (firstname, lastname, dob, gender, email, password, role) values ('John', 'Doe', '1990-04-14', 'male', 'John_User@example.com', 'John-pswrd', 'user');
insert into test_users (firstname, lastname, dob, gender, email, password, role) values ('Jane', 'Coder', '2000-05-20', 'female', 'J_C@code.com', 'pswrd', 'user');

/* create the video table  */
create table user_videos (
    id serial primary key,
    video_title varchar(500),
    description varchar(2000),
    video_file_path varchar(100),
    thumbnail_file_path varchar(100),
    userID int,
    CONSTRAINT fk_user
    FOREIGN KEY (userID)
    REFERENCES test_users(id)
);
/* insert test videos into the user_videos table  */
insert into user_videos (video_title, description, video_file_path, thumbnail_file_path, userID) 
values ('Test Video 1', 'This is just a test placeholder', 
'..\Server\videos\testVid_01.mp4', '..\Server\videoIMG\testVidPic_01.jpg', 2);

insert into user_videos (video_title, description, video_file_path, thumbnail_file_path, userID)
values ('Cool Test Video 2', 'Hey! Look at this cool video I made!',
'..\Server\videos\testVid_02.mp4', '..\Server\videoIMG\testVidPic_02.png', 3);

insert into user_videos (video_title, description, video_file_path, thumbnail_file_path, userID)
values ('Earth Orbit', 'Just a short video view of earth from orbit. Amazing.',
'..\Server\videos\testVid_1.mp4', '..\Server\videoIMG\vidTN_01.png', 1);

--creating tables for comments section
SELECT * FROM public.test_users ORDER BY id ASC;
SELECT * FROM public.user_videos ORDER BY id ASC;
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    video_id INTEGER,
    user_name TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
