from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app=Flask(__name__)
CORS(app)

conn=mysql.connector.connect(host="localhost",user="root",password="1234",database="daily_cab_booking")
cursor=conn.cursor()

@app.route("/book_cab",methods=["POST"])
def book_cab():
 data=request.json
 cursor.execute("INSERT INTO cab_booking(customer_name,mobile,pickup_location,drop_location) VALUES(%s,%s,%s,%s)",
 (data["name"],data["mobile"],data["pickup"],data["drop"]))
 conn.commit()
 return jsonify({"status":"success"})

app.run(host="0.0.0.0",port=5000)