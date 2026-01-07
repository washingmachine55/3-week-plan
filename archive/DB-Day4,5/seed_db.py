# python -m venv venv
# source venv/activate.fish (for fish terminal)
# restart terminal
# pip install faker mysql-connector-python

import random
from faker import Faker
import mysql.connector
from dotenv import dotenv_values
from datetime import timedelta

fake = Faker()
config = dotenv_values('../../.env')

# ----------------------------
# DB CONFIG
# ----------------------------
conn = mysql.connector.connect(
    host=config['APP_HOST'],
    user=config['APP_USER'],
    password=config['APP_PASSWORD'],
    database=config['APP_DATABASE']
)
cursor = conn.cursor(buffered=True)

def execute(query, params=None):
    cursor.execute(query, params)
    conn.commit()
    return cursor.lastrowid

cursor.execute("SET FOREIGN_KEY_CHECKS = 0")

# ----------------------------
# CONSTANTS
# ----------------------------
ACCESS_ADMIN = 1
ACCESS_STAFF = 2
ACCESS_CUSTOMER = 3

# ----------------------------
# ACTIVITY TYPES
# ----------------------------
activity_type_ids = {}
for name in ['LOGIN', 'LOAN_CREATE', 'PAYMENT']:
    activity_type_ids[name] = execute(
        "INSERT INTO lutbl_activity_types (name, description) VALUES (%s,%s)",
        (name, fake.sentence())
    )

# ----------------------------
# USERS
# ----------------------------
user_ids = []
admins, staff, customers = [], [], []

TOTAL_USERS = 100
for i in range(TOTAL_USERS):
    if i < 5:
        access = ACCESS_ADMIN
    elif i < 15:
        access = ACCESS_STAFF
    else:
        access = ACCESS_CUSTOMER

    uid = execute(
        """
        INSERT INTO tbl_users
        (username,email,password_hash,access_type,created_at,created_by,status)
        VALUES (%s,%s,%s,%s,NOW(),NULL,1)
        """,
        (
            fake.user_name() + str(i),
            fake.unique.email(),
            fake.sha256(),
            access
        )
    )
    user_ids.append(uid)

    if access == ACCESS_ADMIN:
        admins.append(uid)
    elif access == ACCESS_STAFF:
        staff.append(uid)
    else:
        customers.append(uid)

# ----------------------------
# ADDRESSES
# ----------------------------
address_ids = []
for _ in range(60):
    address_ids.append(
        execute(
            """
            INSERT INTO tbl_addresses
            (street_num,street_addr,city,region,zip_code,created_at,created_by,status)
            VALUES (%s,%s,%s,%s,%s,NOW(),%s,1)
            """,
            (
                fake.building_number(),
                fake.street_name(),
                fake.city(),
                fake.state_abbr(),
                fake.postcode()[:5],
                random.choice(admins + staff)
            )
        )
    )

# ----------------------------
# USER DETAILS
# ----------------------------
for user_id in customers:
    execute(
        """
        INSERT INTO tbl_user_details
        (user_id,kyc_status,first_name,last_name,dob,phone_no,cnic,
        address_id,created_at,created_by,status)
        VALUES (%s,1,%s,%s,%s,%s,%s,%s,NOW(),%s,1)
        """,
        (
            user_id,
            fake.first_name(),
            fake.last_name(),
            fake.date_of_birth(minimum_age=18, maximum_age=65),
            fake.msisdn()[:11],
            str(random.randint(10**12, 10**13 - 1)),
            random.choice(address_ids),
            user_id
        )
    )

# ----------------------------
# BANKS
# ----------------------------
bank_ids = []
for _ in range(10):
    bank_ids.append(
        execute(
            "INSERT INTO tbl_banks (name) VALUES (%s)",
            (fake.company(),)
        )
    )

# ----------------------------
# BRANCHES (1 MAIN PER BANK)
# ----------------------------
branch_ids = []
for bank_id in bank_ids:
    main_branch_index = random.randint(0, 4)
    for i in range(5):
        branch_ids.append(
            execute(
                """
                INSERT INTO tbl_branches
                (bank_id,name,code,address_id,is_main,main_email,main_phone)
                VALUES (%s,%s,%s,%s,%s,%s,%s)
                """,
                (
                    bank_id,
                    fake.city() + " Branch",
                    fake.lexify("????"),
                    random.choice(address_ids),
                    i == main_branch_index,
                    fake.unique.company_email(),
                    fake.msisdn()[:11]
                )
            )
        )

