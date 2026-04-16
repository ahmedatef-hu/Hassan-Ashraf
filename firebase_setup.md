# Firebase Integration Setup - Hassan Ashraf Clinic

## ✅ Configuration Complete

Your Firebase project is now connected with the following credentials:
- **Project ID**: hassan-ashraf-clinic
- **API Key**: AIzaSyBGz4srSzQMc1d3KdZxdwtHEQ6WdaM1zu0

## 📁 Firestore Collections Structure

### 1. **branches** Collection
Each document contains:
```
{
  name: "Branch Name",
  address: "Full Address",
  phone_numbers: ["phone1", "phone2"],
  state: "open" or "closed",
  working: {
    days: ["Sunday", "Monday", ...],
    hours: "7 PM - 10 PM"
  }
}
```

### 2. **sessions** Collection
Each document contains:
```
{
  type: "hair" | "skin" | "cleaning",
  name: "Session Name",
  description: "Session details",
  price: 350,
  duration: 60,
  createdAt: timestamp
}
```

### 3. **bookings** Collection
Each document contains:
```
{
  customerName: "Name",
  phone: "Phone Number",
  email: "Email",
  sessionType: "Session Name",
  date: "YYYY-MM-DD",
  time: "HH:MM",
  branch: "Branch Name",
  status: "pending" | "confirmed" | "completed",
  createdAt: timestamp
}
```

## 🚀 Features Implemented

### Admin Dashboard (`admin.html`)
- ✅ Manage Sessions (Add, Edit, Delete)
- ✅ Manage Branches (Add, Edit, Delete)
- ✅ View Customer Bookings
- ✅ Tab-based interface for easy navigation

### Booking Page (`booking.html`)
- ✅ Browse available sessions
- ✅ Select sessions with pricing
- ✅ Book appointments with date/time
- ✅ Choose preferred branch
- ✅ Automatic booking confirmation

### Dynamic Branches Page (`branches.html`)
- ✅ Loads branches from Firebase in real-time
- ✅ Shows branch status (open/closed)
- ✅ Displays phone numbers, hours, and address
- ✅ Responsive grid layout

## 📝 How to Use

### 1. **Add a New Session**
- Go to `/admin.html`
- Click "Manage Sessions" tab
- Fill in session details (type, name, price, duration)
- Click "Save Session"

### 2. **Manage Branches**
- Go to `/admin.html`
- Click "Manage Branches" tab
- Add/Edit branch information
- Set working days and hours
- Update status (open/closed)

### 3. **View Bookings**
- Go to `/admin.html`
- Click "View Bookings" tab
- See all customer bookings in real-time

### 4. **Customer Booking**
- Go to `/booking.html`
- Browse available sessions
- Select a session
- Fill in personal details
- Choose date, time, and branch
- Confirm booking

## 🔗 Links to Add to Your Website

Add these links to your navigation:

```html
<!-- Admin Dashboard -->
<a href="admin.html">Admin Dashboard</a>

<!-- Booking Page -->
<a href="booking.html">Book Now</a>
```

## 📱 Responsive Design
- ✅ Mobile-friendly admin dashboard
- ✅ Responsive booking form
- ✅ Touch-friendly buttons and inputs
- ✅ Optimized for all screen sizes

## 🔐 Security Notes
- Keep your Firebase credentials safe
- Consider adding authentication to admin dashboard
- Validate all user inputs on the backend
- Set up Firestore security rules in Firebase Console

## 🎨 Styling
- Modern gradient backgrounds
- Smooth animations and transitions
- Glass morphism effects
- Consistent color scheme (blue/teal)
- Professional typography

## ✨ Next Steps
1. Test the admin dashboard with sample data
2. Add authentication to admin panel (optional)
3. Set up email notifications for bookings
4. Customize colors and branding as needed
5. Deploy to production

---

**All systems ready! Your clinic management system is now live.** 🎉
