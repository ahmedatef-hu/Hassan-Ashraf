# Hassan Ashraf Dermatology Clinic - Booking System

A complete booking system for Hassan Ashraf Dermatology Clinic built with React + TypeScript frontend and Node.js + Express backend with Supabase PostgreSQL database.

## �️ Architecture

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express.js + TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: None (Public booking system)

## 📦 Features

- ✅ **Service Booking**: Patients can book appointments for various dermatology services
- ✅ **Patient Portal**: Search and manage bookings by phone/name
- ✅ **Service Management**: Display cleaning, hair treatment, and skin treatment services
- ✅ **Branch Management**: Multiple clinic locations with working hours
- ✅ **Booking Status**: Track pending, confirmed, completed, and cancelled bookings
- ✅ **Slot Management**: Prevent double booking for same time/branch
- ✅ **Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Supabase account
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd hassan-ashraf-clinic
```

### 2. Setup Supabase Database

1. Create a new project in [Supabase](https://supabase.com)
2. Go to SQL Editor and run the schema from `backend/database/schema.sql`
3. Copy your project URL and API keys

### 3. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` file with your Supabase credentials:

```env
PORT=5000
NODE_ENV=development

SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

FRONTEND_URL=http://localhost:3000
API_VERSION=v1
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### 4. Setup Frontend

```bash
# From project root
npm install
cp .env.example .env
```

Edit `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm start
```

The app will be available at `http://localhost:3000`

## 📊 Database Schema

### Tables

- **patients**: Patient information (name, phone, email)
- **services**: Available services (name, price, category, duration)
- **branches**: Clinic locations (name, address, working hours)
- **bookings**: Appointment bookings (patient, service, branch, date/time, status)

### Key Features

- UUID primary keys
- Foreign key relationships
- Unique constraints to prevent double booking
- Automatic timestamps (created_at, updated_at)
- Row Level Security (RLS) enabled

## 🔌 API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/grouped` - Get services grouped by category
- `GET /api/services/category/:category` - Get services by category

### Branches
- `GET /api/branches` - Get all branches
- `GET /api/branches/:id` - Get branch by ID
- `GET /api/branches/:id/schedule` - Get branch working schedule

### Patients
- `POST /api/patients` - Create or update patient
- `GET /api/patients/:phone` - Get patient by phone
- `GET /api/patients/search` - Search patients by phone/name

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings?phone=xxx&name=xxx` - Search bookings
- `GET /api/bookings/all` - Get all bookings (admin)
- `GET /api/bookings/slots/:branchId` - Get booked slots for branch
- `PATCH /api/bookings/:id/cancel` - Cancel booking
- `PATCH /api/bookings/:id/status` - Update booking status

## 🛠️ Development

### Backend Development

```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development

```bash
npm start  # Start React development server
```

### Testing API

Test the health endpoint:

```bash
curl http://localhost:5000/health
```

## 📱 Frontend Pages

- **Home** (`/`) - Landing page with clinic information
- **Services** (`/services`) - Display all available services
- **Branches** (`/branches`) - Show clinic locations
- **Booking** (`/booking`) - Create new appointment
- **Patient Portal** (`/patient-portal`) - Search and manage bookings
- **About** (`/about`) - About the clinic
- **Contact** (`/contact`) - Contact information

## 🔒 Security Features

- Input validation using Joi
- SQL injection prevention via Supabase
- CORS protection
- Helmet security headers
- Rate limiting ready (can be added)
- Environment variable protection

## 🚀 Deployment

### Backend Deployment (Railway/Heroku/DigitalOcean)

1. Set environment variables in your hosting platform
2. Deploy the `backend` folder
3. Ensure `npm start` runs `node src/server.js`

### Frontend Deployment (Vercel/Netlify)

1. Set `REACT_APP_API_URL` to your backend URL
2. Deploy the root folder (React app)
3. Configure build command: `npm run build`

### Environment Variables for Production

Backend:
```env
NODE_ENV=production
PORT=5000
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key
FRONTEND_URL=https://your-frontend-domain.com
```

Frontend:
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## 📝 Migration from Firebase

This project was migrated from Firebase to Supabase. Key changes:

1. **Database**: Firestore → PostgreSQL (Supabase)
2. **API**: Direct Firebase calls → REST API
3. **Data Structure**: Document-based → Relational tables
4. **Real-time**: Firebase listeners → Polling (can add Supabase real-time)

### Migration Benefits

- ✅ Better data consistency with SQL
- ✅ More predictable costs
- ✅ Better performance for complex queries
- ✅ Standard REST API
- ✅ Better backup and recovery options

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.

---

**Hassan Ashraf Dermatology Clinic** - Professional skin care services in Cairo, Egypt.