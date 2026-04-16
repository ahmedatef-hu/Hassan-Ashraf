const { supabase } = require('../config/database');

class BranchService {
  // Get all active branches
  async getAllBranches() {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) throw error;
    return data;
  }

  // Get branch by name
  async getBranchByName(name) {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .eq('name', name)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  }

  // Get branch by ID
  async getBranchById(id) {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  }

  // Get branch working hours and days
  async getBranchSchedule(branchId) {
    const branch = await this.getBranchById(branchId);
    if (!branch) {
      throw new Error('Branch not found');
    }

    return {
      working_days: branch.working_days || [],
      working_hours: branch.working_hours || []
    };
  }
}

module.exports = new BranchService();