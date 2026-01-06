# python -m venv venv
# source venv/activate.fish (for fish terminal)
# restart terminal
# pip install faker mysql-connector-python

import random
from faker import Faker
import mysql.connector
from datetime import timedelta

fake = Faker()

# ----------------------------
# DB CONFIG
# ----------------------------
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="testdb123",
    database="LMS"
)
cursor = conn.cursor()

# ----------------------------
# HELPERS
# ----------------------------
def execute(query, params=None):
    cursor.execute(query, params)
    conn.commit()
    return cursor.lastrowid


# ----------------------------
# DISABLE FK CHECKS
# ----------------------------
cursor.execute("SET FOREIGN_KEY_CHECKS = 0")

# ----------------------------
# ACTIVITY TYPES
# ----------------------------
activity_types = ['LOGIN', 'LOAN_CREATE', 'PAYMENT']
activity_type_ids = []

for name in activity_types:
    activity_type_ids.append(
        execute(
            "INSERT INTO lutbl_activity_types (name, description) VALUES (%s, %s)",
            (name, fake.sentence())
        )
    )

# ----------------------------
# ADDRESSES
# ----------------------------
address_ids = []
for _ in range(50):
    address_ids.append(
        execute(
            """
            INSERT INTO tbl_addresses
            (street_num, street_addr, city, region, zip_code, created_at, status)
            VALUES (%s,%s,%s,%s,%s,NOW(),1)
            """,
            (
                fake.building_number(),
                fake.street_name(),
                fake.city(),
                fake.state_abbr(),
                fake.postcode()[:5]
            )
        )
    )

# ----------------------------
# USERS
# ----------------------------
user_ids = []
for i in range(100):
    user_ids.append(
        execute(
            """
            INSERT INTO tbl_users
            (username, email, password_hash, access_type, updated_at, status)
            VALUES (%s,%s,%s,%s,NOW(),1)
            """,
            (
                fake.user_name() + str(i),
                fake.email(),
                fake.sha256(),
                random.choice([1, 2])
            )
        )
    )

admin_id = user_ids[0]

# ----------------------------
# USER DETAILS
# ----------------------------
for user_id in user_ids[1:]:
    execute(
        """
        INSERT INTO tbl_user_details
        (user_id, kyc_status, first_name, last_name, dob, phone_no, cnic,
        address_id, created_at, updated_at, status)
        VALUES (%s,1,%s,%s,%s,%s,%s,%s,NOW(),NOW(),1)
        """,
        (
            user_id,
            fake.first_name(),
            fake.last_name(),
            fake.date_of_birth(minimum_age=18, maximum_age=65),
            fake.msisdn()[:11],
            str(random.randint(10**12, 10**13-1)),
            random.choice(address_ids)
        )
    )

# ----------------------------
# BANKS
# ----------------------------
bank_ids = []
for _ in range(25):
    bank_ids.append(
        execute(
            "INSERT INTO tbl_banks (name) VALUES (%s)",
            (
                fake.company(),
            )
        )
    )

# ----------------------------
# BRANCHES
# ----------------------------
branch_ids = []
for bank_id in bank_ids:
    for _ in range(6):
        branch_ids.append(
            execute(
                """
                INSERT INTO tbl_branches
                (bank_id, name, code, address_id, is_main, main_email, main_phone)
                VALUES (%s,%s,%s,%s,%s,%s,%s)
                """,
                (
                    bank_id,
                    fake.city() + " Branch",
                    fake.lexify(text="????"),
                    random.choice(address_ids),
                    fake.boolean(chance_of_getting_true=15),
                    fake.company_email(),
                    fake.msisdn()[:11]
                )
            )
        )

# ----------------------------
# PRODUCTS
# ----------------------------
product_ids = []
for bank_id in bank_ids:
    for _ in range(7):
        product_ids.append(
            execute(
                """
                INSERT INTO tbl_products
                (name, description, bank_id, created_at, status)
                VALUES (%s,%s,%s,NOW(),1)
                """,
                (
                    fake.word().title() + " Loan",
                    fake.text(),
                    bank_id
                )
            )
        )

# ----------------------------
# PRODUCT PLANS
# ----------------------------
plan_ids = []
for product_id in product_ids:
    for _ in range(3):
        plan_ids.append(
            execute(
                """
                INSERT INTO tbl_product_plans
                (product_id, name, description, amount, plan_date, created_at, status)
                VALUES (%s,%s,%s,%s,%s,NOW(),1)
                """,
                (
                    product_id,
                    fake.word().title() + " Plan",
                    fake.text(),
                    random.randint(10000, 200000),
                    fake.future_date()
                )
            )
        )

# ----------------------------
# INTERNAL RULES
# ----------------------------
rule_ids = []
for _ in range(15):
    rule_ids.append(
        execute(
            """
            INSERT INTO tbl_internal_rules
            (name, description, created_at, status)
            VALUES (%s,%s,NOW(),1)
            """,
            (fake.word().title(), fake.text())
        )
    )

# ----------------------------
# LOANS
# ----------------------------
loan_ids = []
for _ in range(5600):
    loan_ids.append(
        execute(
            """
            INSERT INTO tbl_loans
            (product_plan_id, customer_id, rules_id, amount,
            approved, approved_by, due_date, interest_rate, created_at, status)
            VALUES (%s,%s,%s,%s,1,%s,%s,%s,NOW(),1)
            """,
            (
                random.choice(plan_ids),
                random.choice(user_ids[1:]),
                random.choice(rule_ids),
                random.randint(20000, 500000),
                admin_id,
                fake.future_date(),
                round(random.uniform(5.0, 20.0), 2)
            )
        )
    )

# ----------------------------
# TRANSACTIONS
# ----------------------------
for _ in range(11900):
    execute(
        """
        INSERT INTO tbl_transactions
        (product_plan_id, user_id, amount, repayment_type,
        transaction_date, method, status)
        VALUES (%s,%s,%s,%s,%s,%s,1)
        """,
        (
            random.choice(plan_ids),
            random.choice(user_ids[1:]),
            random.randint(1000, 20000),
            random.randint(1, 3),
            fake.date_this_year(),
            random.randint(1, 3)
        )
    )

# ----------------------------
# ACTIVITIES
# ----------------------------
for _ in range(300):
    execute(
        """
        INSERT INTO tbl_activities
        (actvity_type_id, description, created_by, created_at, updated_by, updated_at)
        VALUES (%s,%s,%s,NOW(),%s,NOW())
        """,
        (
            random.choice(activity_type_ids),
            fake.sentence(),
            random.choice(user_ids),
            random.choice(user_ids)
        )
    )

# ----------------------------
# RE-ENABLE FK CHECKS
# ----------------------------
cursor.execute("SET FOREIGN_KEY_CHECKS = 1")

cursor.close()
conn.close()

print("✅ Database successfully seeded with Faker data!")
