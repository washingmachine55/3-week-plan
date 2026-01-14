import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from dotenv import dotenv_values

config = dotenv_values(".env")

conn = psycopg2.connect(
    host=config["APP_HOST"],
    user=config["APP_USER"],
    password=config["APP_PASSWORD"],
    database=config["APP_DATABASE"]
)
cur = conn.cursor()
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
conn.autocommit = True


f = open("./IMS/ims-create-tables-postgre.sql")
file = f.read()

cur.execute(file)
conn.commit()

cur.close()
conn.close()

print("✅ Database migration ran successfully")