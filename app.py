from flask import Flask, render_template, jsonify, request, send_from_directory
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('applications.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company TEXT NOT NULL,
            position TEXT NOT NULL,
            status TEXT NOT NULL,
            date_applied TEXT NOT NULL,
            last_updated TEXT NOT NULL,
            notes TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

@app.route('/')
def index():
    return send_from_directory('src', 'index.html')

@app.route('/api/applications', methods=['GET'])
def get_applications():
    conn = sqlite3.connect('applications.db')
    c = conn.cursor()
    c.execute('SELECT * FROM applications ORDER BY date_applied DESC')
    applications = [{
        'id': row[0],
        'company': row[1],
        'position': row[2],
        'status': row[3],
        'date_applied': row[4],
        'last_updated': row[5],
        'notes': row[6]
    } for row in c.fetchall()]
    conn.close()
    return jsonify(applications)

@app.route('/api/applications', methods=['POST'])
def add_application():
    data = request.json
    conn = sqlite3.connect('applications.db')
    c = conn.cursor()
    current_time = datetime.now().isoformat()
    c.execute('''
        INSERT INTO applications (company, position, status, date_applied, last_updated, notes)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (data['company'], data['position'], data['status'], current_time, current_time, data.get('notes', '')))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})

@app.route('/api/applications/<int:app_id>', methods=['PUT'])
def update_application(app_id):
    data = request.json
    conn = sqlite3.connect('applications.db')
    c = conn.cursor()
    current_time = datetime.now().isoformat()
    c.execute('''
        UPDATE applications 
        SET company = ?, position = ?, status = ?, last_updated = ?, notes = ?
        WHERE id = ?
    ''', (data['company'], data['position'], data['status'], current_time, data.get('notes', ''), app_id))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})

@app.route('/api/applications/<int:app_id>', methods=['DELETE'])
def delete_application(app_id):
    conn = sqlite3.connect('applications.db')
    c = conn.cursor()
    c.execute('DELETE FROM applications WHERE id = ?', (app_id,))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True) 