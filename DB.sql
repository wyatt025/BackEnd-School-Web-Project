/*
db user name = postgres
db password = root
*/

/*
create database webDevTestdb;

open query tool for webDevTestDB
*/

create table test_users (
    id serial primary key,
    username varchar(20),
    email varchar(30),
    role varchar(10),
    password varchar(100)
);

insert into test_users (username, email, role, password) values ('John_User', 'John_User@example.com', 'user', 'John-pswrd');
