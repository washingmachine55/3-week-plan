# python -m venv venv
# source venv/activate.fish (for fish terminal)
# restart terminal
# pip install faker psycopg2-binary python-dotenv
import random
from faker import Faker
import psycopg2
from dotenv import dotenv_values
from datetime import date, timedelta

fake = Faker()
# config = dotenv_values("../.env")
config = dotenv_values(".env")

conn = psycopg2.connect(
    host=config["APP_HOST"],
    user=config["APP_USER"],
    password=config["APP_PASSWORD"],
    database=config["APP_DATABASE"]
)
cur = conn.cursor()

def q(sql, params=None, fetch=False):
    cur.execute(sql, params)
    conn.commit()
    if fetch:
        return cur.fetchone()[0]

cur.execute("SET session_replication_role = replica;")

# ------------------------------------------------
# CONSTANTS
# ------------------------------------------------
STORES = 5
CUSTOMERS = 40
PRODUCTS = 500
SALES_PER_STORE = (80, 200)
RETURN_RATE = 0.08

# ------------------------------------------------
# ROLES & PERMISSIONS
# ------------------------------------------------
roles = {}
for r in ["Admin", "Manager", "Cashier"]:
    roles[r] = q(
        "INSERT INTO roles (name) VALUES (%s) RETURNING id",
            (r,), True
    )

permissions = {}
for p in ["SELL", "REFUND", "MANAGE_INVENTORY", "MANAGE_EMPLOYEES"]:
    permissions[p] = q(
        "INSERT INTO permissions (name) VALUES (%s) RETURNING id",
            (p,), True
    )

role_permissions = {
    "Admin": list(permissions.values()),
    "Manager": [
        permissions["SELL"],
        permissions["REFUND"],
        permissions["MANAGE_INVENTORY"]
    ],
    "Cashier": [
        permissions["SELL"]
    ]
}

for role_name, perm_ids in role_permissions.items():
    for perm_id in perm_ids:
        q(
            "INSERT INTO roles_permissions (roles_id, permissions_id) VALUES (%s,%s)",
            (roles[role_name], perm_id)
        )

# ------------------------------------------------
# CATEGORIES (WITH TREE)
# ------------------------------------------------
category_ids = []
for name in ["Electronics", "Clothing", "Home", "Groceries"]:
    cid = q("INSERT INTO categories (name) VALUES (%s) RETURNING id", (name,), True)
    category_ids.append(cid)
    q("INSERT INTO categories_treepaths VALUES (%s,%s)", (cid, cid))

# ------------------------------------------------
# ADDRESSES & STORES
# ------------------------------------------------
store_ids = []


for _ in range(STORES):
    OPTIONAL_STREET_NAME_2 = [fake.address(), None]
    addr = q("""
        INSERT INTO addresses
        (street_num, street_name, street_name_2, postal_zip, city, region)
        VALUES (%s,%s,%s,%s,%s,%s) RETURNING id
    """, (
        fake.building_number(),
        fake.street_name(),
        random.choice(OPTIONAL_STREET_NAME_2),
        fake.postcode()[:5],
        fake.city(),
        fake.state()
    ), True)

    store_ids.append(
        q("INSERT INTO stores (addresses_id,name) VALUES (%s,%s) RETURNING id",
        (addr,fake.company()), True)
    )

for store in store_ids:
    if random.random() < 0.3:  # 30% of stores
        q("""
            INSERT INTO stores_renovations
            (stores_id, date, is_closed)
            VALUES (%s,%s,%s)
        """, (
            store,
            fake.date_between(start_date="-2y", end_date="+3m"),
            random.choice([True, False])
        ))

# ------------------------------------------------
# EMPLOYEES
# ------------------------------------------------
employee_ids = []

for store in store_ids:
    for _ in range(random.randint(6, 12)):
        eid = q("""
            INSERT INTO employees (name, date_hire)
            VALUES (%s,%s) RETURNING id
        """, (
            fake.name(),
            fake.date_between(start_date="-5y", end_date="-1m")
        ), True)

        employee_ids.append(eid)

        q("""
            INSERT INTO employees_roles
            (store_id, employee_id, role_id)
            VALUES (%s,%s,%s)
        """, (
            store,
            eid,
            random.choice(list(roles.values()))
        ))

# ------------------------------------------------
# CUSTOMERS
# ------------------------------------------------
customer_ids = []
for _ in range(CUSTOMERS):
    customer_ids.append(
        q("""
            INSERT INTO customers
            (id, first_name, last_name, email, status)
            VALUES (uuidv7(),%s,%s,%s,1) RETURNING id
        """, (
            fake.first_name(),
            fake.last_name(),
            fake.unique.email()
        ), True)
    )

# ------------------------------------------------
# PRODUCTS & PRICES
# ------------------------------------------------
product_ids = []
price_ids = {}

PRODUCT_TYPES = [' XS', ' S', ' M', ' L', ' XL', ' XXL', ' Luxury', ' Common', ' Limited Edition', ' Collectors Edition']
BASE_START_DATE = date.today() - timedelta(days=900)  # ~2.5 years ago

