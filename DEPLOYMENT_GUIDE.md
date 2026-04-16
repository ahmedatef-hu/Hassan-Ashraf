# 🚀 Deployment Guide - Hassan Ashraf Clinic

This guide covers deploying your clinic booking system to production.

## 🌐 Deployment Options

### Backend Deployment

#### Option 1: Railway (Recommended)
- ✅ Easy setup
- ✅ Automatic deployments
- ✅ Built-in monitoring
- ✅ Free tier available

#### Option 2: Heroku
- ✅ Popular platform
- ✅ Good documentation
- ✅ Add-ons ecosystem
- ❌ No free tier

#### Option 3: DigitalOcean App Platform
- ✅ Competitive pricing
- ✅ Good performance
- ✅ Simple deployment

### Frontend Deployment

#### Option 1: Vercel (Recommended)
- ✅ Optimized for React
- ✅ Automatic deployments
- ✅ Global CDN
- ✅ Free tier

#### Option 2: Netlify
- ✅ Easy setup
- ✅ Form handling
- ✅ Branch previews
- ✅ Free tier

## 🚀 Step-by-Step Deployment

### 1. Prepare for Production

#### Backend Preparation
```bash
cd backend
npm run build  # If you have a build script
npm test       # Run tests if available
```

#### Frontend Preparation
```bash
npm run build
npm run test   # Run tests if available
```

### 2. Deploy Backend to Railway

1. **Create Railway Account**
   - Go to [Railway](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` folder

3. **Configure Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   SUPABASE_URL=your_production_supabase_url
   SUPABASE_ANON_KEY=your_production_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_production_service_key
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   API_VERSION=v1
   ```

4. **Deploy**
   - Railway will automatically deploy
   - Note your backend URL (e.g., `https://your-app.railway.app`)

### 3. Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select root directory (not backend)

3. **Configure Build Settings**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Configure Environment Variables**
   ```env
   SUPABASE_URL=https://uetecmwahufwfadrawmh.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVldGVjbXdhaHVmd2ZhZHJhd21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyOTY2NzIsImV4cCI6MjA5MTg3MjY3Mn0.aDqN1GzkVuWL9zHA_B5FcjwsHbFecpSozvVtLSokZNA
   NODE_ENV=production
   ```

5. **Deploy**
   - Vercel will build and deploy automatically
   - Your app will be available at `https://your-app.vercel.app`
   - Backend API runs as serverless functions at `/api/*`

### 4. Update CORS Settings

Update your backend environment variables:
```env
FRONTEND_URL=https://your-app.vercel.app
```

Redeploy the backend for changes to take effect.

## 🔒 Production Security Checklist

### Backend Security
- ✅ Environment variables are set correctly
- ✅ CORS is configured for your frontend domain only
- ✅ Rate limiting is enabled (add if needed)
- ✅ Input validation is working
- ✅ Error messages don't expose sensitive info
- ✅ HTTPS is enforced

### Database Security
- ✅ RLS (Row Level Security) is enabled
- ✅ Service role key is kept secret
- ✅ Database backups are configured
- ✅ Only necessary permissions are granted

### Frontend Security
- ✅ API URL points to HTTPS backend
- ✅ No sensitive data in client-side code
- ✅ Content Security Policy headers
- ✅ HTTPS redirect is enabled

## 📊 Monitoring & Maintenance

### Health Monitoring
Set up monitoring for:
- API uptime (`/health` endpoint)
- Database connectivity
- Error rates
- Response times

### Backup Strategy
- **Database**: Supabase handles automatic backups
- **Code**: Keep GitHub repository updated
- **Environment Variables**: Document all settings

### Updates
1. Test changes locally
2. Deploy to staging environment (optional)
3. Deploy to production
4. Monitor for issues
5. Rollback if needed

## 🌍 Custom Domain Setup

### Backend Domain
1. **Purchase Domain** (e.g., `api.hassanashraf.com`)
2. **Configure DNS** in Railway/Heroku
3. **Update Environment Variables**
   ```env
   FRONTEND_URL=https://hassanashraf.com
   ```

### Frontend Domain
1. **Purchase Domain** (e.g., `hassanashraf.com`)
2. **Configure DNS** in Vercel/Netlify
3. **Update API URL**
   ```env
   REACT_APP_API_URL=https://api.hassanashraf.com/api
   ```

## 🔧 Troubleshooting Production Issues

### Common Issues

#### "API not responding"
- Check backend deployment logs
- Verify environment variables
- Test health endpoint directly

#### "CORS errors"
- Verify `FRONTEND_URL` matches exactly
- Check for trailing slashes
- Ensure HTTPS is used

#### "Database connection failed"
- Verify Supabase credentials
- Check IP restrictions in Supabase
- Test database connection directly

#### "Build failed"
- Check for TypeScript errors
- Verify all dependencies are installed
- Review build logs for specific errors

### Debugging Steps
1. **Check Logs**: Review deployment platform logs
2. **Test Endpoints**: Use curl or Postman
3. **Verify Environment**: Double-check all variables
4. **Database Check**: Query Supabase directly
5. **Network Test**: Check connectivity between services

## 📈 Performance Optimization

### Backend Optimization
- Enable gzip compression (already included)
- Add Redis caching (optional)
- Optimize database queries
- Add CDN for static assets

### Frontend Optimization
- Code splitting (React Router handles this)
- Image optimization
- Bundle analysis
- Service worker for caching

### Database Optimization
- Add database indexes (included in schema)
- Monitor query performance
- Regular maintenance tasks

## 💰 Cost Estimation

### Free Tier (Development/Small Scale)
- **Supabase**: Free up to 500MB database
- **Railway**: Free tier with limitations
- **Vercel**: Free for personal projects
- **Total**: $0/month

### Production Scale
- **Supabase Pro**: $25/month
- **Railway Pro**: $5-20/month
- **Vercel Pro**: $20/month
- **Domain**: $10-15/year
- **Total**: ~$50-65/month

## 🎯 Go-Live Checklist

Before going live:

### Technical
- [ ] All tests pass
- [ ] Production environment variables set
- [ ] HTTPS enabled everywhere
- [ ] Database schema deployed
- [ ] Sample data removed/updated
- [ ] Error monitoring configured
- [ ] Backup strategy implemented

### Business
- [ ] Content reviewed and approved
- [ ] Contact information updated
- [ ] Service prices confirmed
- [ ] Branch information accurate
- [ ] Staff trained on system
- [ ] Support process defined

### Legal
- [ ] Privacy policy updated
- [ ] Terms of service reviewed
- [ ] Data protection compliance
- [ ] Cookie policy (if needed)

## 🆘 Emergency Procedures

### If Site Goes Down
1. Check status pages (Railway, Vercel, Supabase)
2. Review recent deployments
3. Check error logs
4. Rollback if necessary
5. Communicate with users

### If Database Issues
1. Check Supabase dashboard
2. Verify connection strings
3. Review recent schema changes
4. Contact Supabase support if needed

### Contact Information
- **Platform Support**: Check respective platform docs
- **Development Team**: [Your contact info]
- **Emergency Contact**: [Emergency contact]

---

**🎉 Congratulations!** Your Hassan Ashraf Clinic booking system is now live and ready to serve patients!