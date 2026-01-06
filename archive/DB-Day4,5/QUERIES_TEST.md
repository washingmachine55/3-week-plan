## 1. Total Loans per Bank
### Show each bank’s name along with the total number of loans issued under its products.

``` sql
SELECT COUNT(l.id) as total_loans, p.name as product_name,  b.name as bank_name 
FROM tbl_loans l
LEFT JOIN tbl_branches br ON l.main_branch_id = br.id
LEFT JOIN tbl_banks b ON br.bank_id = b.id
LEFT JOIN tbl_products p ON b.id = p.bank_id 
GROUP BY b.id, b.name, p.name
```

## 2. Total Loan Amount by Branch
### List all branches with the sum of loan amounts issued by each branch.

```sql

```