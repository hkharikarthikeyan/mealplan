#!/usr/bin/env python3
import os
import sys
from app import app

if __name__ == '__main__':
    # Set default environment variables if not present
    if not os.getenv('MONGODB_URI'):
        os.environ['MONGODB_URI'] = 'mongodb://localhost:27017/mealplan'
    
    if not os.getenv('JWT_SECRET'):
        os.environ['JWT_SECRET'] = 'dev-secret-key-change-in-production'
    
    if not os.getenv('SECRET_KEY'):
        os.environ['SECRET_KEY'] = 'dev-flask-secret-change-in-production'
    
    print("Starting Mealplan Backend Server...")
    print(f"MongoDB URI: {os.getenv('MONGODB_URI')}")
    print("Server running on http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)