import psycopg2
from dotenv import dotenv_values

config = dotenv_values(".env")

conn = psycopg2.connect(
    host=config["APP_HOST"],
    user=config["APP_USER"],
    password=config["APP_PASSWORD"],
    database=config["APP_DATABASE"]
)
cur = conn.cursor()

f = open("./IMS/ims-truncate-tables-postgre.sql")
file = f.read()

cur.execute(file)
conn.commit()

cur.close()
conn.close()

print("✅ Database truncated successfully")
