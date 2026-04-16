-- Migration: Change appointment_date from DATE to VARCHAR
-- This allows storing day names (السبت, الأحد, etc.) instead of actual dates

-- Step 1: Add new column
ALTER TABLE bookings ADD COLUMN appointment_date_new VARCHAR(50);

-- Step 2: Copy existing data (convert DATE to text)
UPDATE bookings SET appointment_date_new = appointment_date::text;

-- Step 3: Drop old column
ALTER TABLE bookings DROP COLUMN appointment_date;

-- Step 4: Rename new column
ALTER TABLE bookings RENAME COLUMN appointment_date_new TO appointment_date;

-- Step 5: Add NOT NULL constraint
ALTER TABLE bookings ALTER COLUMN appointment_date SET NOT NULL;

-- Step 6: Recreate index
DROP INDEX IF EXISTS idx_bookings_appointment_date;
CREATE INDEX idx_bookings_appointment_date ON bookings(appointment_date);

DROP INDEX IF EXISTS idx_bookings_branch_date;
CREATE INDEX idx_bookings_branch_date ON bookings(branch_id, appointment_date);
