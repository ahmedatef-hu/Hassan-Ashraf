const { supabase } = require('../config/database');
const patientService = require('./patientService');
const serviceService = require('./serviceService');
const branchService = require('./branchService');

class BookingService {
  // Create a new booking
  async createBooking(bookingData) {
    const {
      patient_name,
      patient_phone,
      service_name,
      branch_name,
      appointment_date,
      notes
    } = bookingData;

    // Get or create patient
    const patient = await patientService.createOrGetPatient({
      name: patient_name,
      phone: patient_phone
    });

    // Get service by name
    const service = await serviceService.getServiceByName(service_name);
    if (!service) {
      throw new Error('Service not found');
    }

    // Get branch by name
    const branch = await branchService.getBranchByName(branch_name);
    if (!branch) {
      throw new Error('Branch not found');
    }

    // Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        patient_id: patient.id,
        service_id: service.id,
        branch_id: branch.id,
        appointment_date,
        notes: notes || null,
        status: 'pending'
      })
      .select(`
        *,
        patients:patient_id (name, phone),
        services:service_id (name, price, category),
        branches:branch_id (name, address)
      `)
      .single();

    if (error) throw error;
    return booking;
  }

  // Get bookings by patient ID
  async getBookingsByPatientId(patientId) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        patients:patient_id (name, phone),
        services:service_id (name, price, category),
        branches:branch_id (name, address, phone_numbers)
      `)
      .eq('patient_id', patientId)
      .order('appointment_date', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get bookings by patient phone
  async getBookingsByPhone(phone) {
    // First get the patient
    const patient = await patientService.getPatientByPhone(phone);
    if (!patient) {
      return [];
    }

    return this.getBookingsByPatientId(patient.id);
  }

  // Get bookings by patient name
  async getBookingsByName(name) {
    const patients = await patientService.searchPatients({ name });
    if (patients.length === 0) {
      return [];
    }

    // Get bookings for all matching patients
    const allBookings = [];
    for (const patient of patients) {
      const bookings = await this.getBookingsByPatientId(patient.id);
      allBookings.push(...bookings);
    }

    // Sort by appointment date
    return allBookings.sort((a, b) => {
      const dateA = new Date(a.appointment_date);
      const dateB = new Date(b.appointment_date);
      return dateB - dateA; // Most recent first
    });
  }

  // Cancel a booking
  async cancelBooking(bookingId, cancelledBy = 'admin') {
    // First check if booking exists and is not already cancelled
    const { data: existingBooking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        throw new Error('Booking not found');
      }
      throw fetchError;
    }

    if (existingBooking.status === 'cancelled') {
      throw new Error('Booking is already cancelled');
    }

    if (existingBooking.status === 'completed') {
      throw new Error('Cannot cancel a completed booking');
    }

    // Update booking status
    const { data, error } = await supabase
      .from('bookings')
      .update({ 
        status: 'cancelled',
        cancelled_by: cancelledBy
      })
      .eq('id', bookingId)
      .select(`
        *,
        patients:patient_id (name, phone),
        services:service_id (name, price, category),
        branches:branch_id (name, address)
      `)
      .single();

    if (error) throw error;
    return data;
  }

  // Update booking status
  async updateBookingStatus(bookingId, status) {
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select(`
        *,
        patients:patient_id (name, phone),
        services:service_id (name, price, category),
        branches:branch_id (name, address)
      `)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Booking not found');
      }
      throw error;
    }

    return data;
  }

  // Get booked slots for a specific branch and date range
  async getBookedSlots(branchId, startDate, endDate) {
    const { data, error } = await supabase
      .from('bookings')
      .select('appointment_date')
      .eq('branch_id', branchId)
      .gte('appointment_date', startDate)
      .lte('appointment_date', endDate)
      .neq('status', 'cancelled');

    if (error) throw error;
    
    return data.map(booking => ({
      date: booking.appointment_date
    }));
  }

  // Get all bookings (admin function)
  async getAllBookings(filters = {}) {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        patients:patient_id (name, phone),
        services:service_id (name, price, category),
        branches:branch_id (name, address)
      `);

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    // Filter by multiple statuses
    if (filters.statuses && Array.isArray(filters.statuses) && filters.statuses.length > 0) {
      query = query.in('status', filters.statuses);
    }

    if (filters.branch_id) {
      query = query.eq('branch_id', filters.branch_id);
    }

    if (filters.day) {
      query = query.eq('appointment_date', filters.day);
    }

    // Filter by multiple days
    if (filters.days && Array.isArray(filters.days) && filters.days.length > 0) {
      query = query.in('appointment_date', filters.days);
    }

    if (filters.date_from) {
      query = query.gte('appointment_date', filters.date_from);
    }

    if (filters.date_to) {
      query = query.lte('appointment_date', filters.date_to);
    }

    const { data, error } = await query
      .order('appointment_date', { ascending: false});

    if (error) throw error;
    return data;
  }
}

module.exports = new BookingService();