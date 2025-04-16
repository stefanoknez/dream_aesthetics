# dream_aesthetics

AI-powered facial analysis and aesthetic recommendation system (React + Node + Python + SQL)

## Description

**dream_aesthetics** is a full-stack application that allows users to upload a photo of their face for aesthetic analysis using artificial intelligence. Based on the analysis results (prominent ears, wrinkles, moles, symmetry, acne), the system suggests potential aesthetic treatments and recommends nearby clinics.

## Technologies

- Frontend: React
- Backend: Node.js + Express
- Database: MySQL or PostgreSQL
- AI Service: Python (Flask or FastAPI)
- ORM: Sequelize or TypeORM
- Authentication: JWT
- Version Control: Git + GitHub

## Project Structure

```
dream_aesthetics/
├── backend/         # Node.js API server
├── frontend/        # React application
├── ai_service/      # Python AI service for image analysis
├── database/        # SQL scripts and diagrams
├── README.md        # Documentation
```

## Features

- User registration and login with multiple user roles (user, admin)
- Face image upload
- AI-based facial analysis: ear prominence, moles, acne, wrinkles, facial symmetry
- Treatment recommendations based on analysis results
- Clinic search and filtering
- User comments on clinics
- Admin dashboard for managing clinics and treatments
- Responsive design

## Running the Project Locally

### 1. Clone the repository

```
git clone https://github.com/stefanoknez/dream_aesthetics.git
cd dream_aesthetics
```

### 2. Install backend dependencies

```
cd backend
npm install
```

### 3. Install frontend dependencies

```
cd ../frontend
npm install
```

### 4. Run the AI service

```
cd ../ai_service
pip install -r requirements.txt
python app.py
```

## Contact

Author: Stefan Knežević  
GitHub: [https://github.com/stefanoknez](https://github.com/stefanoknez)