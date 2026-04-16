import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AOS from 'aos';
import { API_ENDPOINTS, httpClient, Service, Branch, BookingRequest, ApiResponse } from '../config/api';

export const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    serviceType: '',
    branch: '',
    appointmentDate: '',
    notes: ''
  });

  const [services, setServices] = useState<Service[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      // Load services
      const servicesResponse: ApiResponse<Service[]> = await httpClient.get(API_ENDPOINTS.SERVICES);
      if (servicesResponse.success && servicesResponse.data) {
        setServices(servicesResponse.data);
      }

      // Load branches
      const branchesResponse: ApiResponse<Branch[]> = await httpClient.get(API_ENDPOINTS.BRANCHES);
      if (branchesResponse.success && branchesResponse.data) {
        setBranches(branchesResponse.data);
      }

      // Set service from URL if provided
      const serviceFromUrl = searchParams.get('service');
      if (serviceFromUrl) {
        setFormData(prev => ({ ...prev, serviceType: serviceFromUrl }));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceName = e.target.value;
    setFormData(prev => ({ ...prev, serviceType: serviceName, branch: '', appointmentDate: '' }));
  };

  const handleBranchChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const branchName = e.target.value;
    setFormData(prev => ({ ...prev, branch: branchName, appointmentDate: '' }));
    
    if (branchName) {
      const branch = branches.find(b => b.name === branchName);
      if (branch?.working_days) {
        setAvailableDays(branch.working_days);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phoneNumber || !formData.serviceType || !formData.branch || !formData.appointmentDate) {
      alert('الرجاء ملء جميع الحقول المطلوبة.');
      return;
    }

    try {
      const bookingData: BookingRequest = {
        patient_name: formData.fullName,
        patient_phone: formData.phoneNumber,
        service_name: formData.serviceType,
        branch_name: formData.branch,
        appointment_date: formData.appointmentDate,
        notes: formData.notes
      };

      const response: ApiResponse = await httpClient.post(API_ENDPOINTS.BOOKINGS, bookingData);
      
      if (response.success) {
        alert(`✓ تم تأكيد الحجز!\n\nرقم الحجز: ${response.data?.id}\n\nستتلقى رسالة تأكيد قريباً.`);
        
        setFormData({
          fullName: '',
          phoneNumber: '',
          serviceType: '',
          branch: '',
          appointmentDate: '',
          notes: ''
        });

        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error creating booking:', error);
      alert(error.message || 'خطأ في إنشاء الحجز. الرجاء المحاولة مرة أخرى.');
    }
  };

  if (loading) {
    return <div className="pt-40 text-center">جاري التحميل...</div>;
  }

  return (
    <div className="pt-20">
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 bg-gradient-to-br from-blue-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-slate-900" data-aos="fade-up">احجز موعدك</h1>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            حدد موعدك مع د. حسن أشرف. اختر خدمتك المفضلة والفرع والوقت.
          </p>

          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-slate-100" data-aos="fade-up" data-aos-delay="200">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  المعلومات الشخصية
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-900">الاسم الكامل *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required placeholder="اسمك الكامل" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-900">رقم الهاتف *</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required placeholder="+20 11 29588908" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  اختر الخدمة
                </h2>
                
                <div>
                  <label className="block text-sm font-semibold mb-4 text-slate-900">أي خدمة تهتم بها؟ *</label>
                  <select name="serviceType" value={formData.serviceType} onChange={handleServiceChange} required className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all">
                    <option value="">اختر خدمة...</option>
                    {services.map(service => (
                      <option key={service.id} value={service.name}>{service.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Branch Selection */}
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  اختر الفرع
                </h2>
                
                <div>
                  <label className="block text-sm font-semibold mb-4 text-slate-900">أي فرع تفضل؟ *</label>
                  <select name="branch" value={formData.branch} onChange={handleBranchChange} required className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all">
                    <option value="">اختر فرع...</option>
                    {branches.map(branch => (
                      <option key={branch.id} value={branch.name}>{branch.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Selection */}
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  اختر التاريخ
                </h2>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-900">اليوم *</label>
                  <select name="appointmentDate" value={formData.appointmentDate} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all">
                    <option value="">اختر يوم...</option>
                    {availableDays.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                  معلومات إضافية
                </h2>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-900">هل لديك طلبات خاصة أو ملاحظات؟</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={4} placeholder="أخبرنا عن أي مخاوف أو تفضيلات محددة..." className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none"></textarea>
                </div>
              </div>

              {/* Submit */}
              <div className="border-t pt-8 flex gap-4">
                <button type="submit" className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  ✓ تأكيد الحجز
                </button>
                <a href="/" className="flex-1 px-8 py-4 bg-slate-200 text-slate-900 rounded-lg font-bold text-lg hover:bg-slate-300 transition-all duration-300 text-center">
                  إلغاء
                </a>
              </div>
            </form>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200" data-aos="fade-up" data-aos-delay="300">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">تأكيد سريع</h3>
              <p className="text-slate-600 text-sm">ستتلقى رسالة تأكيد خلال دقائق</p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200" data-aos="fade-up" data-aos-delay="400">
              <div className="w-12 h-12 bg-teal-600 text-white rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">إعادة جدولة سهلة</h3>
              <p className="text-slate-600 text-sm">يمكنك تغيير موعدك في أي وقت</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 border border-cyan-200" data-aos="fade-up" data-aos-delay="500">
              <div className="w-12 h-12 bg-cyan-600 text-white rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">رعاية احترافية</h3>
              <p className="text-slate-600 text-sm">علاج متخصص من د. حسن أشرف</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
