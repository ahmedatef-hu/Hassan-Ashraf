import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { API_ENDPOINTS, httpClient, Booking, ApiResponse } from '../config/api';

export const PatientPortal: React.FC = () => {
  const [searchPhone, setSearchPhone] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  const handleSearch = async () => {
    if (!searchPhone) {
      alert('الرجاء إدخال رقم الهاتف.');
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('phone', searchPhone);

      const response: ApiResponse<Booking[]> = await httpClient.get(
        `${API_ENDPOINTS.BOOKINGS}?${params.toString()}`
      );

      if (response.success && response.data) {
        setBookings(response.data);
      } else {
        setBookings([]);
      }
      setSearched(true);
    } catch (error: any) {
      console.error('Error searching bookings:', error);
      alert(error.message || 'خطأ في البحث. الرجاء المحاولة مرة أخرى.');
      setBookings([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId: string) => {
    if (window.confirm('هل أنت متأكد من إلغاء هذا الحجز؟')) {
      try {
        const response: ApiResponse = await httpClient.patch(API_ENDPOINTS.BOOKING_CANCEL(bookingId));
        
        if (response.success) {
          alert('تم إلغاء الحجز بنجاح.');
          handleSearch(); // Refresh the bookings
        }
      } catch (error: any) {
        console.error('Error cancelling booking:', error);
        alert(error.message || 'خطأ في إلغاء الحجز.');
      }
    }
  };

  return (
    <div className="pt-20">
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 bg-gradient-to-br from-blue-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-slate-900" data-aos="fade-up">حجوزاتي</h1>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            ابحث عن حجوزاتك وأدرها بسهولة
          </p>

          {/* Search Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-slate-100 mb-12" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">ابحث عن حجزك</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">رقم الهاتف</label>
                <input
                  type="tel"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  placeholder="+20 11 29588908"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'جاري البحث...' : 'بحث'}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {searched && (
            <div>
              {bookings.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-slate-100 text-center">
                  <p className="text-slate-600 text-lg">لم يتم العثور على حجوزات.</p>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-slate-900">
                    {bookings.length} حجز{bookings.length !== 1 ? 'ات' : ''}
                  </h2>
                  <div className="space-y-6">
                    {bookings.map((booking, index) => {
                      const status = booking.status || 'pending';
                      const statusColors: any = {
                        'pending': 'bg-yellow-100 text-yellow-700',
                        'confirmed': 'bg-green-100 text-green-700',
                        'completed': 'bg-blue-100 text-blue-700',
                        'cancelled': 'bg-red-100 text-red-700'
                      };
                      const statusText: any = {
                        'pending': 'قيد الانتظار',
                        'confirmed': 'مؤكد',
                        'completed': 'مكتمل',
                        'cancelled': 'ملغي'
                      };
                      const isCancelled = status === 'cancelled';
                      const isPast = new Date(booking.appointment_date) < new Date();

                      return (
                        <div key={booking.id} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">{booking.services?.name || 'Unknown Service'}</h3>
                              <p className="text-slate-600 text-sm mt-1">📍 {booking.branches?.name || 'Unknown Branch'}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[status]}`}>
                              {statusText[status] || status}
                            </span>
                          </div>
                          
                          <div className="grid md:grid-cols-1 gap-4 mb-6 py-4 border-y border-slate-200">
                            <div>
                              <p className="text-slate-600 text-sm">📅 التاريخ</p>
                              <p className="text-lg font-semibold text-slate-900">{booking.appointment_date}</p>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <p className="text-slate-600 text-sm">👤 المريض</p>
                            <p className="text-slate-900 font-semibold">{booking.patients?.name || 'Unknown Patient'}</p>
                            <p className="text-slate-600 text-sm">📞 {booking.patients?.phone || 'Unknown Phone'}</p>
                          </div>
                          
                          {booking.notes && (
                            <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200">
                              <p className="text-slate-600 text-sm">📝 ملاحظات</p>
                              <p className="text-slate-900">{booking.notes}</p>
                            </div>
                          )}
                          
                          <div className="flex gap-3">
                            {!isCancelled && !isPast && (
                              <button
                                onClick={() => handleCancel(booking.id)}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                              >
                                إلغاء الحجز
                              </button>
                            )}
                            <button
                              onClick={() => alert(`تفاصيل الحجز:\n\nالخدمة: ${booking.services?.name || 'Unknown'}\nالفرع: ${booking.branches?.name || 'Unknown'}\nالتاريخ: ${booking.appointment_date}\nالحالة: ${status}\nالملاحظات: ${booking.notes || 'لا توجد'}`)}
                              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                              عرض التفاصيل
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
