---
title: Introduction
type: topic
section: Basics
course: SQL
tags:
- redis
---
#### Database
- A database is a container that holds tables and other SQL structures related to those tables.
- In diagrams and flow charts, databases are depicted as cylinders.

#### Table
- A table is the structure inside your database that contains data, organized in **columns** and **rows**.
- Columns and rows together make up a table.
- A column (or record) is a piece of data stored by your table. 
- A row (or field) is a single set of columns that describe attributes of a single thing.


#### What is SQL?
- SQL is case insensitive.


```
CREATE database test;
USE test;
DROP database test;
CREATE table user_details;
CREATE table user_details (
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    email VARCHAR(50),
    birthday DATE,
    status VARCHAR(20)
);
DESC user_details;
DROP TABLE user_details;

INSERT INTO user_details (last_name, first_name) VALUES ('ranjan', 'ashish');

SELECT * FROM user_details;

```


---