import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { API_ENDPOINTS, httpClient, Service, ApiResponse } from '../config/api';

export const Services: React.FC = () => {
  const [cleaning, setCleaning] = useState<Service[]>([]);
  const [hair, setHair] = useState<Service[]>([]);
  const [skin, setSkin] = useState<Service[]>([]);
  const [cosmetic, setCosmetic] = useState<Service[]>([]);
  const [cupping, setCupping] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response: ApiResponse<{ [key: string]: Service[] }> = await httpClient.get(API_ENDPOINTS.SERVICES_GROUPED);
      
      if (response.success && response.data) {
        setCleaning(response.data.cleaning || []);
        setHair(response.data.hair_treatment || []);
        setSkin(response.data.skin_treatment || []);
        setCosmetic(response.data.cosmetic || []);
        setCupping(response.data.cupping || []);
      }
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Category images mapping
  const categoryImages: { [key: string]: string } = {
    'cleaning': '/img/facial clean.jpg',
    'hair_treatment': '/img/therapeutic sessions.jpg',
    'skin_treatment': '/img/rejuvenation.jpg',
    'cosmetic': '/img/cheeks rejuvenation.jpg',
    'cupping': '/img/hijama - full back.jpg'
  };

  const ServiceCard = ({ service, color }: { service: Service; color: string }) => (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-300 hover:-translate-y-1" data-aos="fade-up">
      <div className="mb-3">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{service.description || 'Professional treatment'}</p>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
        <div>
          <p className="text-xs text-slate-500 mb-1">السعر</p>
          <p className={`text-3xl font-bold ${color}`}>{service.price} <span className="text-lg">جنيه</span></p>
        </div>
        <Link 
          to={`/booking?service=${encodeURIComponent(service.name)}`} 
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          احجز الآن
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="pt-20">
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-slate-900" data-aos="fade-up">خدماتنا</h1>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            علاجات جلدية شاملة مصممة خصيصاً لاحتياجات بشرتك الفريدة
          </p>

          {/* Cleaning Sessions */}
          <div className="mb-16">
            {/* Category Header with Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-slate-200" data-aos="fade-up">
              <div className="relative h-72 sm:h-96 overflow-hidden">
                <img 
                  src={categoryImages['cleaning']} 
                  alt="جلسات التنظيف" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-white">جلسات التنظيف</h2>
                      <p className="text-blue-100 text-sm mt-1">تنظيف عميق واحترافي للبشرة</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 animate-pulse">
                      <div className="mb-4 h-48 bg-slate-200 rounded-lg"></div>
                      <div className="h-6 bg-slate-200 rounded mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded"></div>
                    </div>
                  ))}
                </>
              ) : cleaning.length > 0 ? (
                cleaning.map((service) => <ServiceCard key={service.id} service={service} color="text-blue-600" />)
              ) : (
                <p className="text-slate-500">No cleaning sessions available</p>
              )}
            </div>
          </div>

          {/* Hair Treatment Sessions */}
          <div className="mb-16">
            {/* Category Header with Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-slate-200" data-aos="fade-up">
              <div className="relative h-72 sm:h-96 overflow-hidden">
                <img 
                  src={categoryImages['hair_treatment']} 
                  alt="جلسات علاج الشعر" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-white">جلسات علاج الشعر</h2>
                      <p className="text-teal-100 text-sm mt-1">علاجات متقدمة لصحة وجمال الشعر</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 animate-pulse">
                      <div className="mb-4 h-48 bg-slate-200 rounded-lg"></div>
                      <div className="h-6 bg-slate-200 rounded mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded"></div>
                    </div>
                  ))}
                </>
              ) : hair.length > 0 ? (
                hair.map((service) => <ServiceCard key={service.id} service={service} color="text-teal-600" />)
              ) : (
                <p className="text-slate-500">No hair treatment sessions available</p>
              )}
            </div>
          </div>

          {/* Skin Treatment Sessions */}
          <div className="mb-16">
            {/* Category Header with Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-slate-200" data-aos="fade-up">
              <div className="relative h-72 sm:h-96 overflow-hidden">
                <img 
                  src={categoryImages['skin_treatment']} 
                  alt="جلسات علاج البشرة" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-cyan-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-white">جلسات علاج البشرة</h2>
                      <p className="text-cyan-100 text-sm mt-1">حلول متكاملة لنضارة وجمال البشرة</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 animate-pulse">
                      <div className="mb-4 h-48 bg-slate-200 rounded-lg"></div>
                      <div className="h-6 bg-slate-200 rounded mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded"></div>
                    </div>
                  ))}
                </>
              ) : skin.length > 0 ? (
                skin.map((service) => <ServiceCard key={service.id} service={service} color="text-cyan-600" />)
              ) : (
                <p className="text-slate-500">No skin treatment sessions available</p>
              )}
            </div>
          </div>

          {/* Cosmetic Services (Filler, Botox, Skin Booster) */}
          <div className="mb-16">
            {/* Category Header with Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-slate-200" data-aos="fade-up">
              <div className="relative h-72 sm:h-96 overflow-hidden">
                <img 
                  src={categoryImages['cosmetic']} 
                  alt="خدمات تجميلية" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-white">خدمات تجميلية</h2>
                      <p className="text-purple-100 text-sm mt-1">فيلر، بوتكس، وسكين بوستر</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 animate-pulse">
                      <div className="mb-4 h-48 bg-slate-200 rounded-lg"></div>
                      <div className="h-6 bg-slate-200 rounded mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded"></div>
                    </div>
                  ))}
                </>
              ) : cosmetic.length > 0 ? (
                cosmetic.map((service) => <ServiceCard key={service.id} service={service} color="text-purple-600" />)
              ) : (
                <p className="text-slate-500">No cosmetic services available</p>
              )}
            </div>
          </div>

          {/* Cupping Services */}
          <div>
            {/* Category Header with Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-slate-200" data-aos="fade-up">
              <div className="relative h-72 sm:h-96 overflow-hidden">
                <img 
                  src={categoryImages['cupping']} 
                  alt="الحجامة" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-white">الحجامة</h2>
                      <p className="text-amber-100 text-sm mt-1">علاج طبيعي تقليدي (للرجال فقط)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <>
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 animate-pulse">
                      <div className="mb-4 h-48 bg-slate-200 rounded-lg"></div>
                      <div className="h-6 bg-slate-200 rounded mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded"></div>
                    </div>
                  ))}
                </>
              ) : cupping.length > 0 ? (
                cupping.map((service) => <ServiceCard key={service.id} service={service} color="text-amber-600" />)
              ) : (
                <p className="text-slate-500">No cupping services available</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
