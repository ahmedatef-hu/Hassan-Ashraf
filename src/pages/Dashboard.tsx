import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { API_ENDPOINTS, httpClient, Booking, ApiResponse } from '../config/api';

export const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    days: [] as string[],
    statuses: [] as string[]
  });
  const [showDaysFilter, setShowDaysFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const daysButtonRef = React.useRef<HTMLDivElement>(null);
  const statusButtonRef = React.useRef<HTMLDivElement>(null);

  const weekDays = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
  const statuses = [
    { value: 'pending', label: 'قيد الانتظار' },
    { value: 'confirmed', label: 'مؤكد' },
    { value: 'completed', label: 'مكتمل' },
    { value: 'cancelled', label: 'ملغي' }
  ];

  const toggleDay = (day: string) => {
    setFilter(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const toggleStatus = (status: string) => {
    setFilter(prev => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status]
    }));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (daysButtonRef.current && !daysButtonRef.current.contains(event.target as Node)) {
        setShowDaysFilter(false);
      }
      if (statusButtonRef.current && !statusButtonRef.current.contains(event.target as Node)) {
        setShowStatusFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const loadBookings = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      // Add days filter (multiple values)
      if (filter.days.length > 0) {
        filter.days.forEach(day => params.append('days[]', day));
      }
      
      // Add statuses filter (multiple values)
      if (filter.statuses.length > 0) {
        filter.statuses.forEach(status => params.append('statuses[]', status));
      }

      const response: ApiResponse<Booking[]> = await httpClient.get(
        `${API_ENDPOINTS.BOOKINGS_ALL}?${params.toString()}`
      );

      if (response.success && response.data) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    loadBookings();
  }, [loadBookings]);

  useEffect(() => {
    loadBookings();
  }, [filter, loadBookings]);



  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response: ApiResponse = await httpClient.patch(
        API_ENDPOINTS.BOOKING_STATUS(bookingId),
        { status: newStatus }
      );

      if (response.success) {
        alert('تم تحديث حالة الحجز بنجاح');
        loadBookings();
      }
    } catch (error: any) {
      console.error('Error updating booking:', error);
      alert(error.message || 'خطأ في تحديث الحجز');
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (window.confirm('هل أنت متأكد من إلغاء هذا الحجز؟')) {
      try {
        const response: ApiResponse = await httpClient.patch(
          API_ENDPOINTS.BOOKING_CANCEL(bookingId)
        );

        if (response.success) {
          alert('تم إلغاء الحجز بنجاح');
          loadBookings();
        }
      } catch (error: any) {
        console.error('Error cancelling booking:', error);
        alert(error.message || 'خطأ في إلغاء الحجز');
      }
    }
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'confirmed': 'bg-green-100 text-green-800 border-green-300',
      'completed': 'bg-blue-100 text-blue-800 border-blue-300',
      'cancelled': 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">لوحة التحكم</h1>
          <p className="text-slate-600">إدارة حجوزات العيادة</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-0.5">قيد الانتظار</p>
                <p className="text-2xl font-bold text-slate-900">
                  {bookings.filter(b => b.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-0.5">مؤكد</p>
                <p className="text-2xl font-bold text-slate-900">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-0.5">مكتمل</p>
                <p className="text-2xl font-bold text-slate-900">
                  {bookings.filter(b => b.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-red-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-0.5">ملغي</p>
                <p className="text-2xl font-bold text-slate-900">
                  {bookings.filter(b => b.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6" data-aos="fade-up" data-aos-delay="250">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <h2 className="text-lg font-bold text-slate-900">تصفية الحجوزات</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Days Filter */}
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200" ref={daysButtonRef}>
              <button
                onClick={() => setShowDaysFilter(!showDaysFilter)}
                className="w-full flex items-center justify-between hover:bg-slate-100 rounded px-2 py-1 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  أيام الأسبوع
                  {filter.days.length > 0 && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">
                      {filter.days.length}
                    </span>
                  )}
                </span>
                <svg 
                  className={`w-4 h-4 text-slate-400 transition-transform ${showDaysFilter ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Status Filter */}
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200" ref={statusButtonRef}>
              <button
                onClick={() => setShowStatusFilter(!showStatusFilter)}
                className="w-full flex items-center justify-between hover:bg-slate-100 rounded px-2 py-1 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  الحالة
                  {filter.statuses.length > 0 && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">
                      {filter.statuses.length}
                    </span>
                  )}
                </span>
                <svg 
                  className={`w-4 h-4 text-slate-400 transition-transform ${showStatusFilter ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Days Dropdown - Fixed Position */}
        {showDaysFilter && daysButtonRef.current && (
          <div 
            className="fixed bg-white border border-slate-300 rounded-lg shadow-2xl z-[9999] p-4"
            style={{
              top: `${daysButtonRef.current.getBoundingClientRect().bottom + 8}px`,
              left: `${daysButtonRef.current.getBoundingClientRect().left}px`,
              width: `${daysButtonRef.current.getBoundingClientRect().width}px`
            }}
          >
            <div className="space-y-2 mb-3 max-h-64 overflow-y-auto">
              {weekDays.map((day) => (
                <label
                  key={day}
                  className="flex items-center px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filter.days.includes(day)}
                    onChange={() => toggleDay(day)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="mr-3 text-slate-700">{day}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFilter({ ...filter, days: weekDays })}
                className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors"
              >
                اختر الكل
              </button>
              <button
                type="button"
                onClick={() => setFilter({ ...filter, days: [] })}
                className="flex-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
              >
                إلغاء الكل
              </button>
            </div>
          </div>
        )}

        {/* Status Dropdown - Fixed Position */}
        {showStatusFilter && statusButtonRef.current && (
          <div 
            className="fixed bg-white border border-slate-300 rounded-lg shadow-2xl z-[9999] p-4"
            style={{
              top: `${statusButtonRef.current.getBoundingClientRect().bottom + 8}px`,
              left: `${statusButtonRef.current.getBoundingClientRect().left}px`,
              width: `${statusButtonRef.current.getBoundingClientRect().width}px`
            }}
          >
            <div className="space-y-2 mb-3">
              {statuses.map((status) => (
                <label
                  key={status.value}
                  className="flex items-center px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filter.statuses.includes(status.value)}
                    onChange={() => toggleStatus(status.value)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="mr-3 text-slate-700">{status.label}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFilter({ ...filter, statuses: statuses.map(s => s.value) })}
                className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors"
              >
                اختر الكل
              </button>
              <button
                type="button"
                onClick={() => setFilter({ ...filter, statuses: [] })}
                className="flex-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
              >
                إلغاء الكل
              </button>
            </div>
          </div>
        )}

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" data-aos="fade-up" data-aos-delay="300">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <h2 className="text-lg font-bold text-slate-900">الحجوزات</h2>
              <span className="bg-blue-100 text-blue-700 text-sm px-2.5 py-0.5 rounded-full font-bold">
                {bookings.length}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="p-16 text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></div>
              <p className="mt-3 text-slate-600 text-sm">جاري التحميل...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-600">لا توجد حجوزات</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">المريض</th>
                    <th className="px-5 py-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">الخدمة</th>
                    <th className="px-5 py-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">الفرع</th>
                    <th className="px-5 py-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">اليوم</th>
                    <th className="px-5 py-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">الحالة</th>
                    <th className="px-5 py-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{booking.patients?.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{booking.patients?.phone}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-slate-900 text-sm font-medium">{booking.services?.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{booking.services?.price} جنيه</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-slate-700 text-sm">{booking.branches?.name}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-slate-700 text-sm font-medium">{booking.appointment_date}</span>
                      </td>
                      <td className="px-5 py-4">
                        {booking.status === 'cancelled' && booking.cancelled_by === 'patient' ? (
                          <div>
                            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                              ملغي
                            </span>
                            <span className="block text-xs text-red-600 mt-1">ملغي بواسطة العميل</span>
                          </div>
                        ) : (
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-full text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(booking.status)}`}
                          >
                            <option value="pending">قيد الانتظار</option>
                            <option value="confirmed">مؤكد</option>
                            <option value="completed">مكتمل</option>
                            <option value="cancelled">ملغي</option>
                          </select>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          {booking.status !== 'cancelled' && (
                            <button
                              onClick={() => cancelBooking(booking.id)}
                              className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-100 border border-red-200 transition-colors"
                            >
                              إلغاء
                            </button>
                          )}
                          {booking.notes && (
                            <button
                              onClick={() => alert(`ملاحظات:\n${booking.notes}`)}
                              className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 border border-blue-200 transition-colors"
                            >
                              ملاحظات
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};