for _ in range(PRODUCTS):
    status = random.choices([1, 2], weights=[88, 12])[0]
    archived_at = None

    if status == 2:
        archived_at = fake.date_between(
            start_date=BASE_START_DATE,
            end_date=date.today() - timedelta(days=60)
        )

    pid = q("""
        INSERT INTO products
        (sku, name, description, status, archived_at, created_at)
        VALUES (%s,%s,%s,%s,%s,%s) RETURNING id
    """, (
        fake.unique.bothify("SKU-####"),
        fake.domain_word().title() + random.choice(PRODUCT_TYPES),
        fake.sentence(),
        status,
        archived_at,
        fake.date_between(BASE_START_DATE, date.today())
    ), True)

    product_ids.append(pid)

    q(
        "INSERT INTO products_categories VALUES (%s,%s)",
        (pid, random.choice(category_ids))
    )

    # -------------------------------
    # PRICE HISTORY
    # -------------------------------
    price_ids[pid] = []

    base_cost = round(random.uniform(5, 60), 2)
    base_retail = round(base_cost * random.uniform(1.4, 2.2), 2)

    price_changes = random.choices(
        [1, 2, 3, 4],
        weights=[55, 25, 15, 5]
    )[0]

    change_dates = sorted([
        fake.date_between(
            start_date=BASE_START_DATE,
            end_date=date.today()
        )
        for _ in range(price_changes)
    ])

    last_cost = base_cost
    last_retail = base_retail

    for change_date in change_dates:
        # Cost changes less aggressively
        if random.random() < 0.4:
            last_cost = round(
                last_cost * random.uniform(0.95, 1.12),
                2
            )

        # Retail price reacts more often
        last_retail = round(
            max(last_cost * 1.2, last_retail * random.uniform(0.97, 1.15)),
            2
        )

        price_id = q("""
            INSERT INTO products_prices
            (products_id, cost_price, date_cost_price,
            retail_price, date_retail_price)
            VALUES (%s,%s,%s,%s,%s)
            RETURNING id
        """, (
            pid,
            last_cost,
            change_date,
            last_retail,
            change_date
        ), True)

        price_ids[pid].append(price_id)
# for _ in range(PRODUCTS):
    pid = q("""
        INSERT INTO products
        (sku, name, description, status)
        VALUES (%s,%s,%s,1) RETURNING id
    """, (
        fake.unique.bothify("SKU-####"),
        fake.domain_word().title() + random.choice(PRODUCT_TYPES),
        fake.sentence()
    ), True)

    product_ids.append(pid)

    q("INSERT INTO products_categories VALUES (%s,%s)",
    (pid, random.choice(category_ids)))

    price_ids[pid] = q("""
        INSERT INTO products_prices
        (products_id, cost_price, date_cost_price, retail_price, date_retail_price)
        VALUES (%s,%s,%s,%s,%s) RETURNING id
    """, (
        pid,
        round(random.uniform(5, 50), 2),
        date.today() - timedelta(days=90),
        round(random.uniform(10, 100), 2),
        date.today() - timedelta(days=30)
    ), True)

# ------------------------------------------------
# SALES, RETURNS & INVENTORY
# ------------------------------------------------
sale_ids = []

for store in store_ids:
    for _ in range(random.randint(*SALES_PER_STORE)):
        sale_date = fake.date_between(
            start_date=BASE_START_DATE,
            end_date=date.today()
        )
        sid = q("""
            INSERT INTO sales
            (stores_id, employees_id, customers_id, total)
            VALUES (%s,%s,%s,0) RETURNING id
        """, (
            store,
            random.choice(employee_ids),
            random.choice(customer_ids + [None])
        ), True)

        sale_total = 0
        for _ in range(random.randint(1, 5)):
            product = random.choice(product_ids)
            # price_id = price_ids[product]
            cur.execute("""
                SELECT id
                FROM products_prices
                WHERE products_id = %s
                AND date_retail_price <= %s
                ORDER BY date_retail_price DESC
                LIMIT 1
            """, (product, sale_date))

            row = cur.fetchone()

            # Safety fallback (should almost never happen)
            if row is None:
                cur.execute("""
                    SELECT id
                    FROM products_prices
                    WHERE products_id = %s
                    ORDER BY date_retail_price ASC
                    LIMIT 1
                """, (product,))
                price_id = cur.fetchone()[0]
            else:
                price_id = row[0]

            q("INSERT INTO products_sales (sales_id, products_price_id) VALUES (%s,%s)",
            (sid, price_id))

            sale_total += random.uniform(10, 100)

            q("""
                INSERT INTO inventories_transactions
                (stores_id, products_id, sales_id, qty_change, employees_id)
                VALUES (%s,%s,%s,false,%s)
            """, (
                store,
                product,
                sid,
                random.choice(employee_ids)
            ))

        q("UPDATE sales SET total=%s WHERE id=%s", (round(sale_total, 2), sid))
        sale_ids.append(sid)

        # RETURNS
        if random.random() < RETURN_RATE:
            rid = q("""
                INSERT INTO returns (stores_id, sales_id)
                VALUES (%s,%s) RETURNING id
            """, (store, sid), True)

            product = random.choice(product_ids)
            q("""
                INSERT INTO returns_products
                (returns_id, products_price_id)
                VALUES (%s,%s)
            """, (rid, price_id))

            q("""
                INSERT INTO inventories_transactions
                (stores_id, products_id, returns_id, qty_change, employees_id)
                VALUES (%s,%s,%s,true,%s)
            """, (
                store,
                product,
                rid,
                random.choice(employee_ids)
            ))

cur.execute("SET session_replication_role = origin;")
cur.close()
conn.close()

print("✅ Retail database seeded successfully")
