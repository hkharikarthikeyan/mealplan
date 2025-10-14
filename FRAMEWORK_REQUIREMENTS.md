# 🛠️ FreshPlate Framework Requirements Documentation

## 📋 COMPLETE FRAMEWORK STACK

### 🎯 FRONTEND FRAMEWORKS & LIBRARIES

#### Core React Framework:
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0"
}
```

#### TypeScript Support:
```json
{
  "@types/react": "^18.0.27",
  "@types/react-dom": "^18.0.10",
  "typescript": "^4.9.4"
}
```

#### UI Framework & Styling:
```json
{
  "tailwindcss": "^3.2.0",
  "@tailwindcss/forms": "^0.5.3",
  "autoprefixer": "^10.4.13",
  "postcss": "^8.4.21",
  "clsx": "^1.2.1",
  "class-variance-authority": "^0.4.0"
}
```

#### UI Components (shadcn/ui):
```json
{
  "@radix-ui/react-dialog": "^1.0.3",
  "@radix-ui/react-dropdown-menu": "^2.0.4",
  "@radix-ui/react-label": "^2.0.1",
  "@radix-ui/react-select": "^1.2.1",
  "@radix-ui/react-tabs": "^1.0.3",
  "@radix-ui/react-toast": "^1.1.3",
  "@radix-ui/react-checkbox": "^1.0.3",
  "lucide-react": "^0.263.1"
}
```

#### Animations & Visual Effects:
```json
{
  "lottie-react": "^2.4.0",
  "framer-motion": "^10.12.0"
}
```

#### State Management & Context:
```json
{
  "zustand": "^4.3.6",
  "@tanstack/react-query": "^4.28.0"
}
```

#### Form Handling & Validation:
```json
{
  "react-hook-form": "^7.43.9",
  "zod": "^3.21.4",
  "@hookform/resolvers": "^3.1.0"
}
```

#### Notifications & Toast:
```json
{
  "sonner": "^0.6.2",
  "react-hot-toast": "^2.4.1"
}
```

#### Build Tools (Vite):
```json
{
  "vite": "^4.2.0",
  "@vitejs/plugin-react": "^3.1.0",
  "vite-tsconfig-paths": "^4.0.7"
}
```

### 🔧 BACKEND FRAMEWORKS & LIBRARIES

#### Core Python Framework:
```python
Flask==2.3.3              # Web framework
Werkzeug==2.3.6           # WSGI utility library
Jinja2==3.1.2             # Template engine
```

#### Database & ODM:
```python
pymongo==4.5.0            # MongoDB driver
motor==3.3.1              # Async MongoDB driver (future)
mongoengine==0.27.0       # MongoDB ODM (alternative)
```

#### Authentication & Security:
```python
PyJWT==2.8.0              # JSON Web Tokens
bcrypt==4.0.1             # Password hashing
cryptography==41.0.4      # Cryptographic recipes
passlib==1.7.4            # Password hashing utilities
```

#### API & CORS:
```python
Flask-CORS==4.0.0         # Cross-Origin Resource Sharing
Flask-RESTful==0.3.10     # REST API framework
marshmallow==3.20.1       # Serialization/deserialization
```

#### Rate Limiting & Security:
```python
Flask-Limiter==3.5.0      # Rate limiting
Flask-Talisman==1.1.0     # Security headers
itsdangerous==2.1.2       # Secure data serialization
```

#### Environment & Configuration:
```python
python-dotenv==1.0.0      # Environment variables
click==8.1.7              # Command line interface
```

#### Date & Time:
```python
python-dateutil==2.8.2    # Date utilities
pytz==2023.3              # Timezone handling
```

#### HTTP & Requests:
```python
requests==2.31.0          # HTTP library
urllib3==2.0.4            # HTTP client
```

#### Development & Testing:
```python
pytest==7.4.2            # Testing framework
pytest-flask==1.2.0      # Flask testing utilities
pytest-cov==4.1.0        # Coverage reporting
black==23.7.0             # Code formatter
flake8==6.0.0             # Linting
```

### 🗄️ DATABASE REQUIREMENTS

#### MongoDB Setup:
```bash
# Local MongoDB Installation
# Windows: Download MongoDB Community Server
# macOS: brew install mongodb-community
# Linux: apt-get install mongodb

# MongoDB Compass (GUI)
# Download from: https://www.mongodb.com/products/compass
```

#### MongoDB Atlas (Cloud):
```python
# Connection String Format:
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database"

