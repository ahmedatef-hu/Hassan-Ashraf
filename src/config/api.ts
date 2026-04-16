// API Configuration for Hassan Ashraf Clinic
const API_BASE_URL = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? '/api'  // Use relative path in production (same domain)
    : 'http://localhost:5000/api'
);

// API endpoints
export const API_ENDPOINTS = {
  // Patients
  PATIENTS: `${API_BASE_URL}/patients`,
  PATIENT_BY_PHONE: (phone: string) => `${API_BASE_URL}/patients/${phone}`,
  SEARCH_PATIENTS: `${API_BASE_URL}/patients/search`,

  // Services
  SERVICES: `${API_BASE_URL}/services`,
  SERVICES_GROUPED: `${API_BASE_URL}/services/grouped`,
  SERVICES_BY_CATEGORY: (category: string) => `${API_BASE_URL}/services/category/${category}`,

  // Branches
  BRANCHES: `${API_BASE_URL}/branches`,
  BRANCH_BY_ID: (id: string) => `${API_BASE_URL}/branches/${id}`,
  BRANCH_SCHEDULE: (id: string) => `${API_BASE_URL}/branches/${id}/schedule`,

  // Bookings
  BOOKINGS: `${API_BASE_URL}/bookings`,
  BOOKINGS_ALL: `${API_BASE_URL}/bookings/all`,
  BOOKING_CANCEL: (id: string) => `${API_BASE_URL}/bookings/${id}/cancel`,
  BOOKING_STATUS: (id: string) => `${API_BASE_URL}/bookings/${id}/status`,
  BOOKED_SLOTS: (branchId: string) => `${API_BASE_URL}/bookings/slots/${branchId}`,

  // Health check
  HEALTH: `${API_BASE_URL.replace('/api', '')}/health`
};

// HTTP client configuration
export const httpClient = {
  async request(url: string, options: RequestInit = {}) {
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  async get(url: string, options?: RequestInit) {
    return this.request(url, { method: 'GET', ...options });
  },

  async post(url: string, data?: any, options?: RequestInit) {
    return this.request(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  async patch(url: string, data?: any, options?: RequestInit) {
    return this.request(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  async delete(url: string, options?: RequestInit) {
    return this.request(url, { method: 'DELETE', ...options });
  },
};

// Type definitions
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  errors?: Array<{ field: string; message: string }>;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  duration_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone_numbers: string[];
  state: string;
  working_days: string[];
  working_hours: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  patient_id: string;
  service_id: string;
  branch_id: string;
  appointment_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  cancelled_by?: 'patient' | 'admin';
  created_at: string;
  updated_at: string;
  patients?: Patient;
  services?: Service;
  branches?: Branch;
}

export interface BookingRequest {
  patient_name: string;
  patient_phone: string;
  service_name: string;
  branch_name: string;
  appointment_date: string;
  notes?: string;
}