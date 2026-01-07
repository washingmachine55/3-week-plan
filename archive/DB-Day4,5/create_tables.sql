-- Active: 1765478296024@@127.0.0.1@3306
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS tbl_banks (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_branches (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	bank_id INT(11),
	name VARCHAR(255) NOT NULL,
	code CHAR(4) NOT NULL,
	address_id INT(11),
	is_main BOOLEAN DEFAULT FALSE,
	main_email VARCHAR(50) NULL,
	main_phone VARCHAR(11) NULL,
	FOREIGN KEY (bank_id) REFERENCES tbl_banks(id),
	FOREIGN KEY (address_id) REFERENCES tbl_addresses(id)
);

CREATE TABLE IF NOT EXISTS tbl_products (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(1000) DEFAULT NULL,
	branch_id INT(11),
	created_at TIMESTAMP NOT NULL,
	created_by INT(11),
	updated_at TIMESTAMP DEFAULT NULL,
	updated_by INT(11),
	deleted_at TIMESTAMP DEFAULT NULL,
	deleted_by INT(11),
	status TINYINT,
	FOREIGN KEY (branch_id) REFERENCES tbl_branches(id),
	FOREIGN KEY (created_by) REFERENCES tbl_users(id),
	FOREIGN KEY (updated_by) REFERENCES tbl_users(id),
	FOREIGN KEY (deleted_by) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_product_plans (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	product_id INT(11),
	name VARCHAR(255) NOT NULL,
	description VARCHAR(1000) DEFAULT NULL,
	amount DECIMAL(10,2) NOT NULL,
	plan_date DATE DEFAULT NULL,
	created_at TIMESTAMP NOT NULL,
	created_by INT(11),
	updated_at TIMESTAMP DEFAULT NULL,
	updated_by INT(11),
	deleted_at TIMESTAMP DEFAULT NULL,
	deleted_by INT(11),
	status TINYINT,
	FOREIGN KEY (product_id) REFERENCES tbl_products(id),
	FOREIGN KEY (created_by) REFERENCES tbl_users(id),
	FOREIGN KEY (updated_by) REFERENCES tbl_users(id),
	FOREIGN KEY (deleted_by) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_internal_rules (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(1000) DEFAULT NULL,
	created_at TIMESTAMP NOT NULL,
	created_by INT(11),
	updated_at TIMESTAMP DEFAULT NULL,
	updated_by INT(11),
	deleted_at TIMESTAMP DEFAULT NULL,
	deleted_by INT(11),
	status TINYINT,
	FOREIGN KEY (created_by) REFERENCES tbl_users(id),
	FOREIGN KEY (updated_by) REFERENCES tbl_users(id),
	FOREIGN KEY (deleted_by) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_loans (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	product_plan_id INT(11),
	customer_id INT(11),
	rules_id INT(11) DEFAULT NULL,
	amount DECIMAL(10,2) NOT NULL,
	approved BOOLEAN DEFAULT FALSE,
	approved_by INT(11),
	due_date DATE DEFAULT NULL,
	interest_rate FLOAT DEFAULT NULL,
	created_at TIMESTAMP NOT NULL,
	created_by INT(11),
	updated_at TIMESTAMP DEFAULT NULL,
	updated_by INT(11),
	deleted_at TIMESTAMP DEFAULT NULL,
	deleted_by INT(11),
	status TINYINT,
	FOREIGN KEY (product_plan_id) REFERENCES tbl_product_plans(id),
	FOREIGN KEY (customer_id) REFERENCES tbl_users(id),
	FOREIGN KEY (rules_id) REFERENCES tbl_internal_rules(id),
	FOREIGN KEY (approved_by) REFERENCES tbl_users(id),
	FOREIGN KEY (created_by) REFERENCES tbl_users(id),
	FOREIGN KEY (updated_by) REFERENCES tbl_users(id),
	FOREIGN KEY (deleted_by) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_loan_penalties (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	rules_id INT(11),
	loan_id INT(11),
	amount DECIMAL(10,2) NOT NULL,
	created_by INT(11),
	updated_at TIMESTAMP DEFAULT NULL,
	updated_by INT(11),
	deleted_at TIMESTAMP DEFAULT NULL,
	deleted_by INT(11),
	status TINYINT,
	FOREIGN KEY (rules_id) REFERENCES tbl_internal_rules(id),
	FOREIGN KEY (loan_id) REFERENCES tbl_loans(id),
	FOREIGN KEY (created_by) REFERENCES tbl_users(id),
	FOREIGN KEY (updated_by) REFERENCES tbl_users(id),
	FOREIGN KEY (deleted_by) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_auth_providers (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	user_id INT(11),
	provider_type VARCHAR(20),
	provider_id VARCHAR(255),
	provider_account_id VARCHAR(255),
	refresh_token VARCHAR(360),
	access_token VARCHAR(360),
	token_type TINYINT ,
	created_at TIMESTAMP,
	expires_at TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_users (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(50) NOT NULL UNIQUE,
	password_hash VARCHAR(64) NOT NULL,
	access_type TINYINT,
	created_at TIMESTAMP DEFAULT NULL,
	created_by INT(11),
	updated_at TIMESTAMP DEFAULT NULL,
	updated_by INT(11),
	deleted_at TIMESTAMP DEFAULT NULL,
	deleted_by INT(11),
	status TINYINT,
	FOREIGN KEY (created_by) REFERENCES tbl_users(id),
	FOREIGN KEY (updated_by) REFERENCES tbl_users(id),
	FOREIGN KEY (deleted_by) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_user_details (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	user_id INT(11),
	kyc_status TINYINT,
	first_name VARCHAR(35) NOT NULL,
	last_name VARCHAR(35) NOT NULL,
	dob DATE NOT NULL,
	phone_no VARCHAR(11) NOT NULL,
	home_no VARCHAR(11) DEFAULT NULL,
	cnic CHAR(13) NOT NULL,
	occupation VARCHAR(35) DEFAULT NULL,
	address_id INT(11),
	created_at TIMESTAMP NOT NULL,
	created_by INT(11),
	updated_at TIMESTAMP DEFAULT NULL,
	updated_by INT(11),
	deleted_at TIMESTAMP DEFAULT NULL,
	deleted_by INT(11),
	status TINYINT,
	FOREIGN KEY (user_id) REFERENCES tbl_users(id),
	FOREIGN KEY (address_id) REFERENCES tbl_addresses(id),
	FOREIGN KEY (created_by) REFERENCES tbl_users(id),
	FOREIGN KEY (updated_by) REFERENCES tbl_users(id),
	FOREIGN KEY (deleted_by) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_activities (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	activity_type_id INT(11),
	description VARCHAR(1000) DEFAULT NULL,
	created_by INT(11),
	created_at TIMESTAMP NOT NULL,
	updated_by INT(11),
	updated_at TIMESTAMP DEFAULT NULL,
	FOREIGN KEY (activity_type_id) REFERENCES lutbl_activity_types(id),
	FOREIGN KEY (created_by) REFERENCES tbl_users(id),
	FOREIGN KEY (updated_by) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_addresses (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	street_num VARCHAR(8) NOT NULL,
	street_addr VARCHAR(100) NOT NULL,
	street_addr_line_2 VARCHAR(100) DEFAULT NULL,
	city VARCHAR(50) NOT NULL,
	region VARCHAR(20) NOT NULL,
	zip_code CHAR(5) NOT NULL,
	created_by INT(11),
	created_at TIMESTAMP NOT NULL,
	updated_by INT(11),
	updated_at TIMESTAMP DEFAULT NULL,
	deleted_by INT(11),
	deleted_at TIMESTAMP DEFAULT NULL,
	status TINYINT,
	FOREIGN KEY (created_by) REFERENCES tbl_users(id),
	FOREIGN KEY (updated_by) REFERENCES tbl_users(id),
	FOREIGN KEY (deleted_by) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_transactions (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	loan_id INT(11),
	user_id INT(11),
	amount DECIMAL(10,2) NOT NULL,
	repayment_type TINYINT,
	transaction_date DATE NOT NULL,
	method TINYINT NOT NULL,
	is_verified BOOLEAN DEFAULT FALSE,
	status TINYINT,
	FOREIGN KEY (loan_id) REFERENCES tbl_loans(id),
	FOREIGN KEY (user_id) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_discounts (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	product_plan_id INT(11),
	amount DECIMAL(10,2) NOT NULL,
	expiration_date DATE NOT NULL,
	is_expired BOOLEAN,
	created_by INT(11),
	created_at TIMESTAMP NOT NULL,
	updated_by INT(11),
	updated_at TIMESTAMP DEFAULT NULL,
	deleted_by INT(11),
	deleted_at TIMESTAMP DEFAULT NULL,
	status TINYINT,
	FOREIGN KEY (product_plan_id) REFERENCES tbl_product_plans(id),
	FOREIGN KEY (created_by) REFERENCES tbl_users(id),
	FOREIGN KEY (updated_by) REFERENCES tbl_users(id),
	FOREIGN KEY (deleted_by) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS lutbl_activity_types (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	description VARCHAR(1000) DEFAULT NULL
);

SET FOREIGN_KEY_CHECKS = 1;