# Required Collections:
- users
- recipes  
- clients
- meals (future)
- shopping_lists (future)
- public_recipes (future)
```

### 🎨 ANIMATION & MEDIA FRAMEWORKS

#### Lottie Animations:
```json
{
  "lottie-react": "^2.4.0",
  "@lottiefiles/react-lottie-player": "^3.5.3"
}
```

#### Animation Files Required:
```
- Cooking.json (Recipe page animation)
- Inventory.json (Shopping page animation)  
- USA confetti.json (Success celebrations)
```

#### Icon Libraries:
```json
{
  "lucide-react": "^0.263.1",
  "@heroicons/react": "^2.0.18",
  "react-icons": "^4.8.0"
}
```

### 📱 RESPONSIVE & MOBILE FRAMEWORKS

#### CSS Framework:
```json
{
  "tailwindcss": "^3.2.0",
  "@tailwindcss/typography": "^0.5.9",
  "@tailwindcss/aspect-ratio": "^0.4.2"
}
```

#### Mobile Optimization:
```json
{
  "react-device-detect": "^2.2.3",
  "react-responsive": "^9.0.2"
}
```

### 🔐 SECURITY FRAMEWORKS

#### Frontend Security:
```json
{
  "dompurify": "^3.0.3",
  "js-cookie": "^3.0.5",
  "crypto-js": "^4.1.1"
}
```

#### Backend Security:
```python
Flask-Talisman==1.1.0     # Security headers
Flask-SeaSurf==1.1.1      # CSRF protection
Flask-Login==0.6.3        # Session management
```

### 🚀 DEPLOYMENT FRAMEWORKS

#### Frontend Deployment:
```json
{
  "vite": "^4.2.0",
  "@vitejs/plugin-react": "^3.1.0",
  "vite-plugin-pwa": "^0.14.7"
}
```

#### Backend Deployment:
```python
gunicorn==21.2.0          # WSGI HTTP Server
waitress==2.1.2           # Production WSGI server
supervisor==4.2.5         # Process control system
```

#### Environment Management:
```python
python-decouple==3.8      # Settings management
environs==9.5.0           # Environment parsing
```

### 🧪 TESTING FRAMEWORKS

#### Frontend Testing:
```json
{
  "@testing-library/react": "^13.4.0",
  "@testing-library/jest-dom": "^5.16.5",
  "@testing-library/user-event": "^14.4.3",
  "vitest": "^0.29.8",
  "jsdom": "^21.1.1"
}
```

#### Backend Testing:
```python
pytest==7.4.2            # Testing framework
pytest-flask==1.2.0      # Flask testing
pytest-mock==3.11.1      # Mocking utilities
factory-boy==3.3.0       # Test data generation
faker==19.6.2             # Fake data generation
```

### 📊 MONITORING & LOGGING

#### Frontend Monitoring:
```json
{
  "@sentry/react": "^7.57.0",
  "web-vitals": "^3.3.2"
}
```

#### Backend Monitoring:
```python
Flask-Logging==0.1.0      # Enhanced logging
sentry-sdk==1.32.0        # Error tracking
python-json-logger==2.0.7 # JSON logging
```

### 🔧 DEVELOPMENT TOOLS

#### Code Quality:
```json
{
  "eslint": "^8.38.0",
  "@typescript-eslint/eslint-plugin": "^5.57.1",
  "@typescript-eslint/parser": "^5.57.1",
  "prettier": "^2.8.7"
}
```

#### Python Development:
```python
pre-commit==3.4.0         # Git hooks
mypy==1.5.1               # Type checking
isort==5.12.0             # Import sorting
autopep8==2.0.4           # Code formatting
```

## 📦 INSTALLATION COMMANDS

### Frontend Setup:
```bash
# Create React + TypeScript + Vite project
npm create vite@latest project-01 -- --template react-ts

# Install dependencies
npm install react-router-dom
npm install tailwindcss autoprefixer postcss
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install lucide-react lottie-react
npm install sonner react-hook-form zod
npm install @tanstack/react-query zustand

# Development dependencies
npm install -D @types/node
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D eslint @typescript-eslint/eslint-plugin
npm install -D prettier vite-tsconfig-paths
```

### Backend Setup:
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install Flask==2.3.3
pip install Flask-CORS==4.0.0
pip install Flask-Limiter==3.5.0
pip install pymongo==4.5.0
pip install bcrypt==4.0.1
pip install PyJWT==2.8.0
pip install python-dotenv==1.0.0

# Development dependencies
pip install pytest pytest-flask
pip install black flake8 mypy
pip install python-decouple
```

### Database Setup:
```bash
# Install MongoDB locally
# Windows: Download from mongodb.com
# macOS: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB service
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Install MongoDB Compass (GUI)
# Download from: https://www.mongodb.com/products/compass
```

## 🔄 VERSION COMPATIBILITY

### Node.js Requirements:
```
Node.js: >= 16.0.0
npm: >= 8.0.0
```

### Python Requirements:
```
Python: >= 3.8.0
pip: >= 21.0.0
```

### Browser Support:
```
Chrome: >= 90
Firefox: >= 88
Safari: >= 14
Edge: >= 90
```

## 🚀 PRODUCTION REQUIREMENTS

### Frontend Production:
```json
{
  "build": "vite build",
  "preview": "vite preview",
  "serve": "serve -s dist"
}
```

### Backend Production:
```python
# WSGI Server
gunicorn==21.2.0
waitress==2.1.2

# Process Management
supervisor==4.2.5
systemd (Linux)

# Reverse Proxy
nginx>=1.18.0
apache2>=2.4.0
```

### Environment Variables:
```bash
# Production Environment
NODE_ENV=production
VITE_API_URL=https://api.freshplate.com

# Backend Environment  
FLASK_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=secure-random-key
SECRET_KEY=flask-secret-key
```

## 📋 FRAMEWORK SUMMARY

### Total Dependencies:
- **Frontend**: 45+ packages
- **Backend**: 25+ packages  
- **Database**: MongoDB + PyMongo
- **Testing**: 15+ packages
- **Development**: 20+ packages

### Key Framework Categories:
1. **UI Framework**: React + TypeScript + Tailwind CSS
2. **Backend Framework**: Flask + PyMongo + JWT
3. **Database**: MongoDB (NoSQL Document Database)
4. **Animation**: Lottie + Framer Motion
5. **Security**: bcrypt + JWT + CORS + Rate Limiting
6. **Testing**: Pytest + React Testing Library
7. **Deployment**: Vite + Gunicorn + Nginx
8. **Monitoring**: Sentry + Custom Logging

This comprehensive framework stack ensures a robust, scalable, and secure meal planning application with modern development practices and production-ready deployment capabilities.