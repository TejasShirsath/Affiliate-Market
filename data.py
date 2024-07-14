from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database connection
servername = "localhost"
username = "root"
password = ""
dbname = "doremonpocket"

def fetch_data(cursor, table, columns):
    cursor.execute(f"SELECT {', '.join(columns)} FROM {table}")
    rows = cursor.fetchall()
    return [dict(zip(columns, row)) for row in rows]

@app.route('/data', methods=['GET'])
def get_all_data():
    conn = mysql.connector.connect(
        host=servername,
        user=username,
        password=password,
        database=dbname
    )

    cursor = conn.cursor()

    # Define columns to fetch
    product_columns = ["id", "productTitle", "productImg1", "productVideo"]
    featured_columns = ["id", "productTitle", "productImg1", "productVideo"]

    # Fetch data from tables
    products = fetch_data(cursor, "productsTable", product_columns)
    featured_products = fetch_data(cursor, "featuredProducts", featured_columns)

    cursor.close()
    conn.close()

    data = {
        'products': products,
        'featuredProducts': featured_products
    }

    return jsonify(data)

@app.route('/product', methods=['GET'])
def get_product():
    product_id = request.args.get('id')

    if not product_id:
        return jsonify({"error": "No product id provided"}), 400

    conn = mysql.connector.connect(
        host=servername,
        user=username,
        password=password,
        database=dbname
    )

    cursor = conn.cursor(dictionary=True)

    sql = "SELECT * FROM productsTable WHERE id = %s"
    cursor.execute(sql, (product_id,))
    row = cursor.fetchone()

    data = {}

    if row:
        data = {
            'productTitle': row['productTitle'],
            'productDescription': row['productDescription'],
            'productImg1': row['productImg1'],
            'productImg2': row['productImg2'],
            'productImg3': row['productImg3'],
            'productImg4': row['productImg4'],
            'productImg5': row['productImg5'],
            'productAmazonLink': row['productAmazonLink'],
            'productFlipkartLink': row['productFlipkartLink'],
            'productEbayLink': row['productEbayLink'],
            'productSnapdealLink': row['productSnapdealLink']
        }

    cursor.close()
    conn.close()

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
