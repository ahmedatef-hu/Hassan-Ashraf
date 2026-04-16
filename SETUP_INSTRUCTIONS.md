# 🚀 Hassan Ashraf Clinic - Setup Instructions

Follow these step-by-step instructions to set up the complete booking system.

## 📋 Prerequisites

Before starting, make sure you have:

- ✅ Node.js 16+ installed ([Download here](https://nodejs.org/))
- ✅ npm or yarn package manager
- ✅ Git installed
- ✅ A Supabase account ([Sign up here](https://supabase.com))
- ✅ Code editor (VS Code recommended)

## 🗄️ Step 1: Setup Supabase Database

### 1.1 Create Supabase Project

1. Go to [Supabase](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `hassan-ashraf-clinic`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (2-3 minutes)

### 1.2 Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire content from `backend/database/schema.sql`
4. Paste it in the SQL editor
5. Click "Run" to execute the schema
6. You should see "Success. No rows returned" message

### 1.3 Get API Keys

1. Go to **Settings** → **API**
2. Copy these values (you'll need them later):
   - **Project URL**
   - **anon public key**
   - **service_role secret key**

## 🔧 Step 2: Setup Backend

### 2.1 Install Dependencies

```bash
cd backend
npm install
```

### 2.2 Configure Environment

```bash
cp .env.example .env
```

Edit the `.env` file with your Supabase credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Supabase Configuration (Replace with your values)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# API Configuration
API_VERSION=v1
```

### 2.3 Test Backend

```bash
npm run dev
```

You should see:
```
🚀 Hassan Ashraf Clinic API Server running on port 5000
📊 Environment: development
🌐 CORS enabled for: http://localhost:3000
📋 Health check: http://localhost:5000/health
```

Test the API:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Hassan Ashraf Clinic API is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "development"
}
```

## 🎨 Step 3: Setup Frontend

### 3.1 Install Dependencies

```bash
# From project root (not backend folder)
cd ..
npm install
```

### 3.2 Configure Environment

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3.3 Start Frontend

```bash
npm start
```

The app will open at `http://localhost:3000`

## ✅ Step 4: Verify Everything Works

### 4.1 Test Services Page

1. Go to `http://localhost:3000/services`
2. You should see services loaded from the database
3. If you see "No services available", check:
   - Backend is running on port 5000
   - Database schema was executed correctly
   - API URL in frontend .env is correct

### 4.2 Test Booking System

1. Go to `http://localhost:3000/booking`
2. Fill out the booking form:
   - **Name**: Test Patient
   - **Phone**: +20 11 12345678
   - **Service**: Choose any service
   - **Branch**: Choose any branch
   - **Date**: Choose from available days
   - **Time**: Choose from available times
3. Submit the form
4. You should see a success message with booking ID

### 4.3 Test Patient Portal

1. Go to `http://localhost:3000/patient-portal`
2. Search by phone: `+20 11 12345678`
3. You should see the booking you just created
4. Try cancelling the booking

## 🚀 Step 5: Production Deployment

### 5.1 Deploy Backend

**Option A: Railway**
1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Deploy the `backend` folder
4. Set environment variables in Railway dashboard

**Option B: Heroku**
1. Install Heroku CLI
2. Create new app: `heroku create your-app-name`
3. Set environment variables: `heroku config:set SUPABASE_URL=...`
4. Deploy: `git push heroku main`

### 5.2 Deploy Frontend

**Option A: Vercel (Recommended)**
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Set environment variable: `REACT_APP_API_URL=https://your-backend-url.com/api`
4. Deploy

**Option B: Netlify**
1. Go to [Netlify](https://netlify.com)
2. Connect GitHub repository
3. Build command: `npm run build`
4. Publish directory: `build`
5. Set environment variables in Netlify dashboard

## 🔧 Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Kill process using port 5000
npx kill-port 5000
# Or use different port
PORT=5001 npm run dev
```

**Supabase connection error:**
- Verify your Supabase URL and keys
- Check if your IP is allowed in Supabase settings
- Ensure RLS policies are set correctly

**CORS errors:**
- Make sure `FRONTEND_URL` in backend .env matches your frontend URL
- Check if both servers are running

### Frontend Issues

**API connection error:**
- Verify `REACT_APP_API_URL` in frontend .env
- Make sure backend is running
- Check browser console for detailed errors

**Services not loading:**
- Check if database schema was executed
- Verify sample data was inserted
- Test API endpoints directly: `curl http://localhost:5000/api/services`

**Booking form not working:**
- Check browser console for errors
- Verify all required fields are filled
- Test API endpoint: `curl -X POST http://localhost:5000/api/bookings -H "Content-Type: application/json" -d '{"patient_name":"Test","patient_phone":"+201234567890","service_name":"تنظيف البشرة العادي","branch_name":"فرع المعادي","appointment_date":"2024-12-25","appointment_time":"10:00"}'`

### Database Issues

**Schema execution failed:**
- Make sure you're using the SQL Editor in Supabase
- Check for syntax errors in the schema
- Try running sections of the schema separately

**No sample data:**
- The schema includes INSERT statements for sample data
- If data is missing, run only the INSERT statements from the schema

## 📞 Getting Help

If you encounter issues:

1. **Check the logs**: Look at browser console and terminal output
2. **Verify environment variables**: Double-check all .env files
3. **Test API endpoints**: Use curl or Postman to test backend
4. **Check Supabase dashboard**: Verify data exists in tables
5. **Review this guide**: Make sure you followed all steps

## 🎉 Success!

If everything is working:
- ✅ Backend API responds to health check
- ✅ Frontend loads without errors
- ✅ Services page shows data from database
- ✅ Booking form creates new appointments
- ✅ Patient portal finds and displays bookings

You now have a fully functional clinic booking system!

## 📚 Next Steps

- Customize the services and branches in Supabase
- Add your clinic's branding and colors
- Set up production deployment
- Configure domain names
- Add monitoring and analytics
- Set up automated backups

---

**Need help?** Contact the development team or create an issue in the repository.