import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { API_ENDPOINTS, httpClient, Branch, ApiResponse } from '../config/api';

export const Branches: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const response: ApiResponse<Branch[]> = await httpClient.get(API_ENDPOINTS.BRANCHES);
      
      if (response.success && response.data) {
        setBranches(response.data);
      }
    } catch (error) {
      console.error('Error loading branches:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-slate-900" data-aos="fade-up">الفروع</h1>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            زرنا في أحد فروعنا المتعددة عبر القاهرة
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {loading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 animate-pulse">
                    <div className="h-6 bg-slate-200 rounded mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                  </div>
                ))}
              </>
            ) : branches.length > 0 ? (
              branches.map((branch, index) => {
                const workingDays = branch.working_days?.join(', ') || '-';
                const phones = branch.phone_numbers?.join(', ') || '-';

                return (
                  <div key={branch.id} className="branch-card bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
                    <div className="flex items-center mb-4">
                      <div className="icon-box w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">{branch.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${branch.state === 'open' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                          {branch.state === 'open' ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-2"><strong>📍 Address:</strong> {branch.address}</p>
                    <p className="text-slate-600 mb-2"><strong>📞 Phone:</strong> {phones}</p>
                    <p className="text-slate-600 mb-6"><strong>🕐 أيام العمل:</strong> {workingDays}</p>
                    <div className="flex gap-2">
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex-1 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center">
                        View on Maps
                      </a>
                      <Link to="/booking" className="flex-1 inline-block px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold text-center">
                        احجز الآن
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-slate-500">No branches available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
