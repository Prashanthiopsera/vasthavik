import os
import time
import psycopg2

# Database connection details
DB_HOST = os.getenv('DB_HOST', 'db')
DB_NAME = os.getenv('DB_NAME', 'vastavik')
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASS = os.getenv('DB_PASS', 'pgadmin')

def insert_data():
    try:
        # Wait for the PostgreSQL server to be ready
        time.sleep(10)  # Adjust this as necessary

        connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASS
        )
        cursor = connection.cursor()

        # Insert data
        cursor.execute("INSERT INTO admin(admin_id, name, username, password, email, univ_id) VALUES (%s, %s, %s, %s, %s, %s);", ('15', 'Prashanthi', 'pkoudi', 'pkoudi1', 'pkoudi@gmail.com', '1'))
        connection.commit()

        cursor.close()
        connection.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    insert_data()
