import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

export const Home: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);



  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=1080&fit=crop" alt="Dermatology" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-slate-900" data-aos="fade-up">
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">الأمراض الجلدية المتقدمة</span>
            </h2>
            <p className="text-xl sm:text-2xl text-slate-800 mb-3 font-medium" data-aos="fade-up" data-aos-delay="100">
              و العناية الجلدية المتميزة
            </p>
            <p className="text-lg sm:text-xl text-slate-700 mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
              استمتع بعلاجات جلدية عالمية المستوى مع د. حسن أشرف. أكثر من 10 سنوات من الخبرة في الأمراض الجلدية التجميلية والعلاجية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="300">
              <Link to="/booking" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center">
                احجز موعد
              </Link>
              <Link to="/services" className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-white/70 hover:scale-105 transition-all duration-300 text-center">
                عرض الخدمات
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Introduction */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-10 left-20 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center" data-aos="fade-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
              أهلاً بك في <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">عيادة حسن أشرف</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-12 max-w-3xl mx-auto font-light">
              نوفر رعاية جلدية شاملة مع التركيز على رضا المريض والنتائج الاستثنائية. تجمع عيادتنا بين التكنولوجيا الحديثة وخطط العلاج الشخصية لمعالجة جميع مخاوفك الجلدية.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mt-12 max-w-xs sm:max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-1 sm:p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300 aspect-square flex flex-col items-center justify-center" data-aos="fade-up" data-aos-delay="100">
                <div className="flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-4xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-1">10+</p>
                <p className="text-base sm:text-sm text-slate-600 font-semibold text-center">سنوات الخبرة</p>
              </div>

              <div className="bg-white rounded-2xl p-1 sm:p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-teal-100 hover:border-teal-300 aspect-square flex flex-col items-center justify-center" data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h-2m0 0H8m4 0v2m0-2v-2m0 2h2m0 0h2m-2 0v2m0-2v-2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-4xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent mb-1">5000+</p>
                <p className="text-base sm:text-sm text-slate-600 font-semibold text-center">مريض سعيد</p>
              </div>

              <div className="bg-white rounded-2xl p-1 sm:p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-cyan-100 hover:border-cyan-300 aspect-square flex flex-col items-center justify-center" data-aos="fade-up" data-aos-delay="300">
                <div className="flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-4xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent mb-1">50+</p>
                <p className="text-base sm:text-sm text-slate-600 font-semibold text-center">العلاجات</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Introduction */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-500 rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                  <img src="/img/dr hassan2.jpeg" alt="Dr. Hassan Ashraf" className="w-full h-auto object-cover" />
                </div>
              </div>
            </div>

            <div data-aos="fade-left">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">تعرف على د. حسن أشرف</h2>
              <p className="text-xl text-blue-600 font-semibold mb-6">متخصص في الأمراض الجلدية والطب التجميلي</p>
              
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                مع أكثر من 10 سنوات من الخبرة في الأمراض الجلدية والطب التجميلي، د. حسن أشرف مكرس لتقديم أفضل علاجات العناية بالجلد. تجمع خبرته بين التكنولوجيا المتقدمة والرعاية الشخصية لتحقيق نتائج استثنائية.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">خبرة جلدية متقدمة</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">نهج يركز على المريض</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">علاجات حديثة</span>
                </div>
              </div>

              <Link to="/about" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                تعرف أكثر على د. حسن
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-slate-900" data-aos="fade-up">خدماتنا</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            علاجات جلدية شاملة مصممة خصيصاً لاحتياجات بشرتك الفريدة
          </p>

          <div className="text-center mt-12">
            <div className="grid md:grid-cols-3 gap-8">
            {/* Skin Cleaning */}
            <div className="group relative" data-aos="fade-up">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-blue-100 hover:border-blue-300">
                <div className="h-48 overflow-hidden bg-slate-200 flex items-center justify-center">
                  <img src="/img/facial clean.jpg" alt="تنظيف البشرة" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold mb-3 text-slate-900">تنظيف البشرة</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">علاجات وجهية احترافية من</p>
                  <p className="text-3xl font-bold text-blue-600 mb-6">550 جنيه</p>
                  <Link to="/services" className="inline-block text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all duration-300">تعرف أكثر →</Link>
                </div>
              </div>
            </div>

            {/* Therapeutic Sessions */}
            <div className="group relative" data-aos="fade-up" data-aos-delay="100">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-teal-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-teal-100 hover:border-teal-300">
                <div className="h-48 overflow-hidden bg-slate-200 flex items-center justify-center">
                  <img src="/img/therapeutic sessions.jpg" alt="جلسات علاجية" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold mb-3 text-slate-900">جلسات علاجية</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">علاجات متقدمة من</p>
                  <p className="text-3xl font-bold text-teal-600 mb-6">650 جنيه</p>
                  <Link to="/services" className="inline-block text-teal-600 font-semibold hover:text-teal-700 hover:underline transition-all duration-300">تعرف أكثر →</Link>
                </div>
              </div>
            </div>

            {/* Rejuvenation */}
            <div className="group relative" data-aos="fade-up" data-aos-delay="200">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-cyan-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-cyan-100 hover:border-cyan-300">
                <div className="h-48 overflow-hidden bg-slate-200 flex items-center justify-center">
                  <img src="/img/rejuvenation.jpg" alt="تجديد الشباب" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold mb-3 text-slate-900">تجديد الشباب</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">خدمات تجديد شباب متميزة من</p>
                  <p className="text-3xl font-bold text-cyan-600 mb-6">1500 جنيه</p>
                  <Link to="/services" className="inline-block text-cyan-600 font-semibold hover:text-cyan-700 hover:underline transition-all duration-300">تعرف أكثر →</Link>
                </div>
              </div>
            </div>
          </div>
            <Link to="/services" className="inline-block px-8 py-3 mt-8 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              عرض جميع الخدمات
            </Link>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-12 sm:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">آراء المرضى</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">اسمع من مرضانا الراضين عن تجاربهم التحويلية</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'فاطمة أحمد', location: 'القاهرة', text: 'د. حسن محترف جداً وعطوف. بشرتي لم تبدو أفضل من هذا. أنصح به بشدة!' },
              { name: 'محمد حسن', location: 'الجيزة', text: 'العيادة حديثة ونظيفة. الموظفون ودودون والنتائج مذهلة. تستحق كل فلس!' },
              { name: 'ليلى محمود', location: 'الإسكندرية', text: 'أفضل تجربة جلدية لي. د. حسن يستمع لاحتياجاتك ويقدم حلولاً فعالة جداً.' }
            ].map((testimonial, index) => (
              <div key={index} className="group relative" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl p-8 border border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">"</div>
                  
                  <div className="flex items-center mb-6 mt-2">
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(5)].map((_, i) => <span key={i} className="text-lg">★</span>)}
                    </div>
                  </div>
                  
                  <p className="text-slate-700 mb-6 italic leading-relaxed text-base">"{testimonial.text}"</p>
                  
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-4"></div>
                  
                  <p className="font-bold text-slate-900 text-lg">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 font-medium">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
