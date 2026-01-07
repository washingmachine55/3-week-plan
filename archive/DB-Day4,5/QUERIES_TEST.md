## 1. Total Loans per Bank
### Show each bank’s name along with the total number of loans issued under its products.

``` sql
SELECT b.name as bank_name, COUNT(l.id) as total_loans, COUNT(DISTINCT p.id) as total_products
FROM tbl_loans l
JOIN tbl_product_plans pl ON l.product_plan_id = pl.id
JOIN tbl_products p ON pl.product_id = p.id
JOIN tbl_branches br ON p.branch_id = br.id 
JOIN tbl_banks b ON br.bank_id = b.id
GROUP BY b.name, b.id;
```

## 2. Total Loan Amount by Branch
### List all branches with the sum of loan amounts issued by each branch.

```sql
SELECT SUM(l.amount) AS 'Total Loan Amount Issued', br.name AS 'Branch Name'
FROM tbl_loans l
JOIN tbl_product_plans pl ON l.product_plan_id = pl.id
JOIN tbl_products p ON pl.product_id = p.id
JOIN tbl_branches br ON p.branch_id = br.id
GROUP BY br.name, br.id;
```

## 3. Total branches per bank
### Show each bank’s name and how many branches it has

```sql
SELECT b.name as 'Bank Name', COUNT(br.id) AS 'Total Branches'
FROM tbl_branches br
JOIN tbl_banks b ON br.bank_id = b.id
GROUP BY b.name, b.id;
```

## 4. Total products per branch
### List each branch name with the total number of products it offers

```sql
SELECT br.name AS 'Branch Name', COUNT(p.name) AS 'Total Products'
FROM tbl_products p
JOIN tbl_branches br ON p.branch_id = br.id
GROUP BY br.name, br.id;
```

## 5. Total products per bank
### Show each bank’s name and the total number of products offered across all its branches.

```sql
SELECT b.name AS 'Bank Name', COUNT(p.name) AS 'Total Products'
FROM tbl_products p
JOIN tbl_branches br ON p.branch_id = br.id
JOIN tbl_banks b ON br.bank_id = b.id
GROUP BY b.name, b.id;
```

## 6. Total users in the system
### Show total number of users grouped by access_type

```sql
SELECT COUNT(u.id) AS 'Total Users',
	CASE
		WHEN u.access_type = 1 THEN 'Admin'
		WHEN u.access_type = 2 THEN 'Staff'
		WHEN u.access_type = 3 THEN 'Customer'
	END AS 'Access Type'
FROM tbl_users u
GROUP BY access_type 
```

## 7. Total product plans per product
### Show each product name and the number of plans available for it.

```sql
SELECT p.name AS 'Product Name', COUNT(pl.id) AS 'Number of Plans'
FROM tbl_products p
JOIN tbl_product_plans pl ON p.id = pl.product_id
GROUP BY p.name;
```

## 8. Total loans per product
### Show each product name and the total number of loans issued under it.

```sql
SELECT COUNT(l.id) AS 'Total Loans', p.name AS 'Product Name'
FROM tbl_loans l
JOIN tbl_product_plans pl ON l.product_plan_id = pl.id
JOIN tbl_products p ON pl.product_id = p.id
GROUP BY p.name;
```

## 9. Total loans per bank (including banks with zero loans)
### Show each bank and the total loans issued under it, including banks that have no loans.

```sql
SELECT COUNT(DISTINCT l.id) AS 'Total Loans', b.name AS 'Bank Name'
FROM tbl_loans l
RIGHT JOIN tbl_product_plans pl ON l.product_plan_id = pl.id
RIGHT JOIN tbl_products p ON pl.product_id = p.id
RIGHT JOIN tbl_branches br ON p.branch_id = br.id
RIGHT JOIN tbl_banks b ON br.bank_id = b.id
GROUP BY b.name, b.id;
```

## 10. Total loan amount per bank
### Show each bank’s name and the sum of loan amounts issued under it.

```sql
SELECT SUM(l.amount) AS 'Total Loan Amount Issued', b.name AS 'Bank Name'
FROM tbl_loans l
	JOIN tbl_product_plans pl ON l.product_plan_id = pl.id
	JOIN tbl_products p ON pl.product_id = p.id
	JOIN tbl_branches br ON p.branch_id = br.id
	JOIN tbl_banks b ON br.bank_id = b.id
GROUP BY b.name, b.id;
```

