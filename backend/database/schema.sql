-- Hassan Ashraf Clinic Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Patients table
CREATE TABLE patients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'cleaning', 'hair_treatment', 'skin_treatment'
    duration_minutes INTEGER DEFAULT 60,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Branches table
CREATE TABLE branches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone_numbers TEXT[], -- Array of phone numbers
    state VARCHAR(20) DEFAULT 'open', -- 'open', 'closed', 'maintenance'
    working_days TEXT[], -- Array of working days
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    appointment_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_patients_phone ON patients(phone);
CREATE INDEX idx_bookings_patient_id ON bookings(patient_id);
CREATE INDEX idx_bookings_appointment_date ON bookings(appointment_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_branch_date ON bookings(branch_id, appointment_date);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_branches_active ON branches(is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_branches_updated_at BEFORE UPDATE ON branches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
-- Services
INSERT INTO services (name, description, price, category) VALUES
('تنظيف البشرة العادي', 'تنظيف عميق للبشرة باستخدام تقنيات حديثة', 300.00, 'cleaning'),
('تنظيف البشرة المتقدم', 'تنظيف شامل مع علاجات إضافية', 500.00, 'cleaning'),
('علاج الشعر بالبلازما', 'علاج متقدم لتساقط الشعر', 800.00, 'hair_treatment'),
('حقن البوتوكس للشعر', 'علاج مكثف لتقوية الشعر', 600.00, 'hair_treatment'),
('تقشير كيميائي', 'تقشير البشرة لتجديد الخلايا', 400.00, 'skin_treatment'),
('حقن الفيلر', 'حقن الفيلر لنضارة البشرة', 1200.00, 'skin_treatment'),
('ديرمابن', 'علاج البشرة بتقنية الديرمابن', 350.00, 'skin_treatment'),
('هايدرافيشل', 'تنظيف وترطيب عميق للبشرة', 450.00, 'skin_treatment');

-- Branches
INSERT INTO branches (name, address, phone_numbers, working_days) VALUES
('فرع المعادي', 'شارع 9، المعادي، القاهرة', ARRAY['+20 11 29588908', '+20 2 25555555'], ARRAY['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء']),
('فرع مدينة نصر', 'شارع عباس العقاد، مدينة نصر، القاهرة', ARRAY['+20 11 29588909', '+20 2 26666666'], ARRAY['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']),
('فرع الزمالك', 'شارع 26 يوليو، الزمالك، القاهرة', ARRAY['+20 11 29588910'], ARRAY['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']);

-- Enable Row Level Security (RLS) - Optional for additional security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed)
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access on branches" ON branches FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public insert on patients" ON patients FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read on bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Allow public update on bookings" ON bookings FOR UPDATE USING (true);