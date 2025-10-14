# 📋 FreshPlate Backend & Database Documentation (Text Format)

## 🎯 FRONTEND PAGES & BACKEND REQUIREMENTS

### 1. 🚀 SPLASH PAGE
- **Backend Required**: None
- **Database**: None
- **Framework**: React + Lottie animations
- **Purpose**: App introduction with 5-second animation

### 2. 🔐 AUTH PAGE (Login/Register)
- **Backend APIs**:
  - POST /api/auth/register - User registration
  - POST /api/auth/login - User authentication
  - GET /api/auth/verify - Token verification
- **Database Collections**:
  - users: { _id, email, password, profile, created_at, is_premium }
- **Framework**: React + JWT + bcrypt
- **Features**: Confetti animation, form validation, guest mode

### 3. 🏠 HOME PAGE (Meal Planning)
- **Backend APIs** (Future):
  - GET /api/meals - Retrieve user meals
  - POST /api/meals - Create new meal
  - PUT /api/meals/:id - Update meal
  - DELETE /api/meals/:id - Delete meal
- **Database Collections** (Future):
  - meals: { _id, user_id, day, meal_time, name, description, week, assigned_to }
  - meal_plans: { _id, user_id, week_start, meals[], created_at }
- **Current**: LocalStorage implementation
- **Framework**: React + Context API

### 4. 🍳 RECIPES PAGE
- **Backend APIs**:
  - GET /api/recipes - Get user recipes
  - POST /api/recipes - Create recipe
  - DELETE /api/recipes/:id - Delete recipe
- **Database Collections**:
  - recipes: { _id, user_id, name, ingredients, instructions, created_at }
- **Framework**: React + Context API + Lottie (cooking animation)
- **Features**: Search, filter, save/unsave recipes

### 5. 🛒 SHOPPING PAGE
- **Backend APIs** (Future):
  - GET /api/shopping-lists - Get shopping lists
  - POST /api/shopping-lists - Create shopping list
  - PUT /api/shopping-lists/:id - Update list
  - DELETE /api/shopping-lists/:id - Delete list
- **Database Collections** (Future):
  - shopping_lists: { _id, user_id, name, items[], created_at, completed }
  - shopping_items: { _id, list_id, name, category, checked, quantity }
- **Current**: LocalStorage implementation
- **Framework**: React + Lottie (inventory animation)

### 6. 👤 PROFILE PAGE
- **Backend APIs**:
  - GET /api/profile - Get user profile
  - PUT /api/profile - Update profile
  - PUT /api/auth/change-password - Change password
- **Database Collections**:
  - users.profile: { name, phone, bio, dietary_preferences[] }
- **Framework**: React + Form validation
- **Features**: Profile management, dietary preferences

### 7. 🔍 DISCOVER PAGE
- **Backend APIs** (Future):
  - GET /api/discover/recipes - Public recipes
  - GET /api/discover/trending - Trending recipes
  - POST /api/recipes/save - Save public recipe
- **Database Collections** (Future):
  - public_recipes: { _id, name, image, time, servings, category, likes }
  - user_saves: { _id, user_id, recipe_id, saved_at }
- **Framework**: React + Search/Filter
- **Features**: Recipe discovery, trending content

### 8. ⚙️ SETTINGS PAGE
- **Backend APIs** (Future):
  - GET /api/settings - Get user settings
  - PUT /api/settings - Update settings
  - POST /api/premium/upgrade - Upgrade to premium
- **Database Collections** (Future):
  - user_settings: { _id, user_id, notifications, theme, language }
- **Framework**: React + Preferences management
- **Features**: App preferences, premium upgrade

### 9. 📱 MORE PAGE
- **Backend APIs**:
  - GET /api/clients - Get nutritionist clients
  - POST /api/clients - Add new client
  - DELETE /api/clients/:id - Remove client
- **Database Collections**:
  - clients: { _id, nutritionist_id, name, email, plan, status, created_at }