# ----------------------------
# PRODUCTS
# ----------------------------
PRODUCT_NAMES = ["Personal Loan", "Auto Loan", "Home Loan", "Education Loan"]
product_ids = []

for branch_id in branch_ids:
    for name in PRODUCT_NAMES:
        product_ids.append(
            execute(
                """
                INSERT INTO tbl_products
                (name,description,branch_id,created_at,created_by,status)
                VALUES (%s,%s,%s,NOW(),%s,1)
                """,
                (
                    name,
                    fake.text(200),
                    branch_id,
                    random.choice(admins + staff)
                )
            )
        )

# ----------------------------
# PRODUCT PLANS
# ----------------------------
plan_ids = {}
for product_id in product_ids:
    plan_ids[product_id] = []
    for amount in [25000, 50000, 100000, 200000]:
        pid = execute(
            """
            INSERT INTO tbl_product_plans
            (product_id,name,description,amount,plan_date,created_at,created_by,status)
            VALUES (%s,%s,%s,%s,%s,NOW(),%s,1)
            """,
            (
                product_id,
                f"{amount} PKR Plan",
                fake.text(150),
                amount,
                fake.future_date(),
                random.choice(admins + staff)
            )
        )
        plan_ids[product_id].append(pid)

# ----------------------------
# INTERNAL RULES
# ----------------------------
rule_ids = []
for name in ["Late Payment", "Missed EMI", "Early Settlement"]:
    rule_ids.append(
        execute(
            """
            INSERT INTO tbl_internal_rules
            (name,description,created_at,created_by,status)
            VALUES (%s,%s,NOW(),%s,1)
            """,
            (name, fake.text(150), random.choice(admins))
        )
    )

# ----------------------------
# LOANS (5–10% OF CUSTOMERS)
# ----------------------------
loan_ids = []
borrowers = random.sample(customers, int(len(customers) * 0.35))

for customer_id in borrowers:
    product_id = random.choice(product_ids)
    plan_id = random.choice(plan_ids[product_id])

    # plan_amount = cursor.execute(
    #     "SELECT amount FROM tbl_product_plans WHERE id=%s", (plan_id,)
    # )

    approved = random.random() < 0.75

    loan_ids.append(
        execute(
            """
            INSERT INTO tbl_loans
            (product_plan_id,customer_id,rules_id,amount,approved,
            approved_by,due_date,interest_rate,created_at,created_by,status)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,NOW(),%s,1)
            """,
            (
                plan_id,
                customer_id,
                random.choice(rule_ids),
                random.randint(10000, 200000),
                approved,
                random.choice(admins + staff) if approved else None,
                fake.future_date(),
                round(random.uniform(8.0, 18.0), 2),
                customer_id
            )
        )
    )

# ----------------------------
# TRANSACTIONS (ONLY APPROVED LOANS)
# ----------------------------
for loan_id in loan_ids:
    cursor.execute("SELECT approved, amount, customer_id, created_at FROM tbl_loans WHERE id=%s", (loan_id,))
    approved, loan_amount, user_id, created_at = cursor.fetchone()
    # approved, loan_amount, user_id, created_at = row
    # row = cursor.fetchone()
    # cursor.fetchall()


    if not approved:
        continue

    remaining = loan_amount
    for _ in range(random.choices([1, 2, 3], weights=[60, 30, 10])[0]):
        payment = min(remaining, random.randint(2000, 10000))
        remaining -= payment

        execute(
            """
            INSERT INTO tbl_transactions
            (loan_id,user_id,amount,repayment_type,transaction_date,method,is_verified,status)
            VALUES (%s,%s,%s,1,%s,1,1,1)
            """,
            (
                loan_id,
                user_id,
                payment,
                fake.date_between(start_date=created_at.date(), end_date='today')
            )
        )

# ----------------------------
# ACTIVITIES (CAUSAL)
# ----------------------------
for loan_id in loan_ids:
    execute(
        """
        INSERT INTO tbl_activities
        (activity_type_id,description,created_by,created_at)
        VALUES (%s,%s,%s,NOW())
        """,
        (
            activity_type_ids['LOAN_CREATE'],
            "Loan created",
            random.choice(admins + staff)
        )
    )

cursor.execute("SET FOREIGN_KEY_CHECKS = 1")
cursor.close()
conn.close()

print("✅ Realistic database seeded successfully.")