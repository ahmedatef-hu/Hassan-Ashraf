// Simple API Test Script
// Run with: node test-api.js

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Hassan Ashraf Clinic API...\n');

  // Test 1: Health Check
  try {
    console.log('1️⃣ Testing Health Check...');
    const response = await fetch('http://localhost:5000/health');
    const data = await response.json();
    console.log('✅ Health Check:', data.success ? 'PASSED' : 'FAILED');
    console.log('   Message:', data.message);
  } catch (error) {
    console.log('❌ Health Check: FAILED');
    console.log('   Error:', error.message);
    return;
  }

  // Test 2: Get Services
  try {
    console.log('\n2️⃣ Testing Get Services...');
    const response = await fetch(`${API_BASE}/services`);
    const data = await response.json();
    console.log('✅ Get Services:', data.success ? 'PASSED' : 'FAILED');
    console.log('   Services Count:', data.count || 0);
  } catch (error) {
    console.log('❌ Get Services: FAILED');
    console.log('   Error:', error.message);
  }

  // Test 3: Get Branches
  try {
    console.log('\n3️⃣ Testing Get Branches...');
    const response = await fetch(`${API_BASE}/branches`);
    const data = await response.json();
    console.log('✅ Get Branches:', data.success ? 'PASSED' : 'FAILED');
    console.log('   Branches Count:', data.count || 0);
  } catch (error) {
    console.log('❌ Get Branches: FAILED');
    console.log('   Error:', error.message);
  }

  // Test 4: Create Booking
  try {
    console.log('\n4️⃣ Testing Create Booking...');
    const bookingData = {
      patient_name: 'Test Patient',
      patient_phone: '+20 11 12345678',
      service_name: 'تنظيف البشرة العادي',
      branch_name: 'فرع المعادي',
      appointment_date: '2024-12-25',
      appointment_time: '10:00',
      notes: 'Test booking from API test'
    };

    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });

    const data = await response.json();
    console.log('✅ Create Booking:', data.success ? 'PASSED' : 'FAILED');
    
    if (data.success) {
      console.log('   Booking ID:', data.data?.id);
      
      // Test 5: Search Booking
      console.log('\n5️⃣ Testing Search Booking...');
      const searchResponse = await fetch(`${API_BASE}/bookings?phone=${encodeURIComponent(bookingData.patient_phone)}`);
      const searchData = await searchResponse.json();
      console.log('✅ Search Booking:', searchData.success ? 'PASSED' : 'FAILED');
      console.log('   Found Bookings:', searchData.count || 0);
    }
  } catch (error) {
    console.log('❌ Create Booking: FAILED');
    console.log('   Error:', error.message);
  }

  console.log('\n🎉 API Testing Complete!');
}

// Run the tests
testAPI().catch(console.error);