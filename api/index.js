// Vercel Serverless Function Entry Point
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const getSupabaseClient = () => {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
};

// Health check
app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'Hassan Ashraf Clinic API', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Services - Get all grouped by category
app.get('/api/services/grouped', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;

    const grouped = data.reduce((acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    }, {});

    res.json({ success: true, data: grouped });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Services - Get all
app.get('/api/services', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Branches - Get all
app.get('/api/branches', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Patients - Create or get existing
app.post('/api/patients', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { name, phone, email } = req.body;

    // Check if patient exists
    const { data: existing } = await supabase
      .from('patients')
      .select('*')
      .eq('phone', phone)
      .single();

    if (existing) {
      return res.json({ success: true, data: existing });
    }

    // Create new patient
    const { data, error } = await supabase
      .from('patients')
      .insert([{ name, phone, email }])
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bookings - Create
app.post('/api/bookings', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { patient_id, service_id, branch_id, appointment_date, notes } = req.body;

    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        patient_id,
        service_id,
        branch_id,
        appointment_date,
        notes,
        status: 'pending'
      }])
      .select(`
        *,
        patients(*),
        services(*),
        branches(*)
      `)
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bookings - Get all with filters
app.get('/api/bookings/all', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const days = req.query['days[]'];
    const statuses = req.query['statuses[]'];
    
    // First, get all bookings
    let bookingsQuery = supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (days) {
      const daysArray = Array.isArray(days) ? days : [days];
      bookingsQuery = bookingsQuery.in('appointment_date', daysArray);
    }

    if (statuses) {
      const statusesArray = Array.isArray(statuses) ? statuses : [statuses];
      bookingsQuery = bookingsQuery.in('status', statusesArray);
    }

    const { data: bookings, error: bookingsError } = await bookingsQuery;

    if (bookingsError) {
      console.error('Bookings error:', bookingsError);
      throw bookingsError;
    }

    if (!bookings || bookings.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // Get all related data
    const patientIds = [...new Set(bookings.map(b => b.patient_id))];
    const serviceIds = [...new Set(bookings.map(b => b.service_id))];
    const branchIds = [...new Set(bookings.map(b => b.branch_id))];

    const [patientsRes, servicesRes, branchesRes] = await Promise.all([
      supabase.from('patients').select('*').in('id', patientIds),
      supabase.from('services').select('*').in('id', serviceIds),
      supabase.from('branches').select('*').in('id', branchIds)
    ]);

    // Create lookup maps
    const patientsMap = {};
    const servicesMap = {};
    const branchesMap = {};

    if (patientsRes.data) {
      patientsRes.data.forEach(p => patientsMap[p.id] = p);
    }
    if (servicesRes.data) {
      servicesRes.data.forEach(s => servicesMap[s.id] = s);
    }
    if (branchesRes.data) {
      branchesRes.data.forEach(b => branchesMap[b.id] = b);
    }

    // Combine data
    const enrichedBookings = bookings.map(booking => ({
      ...booking,
      patients: patientsMap[booking.patient_id] || null,
      services: servicesMap[booking.service_id] || null,
      branches: branchesMap[booking.branch_id] || null
    }));

    console.log('Enriched bookings:', JSON.stringify(enrichedBookings, null, 2));
    res.json({ success: true, data: enrichedBookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bookings - Get all with filters (alternative endpoint)
app.get('/api/bookings', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { days, statuses } = req.query;
    
    let query = supabase
      .from('bookings')
      .select(`
        *,
        patients(*),
        services(*),
        branches(*)
      `)
      .order('created_at', { ascending: false });

    // Apply filters
    if (days) {
      const daysArray = Array.isArray(days) ? days : [days];
      query = query.in('appointment_date', daysArray);
    }

    if (statuses) {
      const statusesArray = Array.isArray(statuses) ? statuses : [statuses];
      query = query.in('status', statusesArray);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bookings - Get by phone
app.get('/api/bookings/patient/:phone', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { phone } = req.params;

    const { data: patient } = await supabase
      .from('patients')
      .select('id')
      .eq('phone', phone)
      .single();

    if (!patient) {
      return res.json({ success: true, data: [] });
    }

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        services(*),
        branches(*)
      `)
      .eq('patient_id', patient.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching patient bookings:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bookings - Update status
app.patch('/api/bookings/:id/status', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bookings - Cancel by patient
app.patch('/api/bookings/:id/cancel', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { id } = req.params;

    const { data, error } = await supabase
      .from('bookings')
      .update({ 
        status: 'cancelled',
        cancelled_by: 'patient'
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Export for Vercel
module.exports = app;
