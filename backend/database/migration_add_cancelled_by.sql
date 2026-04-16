-- Migration: Add cancelled_by column to track who cancelled the booking
-- Run this in Supabase SQL Editor

-- Add cancelled_by column
ALTER TABLE bookings ADD COLUMN cancelled_by VARCHAR(20);

-- Add comment to explain the column
COMMENT ON COLUMN bookings.cancelled_by IS 'Who cancelled the booking: "patient" or "admin"';
