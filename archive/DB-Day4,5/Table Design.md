# Table Design

## users
id -> PK
username -> Unique varchar
email -> unique varchar
full_name -> varchar
password_hash -> not null varchar
created_at -> timestamp
updated_at -> timestamp

## tasks

id -> PK
task_name -> varchar
task_description -> optional varchar
task_project_id -> FK at projects.id
started_at -> timestamp
ended_at -> timestamp
status -> FK @ types.id
assigned_to -> FK @ user.id
created_by -> FK @ user.id
created_at -> timestamp
updated_at -> timestamp

## projects

id -> PK
name -> not null varchar
type -> FK @ types.id
description -> optional varchar
due_date -> timestamp
created_by -> FK @ users.id
created_at -> timestamp
updated_at -> timestamp

## types

id -> PK
name -> not null varchar
description -> optional varchar

## clients

id -> PK
name -> not null varchar
project_assigned -> FK @ projects.id
location -> optional varchar

## SQL statements:

``` sql

-- ===============================================================
-- OVERALL
-- ===============================================================
DROP SCHEMA `day_4_RDBMS`;

-- ===============================================================
-- Types
-- ===============================================================

CREATE TABLE day_4_RDBMS.lutbl_types (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(55) NOT NULL,
    description TEXT DEFAULT NULL
)

-- ALTER TABLE day_4_RDBMS.types RENAME lutbl_types;

-- ===============================================================
-- Users
-- ===============================================================

CREATE TABLE day_4_RDBMS.tbl_users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(55) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(55),
	age TINYINT DEFAULT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP DEFAULT NULL,
	status TINYINT DEFAULT NULL
)


-- ALTER TABLE day_4_RDBMS.users 
-- ADD deleted_at TIMESTAMP DEFAULT NULL;

-- ALTER TABLE day_4_RDBMS.users RENAME tbl_users;

-- ===============================================================
-- Projects
-- ===============================================================
CREATE TABLE day_4_RDBMS.tbl_projects (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(55) NOT NULL,
    type INTEGER REFERENCES lutbl_types(id),
    description VARCHAR(255) DEFAULT NULL,
    due_date DATE DEFAULT NULL,
	projects_status INTEGER REFERENCES lutbl_types(id)
    created_by INTEGER REFERENCES tbl_users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP DEFAULT NULL,
	status TINYINT DEFAULT NULL
)

-- ALTER TABLE day_4_RDBMS.projects 
-- ADD deleted_at TIMESTAMP DEFAULT NULL;

-- ALTER TABLE tbl_projects
-- ADD projects_status TINYINT DEFAULT NULL AFTER due_date

-- ALTER TABLE day_4_RDBMS.projects RENAME tbl_projects;

-- ===============================================================
-- Tasks
-- ===============================================================
CREATE TABLE day_4_RDBMS.tbl_tasks (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(55) DEFAULT NULL,
    task_description VARCHAR(255) DEFAULT NULL,
    task_project_id INTEGER REFERENCES tbl_projects(id),
    started_at TIMESTAMP DEFAULT NULL,
    ended_at TIMESTAMP DEFAULT NULL,
    tasks_status INTEGER REFERENCES lutbl_types(id),
    assigned_to INTEGER REFERENCES tbl_users(id),
    created_by INTEGER REFERENCES tbl_users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP DEFAULT NULL,
	status TINYINT DEFAULT NULL
)


-- ALTER TABLE day_4_RDBMS.tasks 
-- ADD deleted_at TIMESTAMP DEFAULT NULL;

-- ALTER TABLE day_4_RDBMS.tasks RENAME tbl_tasks;

-- ===============================================================
-- Clients
-- ===============================================================
CREATE TABLE day_4_RDBMS.tbl_clients (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(55) NOT NULL,
    project_assigned INTEGER REFERENCES tbl_projects(id),
    location VARCHAR(255) DEFAULT NULL,
	status TINYINT DEFAULT NULL
)

-- ALTER TABLE day_4_RDBMS.clients RENAME tbl_clients;

```