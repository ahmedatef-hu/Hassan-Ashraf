-- Migration: Remove working_hours column from branches table
-- Run this in Supabase SQL Editor

-- Drop the working_hours column
ALTER TABLE branches DROP COLUMN IF EXISTS working_hours;

-- Done!


-- Migration: Remove appointment_time column from bookings table

-- Step 1: Remove the unique constraint (if exists)
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_branch_id_appointment_date_appointment_time_key;

-- Step 2: Drop the appointment_time column
ALTER TABLE bookings DROP COLUMN IF EXISTS appointment_time;

-- Step 3: Update the index (remove time reference)
DROP INDEX IF EXISTS idx_bookings_branch_date_time;
CREATE INDEX IF NOT EXISTS idx_bookings_branch_date ON bookings(branch_id, appointment_date);

-- Done! The bookings table now only uses dates, not times.