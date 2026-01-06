
ALTER TABLE tbl_banks
ADD FOREIGN KEY (main_branch_id) REFERENCES tbl_branches(id)

ALTER TABLE tbl_branches
ADD FOREIGN KEY (address_id) REFERENCES tbl_addresses(id)
ADD FOREIGN KEY (bank_id) REFERENCES tbl_banks(id)

ALTER TABLE tbl_products
ADD FOREIGN KEY (bank_id) REFERENCES tbl_banks(id)

ALTER TABLE tbl_product_plans,
ADD COLUMN product_id INT(11) AFTER id,
ADD FOREIGN KEY (product_id) REFERENCES tbl_products(id)

ALTER TABLE tbl_loans
ADD FOREIGN KEY (product_type_id) REFERENCES tbl_products(id),
ADD FOREIGN KEY (main_branch_id) REFERENCES tbl_branches(id),
ADD FOREIGN KEY (customer_id) REFERENCES tbl_users(id),
ADD FOREIGN KEY (rules_id) REFERENCES tbl_internal_rules(id),
ADD FOREIGN KEY (approved_by) REFERENCES tbl_users(id)

ALTER TABLE tbl_loan_penlties
ADD FOREIGN KEY (rules_id) REFERENCES tbl_internal_rules(id),
ADD FOREIGN KEY (loan_id) REFERENCES tbl_loans(id),
ADD FOREIGN KEY (created_by) REFERENCES tbl_users(id),
ADD FOREIGN KEY (updated_by) REFERENCES tbl_users(id),
ADD FOREIGN KEY (deleted_by) REFERENCES tbl_users(id)

ALTER TABLE tbl_auth_providers
ADD FOREIGN KEY (user_id) REFERENCES tbl_users(id)

ALTER TABLE tbl_users
ADD FOREIGN KEY (user_details_id) REFERENCES tbl_user_details(id)

ALTER TABLE tbl_user_details
ADD FOREIGN KEY (user_id) REFERENCES tbl_users(id),
ADD FOREIGN KEY (address_id) REFERENCES tbl_addresses(id)

ALTER TABLE tbl_activities
ADD FOREIGN KEY (actvity_type_id) REFERENCES lutbl_activitiy_types(id)
ADD FOREIGN KEY (created_by) REFERENCES tbl_users(id),
ADD FOREIGN KEY (updated_by) REFERENCES tbl_users(id),

ALTER TABLE tbl_addresses
ADD FOREIGN KEY (created_by) REFERENCES tbl_users(id),
ADD FOREIGN KEY (updated_by) REFERENCES tbl_users(id),
ADD FOREIGN KEY (deleted_by) REFERENCES tbl_users(id)

ALTER TABLE tbl_transactions
ADD FOREIGN KEY (product_plan_id) REFERENCES tbl_product_plans(id)

ALTER TABLE tbl_discounts
ADD FOREIGN KEY (product_plan_id) REFERENCES tbl_product_plans(id),
ADD FOREIGN KEY (created_by) REFERENCES tbl_users(id),
ADD FOREIGN KEY (updated_by) REFERENCES tbl_users(id),
ADD FOREIGN KEY (deleted_by) REFERENCES tbl_users(id)