import os
import time
import psycopg2
from werkzeug.security import generate_password_hash

# Database connection details
DB_HOST = os.getenv('DB_HOST', 'db')
DB_NAME = os.getenv('DB_NAME', 'vastavik')
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASS = os.environ['DB_PASS']  # Required — no insecure default

# Default admin credentials — override via ADMIN_USERNAME / ADMIN_PASSWORD env vars
ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'pkoudi')
ADMIN_PASSWORD = os.environ['ADMIN_PASSWORD']  # Required — must be set before seeding


def insert_data():
    try:
        # Wait for the PostgreSQL server to be ready
        time.sleep(10)

        connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASS
        )
        cursor = connection.cursor()

        hashed_password = generate_password_hash(ADMIN_PASSWORD)
        cursor.execute(
            "INSERT INTO admin(admin_id, name, username, password, email, univ_id) VALUES (%s, %s, %s, %s, %s, %s) "
            "ON CONFLICT (admin_id) DO NOTHING;",
            ('15', 'Prashanthi', ADMIN_USERNAME, hashed_password, 'pkoudi@gmail.com', '1')
        )
        connection.commit()

        cursor.close()
        connection.close()
        print("Admin seed data inserted successfully.")
    except Exception as e:
        print(f"Error: {e}")
        raise


if __name__ == "__main__":
    insert_data()
