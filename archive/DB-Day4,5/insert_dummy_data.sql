INSERT INTO lutbl_activity_types (name, description) VALUES
('LOGIN', 'User login'),
('LOAN_CREATE', 'Loan created'),
('PAYMENT', 'Payment made');

INSERT INTO tbl_addresses
(street_num, street_addr, city, region, zip_code, created_at, status)
VALUES
('12', 'Main Street', 'Karachi', 'Sindh', '75500', NOW(), 1),
('45', 'Bank Road', 'Lahore', 'Punjab', '54000', NOW(), 1);

INSERT INTO tbl_users
(username, email, password_hash, access_type, updated_at, status)
VALUES
('admin', 'admin@test.com', 'hash123', 1, NOW(), 1),
('customer1', 'cust1@test.com', 'hash456', 2, NOW(), 1);

INSERT INTO tbl_user_details
(user_id, kyc_status, first_name, last_name, dob, phone_no, cnic,
 address_id, created_at, updated_at, status)
VALUES
(2, 1, 'Ali', 'Khan', '1995-05-01', '03001234567', '1234512345123', 1, NOW(), NOW(), 1);

INSERT INTO tbl_banks (name) VALUES
('National Bank');

INSERT INTO tbl_branches
(bank_id, name, code, address_id, main_email, main_phone)
VALUES
(1, 'Main Branch', '0001', 2, 'main@bank.com', '0421234567');

INSERT INTO tbl_products
(name, description, bank_id, created_at, status)
VALUES
('Personal Loan', 'Personal loan product', 1, NOW(), 1);

INSERT INTO tbl_product_plans
(product_id, name, description, amount, plan_date, created_at, status)
VALUES
(1, 'Standard Plan', 'Monthly plan', 50000.00, '2026-01-01', NOW(), 1);

INSERT INTO tbl_internal_rules
(name, description, created_at, status)
VALUES
('Late Fee Rule', 'Penalty after due date', NOW(), 1);

INSERT INTO tbl_loans
(product_type_id, main_branch_id, customer_id, rules_id, amount,
 approved, approved_by, due_date, interest_rate, created_at, status)
VALUES
(1, 1, 2, 1, 50000.00, TRUE, 1, '2026-12-31', 12.5, NOW(), 1);

INSERT INTO tbl_loan_penlties
(rules_id, loan_id, amount, updated_at, status)
VALUES
(1, 1, 500.00, NOW(), 1);

INSERT INTO tbl_auth_providers
(user_id, provider_type, provider_id, access_token, created_at)
VALUES
(2, 'LOCAL', 'cust1', 'token123', NOW());

INSERT INTO tbl_activities
(actvity_type_id, description, created_by, created_at, updated_by, updated_at)
VALUES
(1, 'User logged in', 2, NOW(), 2, NOW());

INSERT INTO tbl_transactions
(product_plan_id, user_id, amount, repayment_type, transaction_date, method, status)
VALUES
(1, 2, 5000.00, 1, CURDATE(), 1, 1);

INSERT INTO tbl_discounts
(name, product_plan_id, amount, expiration_date, is_expired,
 created_by, created_at, status)
VALUES
('New Year Discount', 1, 1000.00, '2026-01-31', FALSE, 1, NOW(), 1);
