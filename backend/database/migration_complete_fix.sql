-- Complete Migration: Fix all issues
-- Run this in Supabase SQL Editor

-- ============================================
-- PART 1: Change appointment_date from DATE to VARCHAR
-- ============================================

-- Step 1: Add new column
ALTER TABLE bookings ADD COLUMN appointment_date_new VARCHAR(50);

-- Step 2: Copy existing data (convert DATE to text)
UPDATE bookings SET appointment_date_new = appointment_date::text WHERE appointment_date IS NOT NULL;

-- Step 3: Drop old column
ALTER TABLE bookings DROP COLUMN appointment_date;

-- Step 4: Rename new column
ALTER TABLE bookings RENAME COLUMN appointment_date_new TO appointment_date;

-- Step 5: Add NOT NULL constraint
ALTER TABLE bookings ALTER COLUMN appointment_date SET NOT NULL;

-- Step 6: Recreate indexes
DROP INDEX IF EXISTS idx_bookings_appointment_date;
CREATE INDEX idx_bookings_appointment_date ON bookings(appointment_date);

DROP INDEX IF EXISTS idx_bookings_branch_date;
CREATE INDEX idx_bookings_branch_date ON bookings(branch_id, appointment_date);

-- ============================================
-- PART 2: Fix Row Level Security Policies
-- ============================================

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

-- ============================================
-- DONE!
-- ============================================
-- Now you can use day names (السبت, الأحد, etc.) for appointment_date
-- and the backend can insert/update data without RLS issues