- **Framework**: React + Role-based access
- **Features**: Client management for nutritionists

## 🔧 BACKEND FRAMEWORK DETAILS

### Core Technology Stack:
- **Flask**: Python web framework
- **Flask-CORS**: Cross-origin resource sharing
- **Flask-Limiter**: Rate limiting protection
- **PyJWT**: JSON Web Token handling
- **bcrypt**: Password hashing
- **python-dotenv**: Environment variables

### Security Implementation:
- **JWT Authentication**: 7-day token expiration
- **Password Hashing**: bcrypt with salt
- **Rate Limiting**: 5 requests/minute for auth endpoints
- **Input Sanitization**: Prevent XSS and injection attacks
- **CORS Protection**: Configured for localhost:8080, 8082, 3000
- **Security Headers**: XSS, CSRF, Content-Type protection
- **Bot Detection**: Block suspicious user agents

### Middleware Components:
- **Authentication Decorator**: @require_auth for protected routes
- **Security Headers**: Applied to all responses
- **Request Validation**: Input sanitization and validation
- **Error Handling**: Consistent error responses

## 🗄️ DATABASE ARCHITECTURE

### Database Technology:
- **MongoDB**: NoSQL document database
- **PyMongo**: Python MongoDB driver
- **Connection**: MongoDB Atlas or local instance

### Current Collections:

#### 1. USERS Collection:
```
{
  _id: ObjectId,
  email: String (unique, indexed),
  password: String (bcrypt hashed),
  profile: {
    name: String,
    phone: String,
    bio: String,
    dietary_preferences: Array
  },
  is_premium: Boolean (default: false),
  premium_date: Date,
  created_at: Date
}
```

#### 2. RECIPES Collection:
```
{
  _id: ObjectId,
  user_id: String (indexed),
  name: String,
  ingredients: String,
  instructions: String,
  created_at: Date
}
```

#### 3. CLIENTS Collection:
```
{
  _id: ObjectId,
  nutritionist_id: String (indexed),
  name: String,
  email: String,
  plan: String,
  status: String,
  created_at: Date,
  last_updated: Date
}
```

### Future Collections:

#### 4. MEALS Collection (Planned):
```
{
  _id: ObjectId,
  user_id: String (indexed),
  day: String,
  meal_time: String,
  name: String,
  description: String,
  week: String,
  assigned_to: Number,
  created_at: Date
}
```

#### 5. SHOPPING_LISTS Collection (Planned):
```
{
  _id: ObjectId,
  user_id: String (indexed),
  name: String,
  items: Array,
  created_at: Date,
  completed: Boolean
}
```

### Database Indexes:
- **users.email**: Unique index for fast login lookup
- **recipes.user_id**: Index for user recipe queries
- **clients.nutritionist_id**: Index for client management
- **Future**: meals.user_id, shopping_lists.user_id

## 🔐 AUTHENTICATION SYSTEM

### Registration Flow:
1. **Input Validation**: Email format, password strength (8+ chars, letters + numbers)
2. **Duplicate Check**: Verify email doesn't exist
3. **Password Hashing**: bcrypt with salt
4. **User Creation**: Store in database with profile
5. **Success Response**: Show confetti animation
6. **Redirect**: Switch to login form

### Login Flow:
1. **Credential Verification**: Check email exists
2. **Password Comparison**: bcrypt verification
3. **JWT Generation**: Create token with 7-day expiration
4. **Success Response**: Show confetti animation
5. **Redirect**: Navigate to home page

### Token Management:
- **Format**: Bearer token in Authorization header
- **Expiration**: 7 days from creation
- **Verification**: Automatic on protected routes
- **Storage**: Client-side localStorage

### Guest Mode:
- **Features**: Limited functionality
- **Storage**: LocalStorage only
- **Database**: No access to backend APIs
- **Upgrade**: Prompt to register for full features

## 🚀 API ENDPOINTS

