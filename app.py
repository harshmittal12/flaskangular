from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)

#MySQL Configuration
app.config['MYSQL_USER'] = 'sql12348539'
app.config['MYSQL_PASSWORD'] = 'mKRkbYT1Jf'
app.config['MYSQL_HOST'] = 'sql12.freemysqlhosting.net'
app.config['MYSQL_DB'] = 'sql12348539'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

CORS(app)

#API to get students by class
@app.route('/api/students', methods=['GET','POST'])
def get_students():
    class_name = request.get_json()['class']
    cur = mysql.connection.cursor()
    cur.execute("""SELECT * FROM students
                    WHERE class=%s)""",(class_name,))
    rv = cur.fetchall()
    return jsonify(rv)

#API to get all the attendance records
@app.route('/api/attendances', methods=['GET'])
def get_attendance():
    cur = mysql.connection.cursor()
    cur.execute("""SELECT * FROM student_attendance_map""")
    rv = cur.fetchall()
    return jsonify(rv)

#API to get attendance by date and class
@app.route('/api/attendances/by',methods=['POST'])
def get_attendance_class_date():
    if request.method == 'POST':
        date = request.form['date']
        class_name = request.form['class_name']
        cur = mysql.connection.cursor()
        cur.execute("""SELECT * FROM student_attendance_map
                       WHERE attendance_date=%s AND 
                       student_id=(SELECT student_id from students where class=%s)""",
                       (date,class_name))    
        rv = cur.fetchall()
        print(rv)
        return jsonify(rv)

#
@app.route('/api/attendance/new', methods=['POST'])
def add_attendance():

    cur = mysql.connection.cursor()

    name = request.form.get("student_name")
    date = request.form['attendance_date']
    status = request.form['status']
    updated_by = request.form['updated_by']

    name_words = name.split(' ')

    cur = mysql.connection.cursor()
    cur.execute("""SELECT * FROM students 
                    WHERE student_fname = %s AND student_lname = %s""",
                    (name_words[0], name_words[1]))

    student_data = cur.fetchall()

    student_id = student_data[0]['student_id']

    cur.execute("""INSERT INTO student_attendance_map 
                    (attendance_date, status, student_id, updated_by) 
                    VALUES (%s, %s, %s, %s)""",
                    (date, status, student_id, updated_by))
    mysql.connection.commit()
    cur.close()

    result = {'title': student_id}
    return jsonify({'result': result})




if __name__ == '__main__':
    app.run(debug=True)