import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

export const About: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <div className="pt-20">
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-16">
            <div data-aos="fade-right">
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl overflow-hidden shadow-xl max-w-sm mx-auto">
                <img src="/img/dr hassan.jpeg" alt="Dr. Hassan Ashraf" className="w-full h-full object-cover" />
              </div>
            </div>

            <div data-aos="fade-left">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">د. حسن أشرف</h1>
              <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold mb-8">متخصص في الأمراض الجلدية والطب التجميلي</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">10+ سنوات خبرة</h3>
                    <p className="text-slate-600">خبرة في الأمراض الجلدية والطب التجميلي</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                    <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">تخصص متقدم</h3>
                    <p className="text-slate-600">علاجات جلدية متقدمة وإجراءات تجميلية</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">رعاية تركز على المريض</h3>
                    <p className="text-slate-600">خطط علاج شخصية لكل مريض</p>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                احجز استشارة
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-3xl p-8 sm:p-16 border border-blue-200/50 shadow-xl" data-aos="fade-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-slate-900 text-center">عن عيادة حسن أشرف</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600">رسالتنا</h3>
                </div>
                <p className="text-slate-700 leading-relaxed text-lg ml-16">
                  تقديم أفضل علاجات جلدية وتجميلية باستخدام أحدث التقنيات والطرق. نحن ملتزمون بمساعدة مرضانا على تحقيق بشرة صحية وجميلة من خلال الرعاية الشخصية والخبرة المهنية.
                </p>
              </div>
              <div className="group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-teal-600">رؤيتنا</h3>
                </div>
                <p className="text-slate-700 leading-relaxed text-lg ml-16">
                  أن نكون العيادة الرائدة في الأمراض الجلدية بالقاهرة، معروفة بالتميز في رعاية المريض والعلاجات المبتكرة والنتائج الاستثنائية.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-slate-900" data-aos="fade-up">لماذا تختارنا</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 text-center" data-aos="fade-up" data-aos-delay="100">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">رعاية متخصصة</h3>
                <p className="text-slate-600">طبيب جلدية ذو خبرة وسجل حافل بالعلاجات الناجحة</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 border border-teal-100 text-center" data-aos="fade-up" data-aos-delay="200">
                <div className="text-5xl mb-4">🔬</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">تكنولوجيا متقدمة</h3>
                <p className="text-slate-600">أحدث معدات جلدية وطرق علاج</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 text-center" data-aos="fade-up" data-aos-delay="300">
                <div className="text-5xl mb-4">💎</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">خدمة متميزة</h3>
                <p className="text-slate-600">خطط علاج شخصية ورعاية مريض استثنائية</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