### Authentication Endpoints:
- **POST /api/auth/register**: User registration
- **POST /api/auth/login**: User authentication
- **GET /api/auth/verify**: Token verification

### Profile Management:
- **GET /api/profile**: Retrieve user profile
- **PUT /api/profile**: Update user profile
- **PUT /api/auth/change-password**: Change user password

### Recipe Management:
- **GET /api/recipes**: Get user recipes (returns saved/created arrays)
- **POST /api/recipes**: Create new recipe
- **DELETE /api/recipes/:id**: Delete user recipe

### Client Management (Nutritionists):
- **GET /api/clients**: Get nutritionist's clients
- **POST /api/clients**: Add new client
- **DELETE /api/clients/:id**: Remove client

### Premium Features:
- **POST /api/premium/upgrade**: Upgrade user to premium

### System Endpoints:
- **GET /**: API information and available endpoints
- **GET /health**: Health check endpoint
- **GET /api/test**: Connection test endpoint

## 🔒 SECURITY FEATURES

### Input Protection:
- **Sanitization**: Strip HTML, limit length (500 chars)
- **Validation**: Email format, password strength
- **Escaping**: Prevent XSS attacks

### Request Protection:
- **Rate Limiting**: 5 requests/minute for auth endpoints
- **Bot Detection**: Block suspicious user agents
- **CORS**: Configured origins only

### Response Protection:
- **Security Headers**: XSS, CSRF, Content-Type protection
- **Error Handling**: No sensitive information in errors
- **Token Security**: Secure JWT implementation

## 🌐 DEPLOYMENT REQUIREMENTS

### Environment Variables:
```
MONGODB_URI=mongodb://localhost:27017/mealplan
JWT_SECRET=your-secret-key-here
SECRET_KEY=your-flask-secret-key-here
```

### Dependencies (requirements.txt):
```
Flask==2.3.3
Flask-CORS==4.0.0
Flask-Limiter==3.5.0
pymongo==4.5.0
bcrypt==4.0.1
PyJWT==2.8.0
python-dotenv==1.0.0
```

### Server Configuration:
- **Port**: 5000
- **Host**: 0.0.0.0 (production) / localhost (development)
- **Debug**: True (development only)
- **CORS Origins**: localhost:8080, 8082, 3000

### Setup Commands:
```bash
cd backend
pip install -r requirements.txt
python start.py
```

## 📊 IMPLEMENTATION STATUS

### ✅ COMPLETED FEATURES:
- User Authentication (Register/Login with JWT)
- Profile Management (CRUD operations)
- Recipe Management (Create, Read, Delete)
- Client Management for Nutritionists
- Premium Upgrade System
- Security Implementation (Rate limiting, CORS, Input sanitization)
- Database Schema and Indexes
- Error Handling and Validation

### 🔄 IN PROGRESS:
- Home Page Meal Planning (LocalStorage → API migration)
- Shopping Lists (LocalStorage → API migration)
- Settings Page (Frontend → Backend integration)

### 🚧 PLANNED FEATURES:
- Meal Planning API with full CRUD operations
- Shopping Lists API with item management
- Public Recipe Discovery system
- Notification System for reminders
- Image Upload for recipes
- Recipe Sharing and Social features
- Nutritional Information API
- Mobile App Backend support
- Analytics and Reporting dashboard
- Advanced search and filtering
- Recipe import/export functionality

## 🛠️ DEVELOPMENT WORKFLOW

### Local Development:
1. Start MongoDB service
2. Set environment variables
3. Install Python dependencies
4. Run Flask development server
5. Start React frontend
6. Test API endpoints

### Testing Strategy:
- Unit tests for API endpoints
- Integration tests for database operations
- Security testing for authentication
- Performance testing for database queries

### Production Deployment:
- Environment variable configuration
- Database connection optimization
- Security header implementation
- Rate limiting configuration
- Error logging and monitoring