const { supabase } = require('../config/database');

class PatientService {
  // Create or get existing patient
  async createOrGetPatient(patientData) {
    const { name, phone, email } = patientData;

    // First, try to find existing patient by phone
    const { data: existingPatient, error: findError } = await supabase
      .from('patients')
      .select('*')
      .eq('phone', phone)
      .single();

    if (findError && findError.code !== 'PGRST116') { // PGRST116 = no rows found
      throw findError;
    }

    if (existingPatient) {
      // Update existing patient if name or email changed
      if (existingPatient.name !== name || existingPatient.email !== email) {
        const { data: updatedPatient, error: updateError } = await supabase
          .from('patients')
          .update({ name, email })
          .eq('id', existingPatient.id)
          .select()
          .single();

        if (updateError) throw updateError;
        return updatedPatient;
      }
      return existingPatient;
    }

    // Create new patient
    const { data: newPatient, error: createError } = await supabase
      .from('patients')
      .insert({ name, phone, email })
      .select()
      .single();

    if (createError) throw createError;
    return newPatient;
  }

  // Get patient by phone
  async getPatientByPhone(phone) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('phone', phone)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  }

  // Search patients by phone or name
  async searchPatients(searchCriteria) {
    let query = supabase.from('patients').select('*');

    if (searchCriteria.phone) {
      query = query.ilike('phone', `%${searchCriteria.phone}%`);
    }

    if (searchCriteria.name) {
      query = query.ilike('name', `%${searchCriteria.name}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

module.exports = new PatientService();