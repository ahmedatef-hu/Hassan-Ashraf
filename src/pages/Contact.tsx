import React, { useEffect } from 'react';
import AOS from 'aos';

export const Contact: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <div className="pt-20">
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-slate-900" data-aos="fade-up">تواصل معنا</h1>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            هل لديك أسئلة؟ نود أن نسمع منك. تواصل معنا اليوم.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <div data-aos="fade-up">
              <h2 className="text-3xl font-bold mb-2 text-center text-slate-900">معلومات التواصل</h2>
              <p className="text-center text-slate-600 mb-8">تواصل معنا من خلال أي من هذه القنوات</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="contact-card group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold">الهاتف</h3>
                    </div>
                    <p className="text-lg font-semibold text-blue-50">+20 11 29588908</p>
                    <p className="text-sm text-blue-100 mt-2">اتصل بنا في أي وقت</p>
                  </div>
                </div>

                <div className="contact-card group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold">واتس آب</h3>
                    </div>
                    <a href="https://wa.me/201129588908" target="_blank" rel="noopener noreferrer" className="inline-block text-lg font-semibold text-green-50 hover:text-white transition-colors">تحدث معنا →</a>
                    <p className="text-sm text-green-100 mt-2">رسائل فورية</p>
                  </div>
                </div>

                <div className="contact-card group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold">المواقع</h3>
                    </div>
                    <p className="text-lg font-semibold text-teal-50">فروع متعددة</p>
                    <p className="text-sm text-teal-100 mt-2">عبر القاهرة</p>
                  </div>
                </div>

                <div className="contact-card group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold">الساعات</h3>
                    </div>
                    <p className="text-sm text-purple-100 space-y-1">
                      <span className="block">الأحد-الخميس: 7 م - 10 م</span>
                      <span className="block">الجمعة: 5:30 م - 10 م</span>
                      <span className="block">السبت: مغلق</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-16 mb-12" data-aos="fade-up">
            <h2 className="text-2xl font-bold mb-8 text-center text-slate-900">تابعنا</h2>
            <div className="flex justify-center gap-8 flex-wrap">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-blue-600 hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 border border-white/30 group-hover:border-white/60">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </a>

              <a href="https://www.instagram.com/hassan_ashraf._official" target="_blank" rel="noopener noreferrer" className="social-link group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-pink-600 hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 border border-white/30 group-hover:border-white/60">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                  </svg>
                </div>
              </a>

              <a href="https://www.tiktok.com/@hassan....ashraf" target="_blank" rel="noopener noreferrer" className="social-link group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-700 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 border border-white/30 group-hover:border-white/60">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 2.31-4.64 2.86 2.86 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.1z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Google Maps */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm" data-aos="fade-up">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">ابحث عننا</h2>
            <div className="rounded-2xl overflow-hidden h-96 border border-slate-200">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.7971234567890!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzQwLjAiTiAzMcKwMTQnMDcuNSJF!5e0!3m2!1sen!2seg!4v1234567890" width="100%" height="100%" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Hassan Ashraf Clinic Location"></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
