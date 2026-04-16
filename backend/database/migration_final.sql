-- Final Migration: Fix remaining issues
-- Run this in Supabase SQL Editor

-- ============================================
-- PART 1: Change appointment_date from DATE to VARCHAR (if not already done)
-- ============================================

-- Check if column is already VARCHAR, if not, change it
DO $$ 
BEGIN
    -- Check if appointment_date is DATE type
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'bookings' 
        AND column_name = 'appointment_date' 
        AND data_type = 'date'
    ) THEN
        -- Add new column
        ALTER TABLE bookings ADD COLUMN appointment_date_new VARCHAR(50);
        
        -- Copy existing data
        UPDATE bookings SET appointment_date_new = appointment_date::text WHERE appointment_date IS NOT NULL;
        
        -- Drop old column
        ALTER TABLE bookings DROP COLUMN appointment_date;
        
        -- Rename new column
        ALTER TABLE bookings RENAME COLUMN appointment_date_new TO appointment_date;
        
        -- Add NOT NULL constraint
        ALTER TABLE bookings ALTER COLUMN appointment_date SET NOT NULL;
        
        -- Recreate indexes
        DROP INDEX IF EXISTS idx_bookings_appointment_date;
        CREATE INDEX idx_bookings_appointment_date ON bookings(appointment_date);
        
        DROP INDEX IF EXISTS idx_bookings_branch_date;
        CREATE INDEX idx_bookings_branch_date ON bookings(branch_id, appointment_date);
        
        RAISE NOTICE 'appointment_date column changed to VARCHAR';
    ELSE
        RAISE NOTICE 'appointment_date column is already VARCHAR or does not exist';
    END IF;
END $$;

-- ============================================
-- PART 2: Fix Row Level Security Policies
-- ============================================

-- Drop ALL existing policies (including the new ones if they exist)
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    -- Drop all policies on services
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'services' LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || pol.policyname || '" ON services';
    END LOOP;
    
    -- Drop all policies on branches
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'branches' LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || pol.policyname || '" ON branches';
    END LOOP;
    
    -- Drop all policies on patients
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'patients' LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || pol.policyname || '" ON patients';
    END LOOP;
    
    -- Drop all policies on bookings
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'bookings' LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || pol.policyname || '" ON bookings';
    END LOOP;
END $$;

-- Create new permissive policies
CREATE POLICY "Allow all operations on services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on branches" ON branches FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on patients" ON patients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on bookings" ON bookings FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- DONE!
-- ============================================
SELECT 'Migration completed successfully!' AS status;
