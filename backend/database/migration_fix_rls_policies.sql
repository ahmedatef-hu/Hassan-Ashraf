-- Migration: Fix Row Level Security Policies
-- This allows the backend to insert/update data properly

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow public read access on services" ON services;
DROP POLICY IF EXISTS "Allow public read access on branches" ON branches;
DROP POLICY IF EXISTS "Allow public insert on patients" ON patients;
DROP POLICY IF EXISTS "Allow public insert on bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public read on bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public update on bookings" ON bookings;

-- Create permissive policies for all operations
-- Services
CREATE POLICY "Allow all operations on services" ON services FOR ALL USING (true) WITH CHECK (true);

-- Branches
CREATE POLICY "Allow all operations on branches" ON branches FOR ALL USING (true) WITH CHECK (true);

-- Patients
CREATE POLICY "Allow all operations on patients" ON patients FOR ALL USING (true) WITH CHECK (true);

-- Bookings
CREATE POLICY "Allow all operations on bookings" ON bookings FOR ALL USING (true) WITH CHECK (true);