## 11. Total approved vs unapproved loans
### Show how many loans are approved vs not approved

```sql
SELECT COUNT(l.id) AS 'Total Loans',
	CASE
		WHEN l.approved = 1 THEN 'Approved'
		WHEN l.approved = 0 THEN 'Not Approved'
	END AS 'Approval Status' 
FROM tbl_loans l
GROUP BY l.approved;
```

## 12. Customers with total loan count
### Show each customer (username) and how many loans they have taken.

```sql
SELECT u.username AS 'Username', COUNT(l.id) AS 'Number of Loans taken'
FROM tbl_loans l
JOIN tbl_users u ON l.customer_id = u.id
GROUP BY u.username;
```

## 13. Loan count per bank per month
### Show bank name, month, and total number of loans issued in that month.

```sql
SELECT b.name AS 'Bank Name', COUNT(l.id) AS 'Total Loans', MONTHNAME(l.created_at) AS 'Month Name'
FROM tbl_loans l
JOIN tbl_product_plans pl ON l.product_plan_id = pl.id
JOIN tbl_products p ON pl.product_id = p.id
JOIN tbl_branches br ON p.branch_id = br.id
JOIN tbl_banks b ON br.bank_id = b.id
GROUP BY 'Month Name', b.name, b.id;
```

## 14. Top 3 banks by total loan amount
### Show the top 3 banks with the highest total loan amounts.

```sql
SELECT b.name AS 'Bank Name', SUM(l.amount) AS 'Total Loan Amount'
FROM tbl_loans l
JOIN tbl_product_plans pl ON l.product_plan_id = pl.id
JOIN tbl_products p ON pl.product_id = p.id
JOIN tbl_branches br ON p.branch_id = br.id
JOIN tbl_banks b ON br.bank_id = b.id
GROUP BY b.name, b.id
ORDER BY SUM(l.amount) DESC LIMIT 3;
```

## 15. Customers with loans but no transactions
### List customers who have loans but have never made a transaction.

```sql
SELECT u.username AS 'Username', COUNT(l.id) AS 'Loans'
FROM tbl_users u
JOIN tbl_loans l ON l.customer_id = u.id
WHERE u.id NOT IN (SELECT user_id FROM tbl_transactions)
GROUP BY l.id;
```

## 16. Most profitable product plan
### Find the product plan that generated the highest total repayments.

```sql
SELECT pl.name, SUM(t.amount)
FROM tbl_product_plans pl
JOIN tbl_loans l ON l.product_plan_id = pl.id
JOIN tbl_transactions t ON l.id = t.loan_id
GROUP BY pl.name
ORDER BY SUM(t.amount) DESC LIMIT 1;
```

## 17. Loan default risk report
### Show loans that are past due date, unpaid, and have penalties applied..

```sql
SELECT l.id, l.due_date, DATE(l.created_at),
	CASE 
		WHEN l.amount <= SUM(t.amount) THEN 'Paid' 
		ELSE 'Unpaid' 
	END AS 'Paid/Unpaid',
	CASE
		WHEN CURRENT_DATE() >= l.due_date THEN 'YES'
		ELSE 'NO'
	END AS 'Past due date?'
FROM tbl_loans l
JOIN tbl_transactions t ON l.id = t.loan_id
GROUP BY l.id;
```

## 18. Total Loan default risk report
### Per Bank, show a Total of loans that are past due date, unpaid, and have penalties applied.

```sql
SELECT b.name AS 'Bank Name', COUNT(DISTINCT l.id) AS 'Number of Loans',
CASE 
	WHEN l.amount < SUM(t.amount) THEN COUNT(DISTINCT l.id)
	ELSE 0
END AS 'Number of Paid Loans',
CASE 
	WHEN l.amount > SUM(t.amount) THEN COUNT(DISTINCT l.id) 
	ELSE 0
END AS 'Number of Unpaid Loans',
CASE
	WHEN CURRENT_DATE() >= l.due_date THEN 'YES'
	ELSE 'NO'
END AS 'Past due date?'
FROM tbl_loans l
JOIN tbl_transactions t ON l.id = t.loan_id
JOIN tbl_product_plans pl ON l.product_plan_id = pl.id
JOIN tbl_products p ON pl.product_id = p.id
JOIN tbl_branches br ON p.branch_id = br.id
JOIN tbl_banks b ON br.bank_id = b.id
GROUP BY b.name, b.id
```
