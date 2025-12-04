import React from 'react';
import { Link } from 'react-router-dom';
import { Car, CheckCircle, Clock, ArrowLeft, Play, Calendar, Users, TrendingUp, ShieldCheck } from 'lucide-react';
import { useModal } from "../../context/ModalContext";

const Hero = () => {
  const { openRegisterModal } = useModal();

  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-white">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 -right-28 w-72 h-72 rounded-full bg-gradient-to-br from-[#1A73E8]/20 to-[#00AEEF]/20 blur-2xl animate-pulse"></div>
      <div className="absolute -bottom-28 -left-28 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#1A73E8]/5 to-transparent blur-2xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="text-right space-y-6 lg:pr-6">
              {/* Welcome Badge */}
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-5 py-3 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#1A73E8] to-[#00AEEF] flex items-center justify-center shadow-md">
                  <Car className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-bold text-gray-800">مرحباً بك في مدرسة البركة للقيادة</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                <span className="block text-gray-900 mb-1">ابدأ رحلتك نحو</span>
                <span className="block relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#1A73E8] via-[#0099DD] to-[#00AEEF] animate-gradient">
                    قيادة آمنة
                  </span>
                  <svg className="absolute -bottom-1 right-0 w-full h-3" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10C50 5 150 2 298 7" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00AEEF" />
                        <stop offset="100%" stopColor="#1A73E8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl font-light">
                نقدم لك تجربة تعليم القيادة <span className="font-semibold text-gray-900">الأكثر تطوراً</span> في المنطقة. 
                مع مدربين محترفين ووسائل تعليمية حديثة، نحن هنا لنساعدك على 
                الحصول على رخصة قيادتك <span className="font-semibold text-gray-900">بكل ثقة وسهولة</span>.
              </p>
              
              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className="group flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-base">مدربون معتمدون</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">خبراء معتمدون من وزارة النقل بخبرة تزيد عن 10 سنوات</p>
                  </div>
                </div>
                
                <div className="group flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-base">مرونة تامة</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">جدول مرن يناسب أوقاتك مع إمكانية الحجز الفوري</p>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button
                  onClick={openRegisterModal}
                  className="group relative bg-gradient-to-l from-[#1A73E8] to-[#00AEEF] text-white px-8 py-4 rounded-2xl text-base font-bold hover:shadow-2xl transition-all duration-300 shadow-xl text-center flex items-center justify-center gap-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-l from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">ابدأ رحلة التعلم الآن</span>
                  <ArrowLeft className="relative z-10 h-4 w-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
                </button>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/study"
                    className="group border-2 border-[#1A73E8] text-[#1A73E8] px-6 py-3 rounded-2xl font-bold hover:bg-[#1A73E8] hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm"
                  >
                    <Play className="h-4 w-4 group-hover:scale-105 transition-transform" />
                    استعرض المواد
                  </Link>
                  
                  <Link
                    to="/appointments"
                    className="group bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl font-bold hover:bg-white transition-all duration-300 text-center flex items-center justify-center gap-2 border-2 border-gray-200 shadow-md hover:shadow-lg text-sm"
                  >
                    <Calendar className="h-4 w-4 group-hover:scale-105 transition-transform" />
                    احجز موعد
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual Content */}
            <div className="relative lg:pl-6">
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 transform hover:-translate-y-1 transition-transform group">
                <div className="aspect-square md:aspect-video lg:aspect-square relative overflow-hidden">
                  <img 
                    src="/cars.jpg" 
                    alt="مدرسة البركة للقيادة - سيارات التدريب الحديثة"
                    className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Clean gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-gray-900/5 to-transparent"></div>
                  
                  {/* Clean Stats Overlay - Blue & White Theme */}
                  <div className="absolute top-5 left-5 right-5">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-gray-100">
                      <div className="flex items-center justify-between gap-4">
                        {/* First Stat - Graduates */}
                        <div className="text-right flex-1">
                          <div className="flex items-center justify-end gap-3 mb-1">
                            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center shadow-sm border border-blue-100">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-2xl font-black text-gray-900 leading-none">١٠٠٠+</div>
                              <div className="text-xs font-semibold text-gray-600 mt-0.5">خريج ناجح</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">منذ تأسيس المدرسة</div>
                        </div>
                        
                        {/* Vertical divider */}
                        <div className="h-8 w-px bg-gray-200"></div>
                        
                        {/* Second Stat - Success Rate */}
                        <div className="text-right flex-1">
                          <div className="flex items-center justify-end gap-3 mb-1">
                            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center shadow-sm border border-blue-100">
                              <TrendingUp className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-2xl font-black text-gray-900 leading-none">٩٥٪</div>
                              <div className="text-xs font-semibold text-gray-600 mt-0.5">نسبة النجاح</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">أعلى نسبة في المنطقة</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Clean Certification Badge - Blue & Grey Theme */}
                  <div className="absolute bottom-5 right-5">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-3 border border-gray-700">
                      <div className="flex items-center gap-2.5">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center">
                            <ShieldCheck className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-white text-sm">مرخصة رسمياً</div>
                          <div className="text-xs text-gray-300 font-medium mt-0.5">وزارة النقل لبنان</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">ترخيص رقم: ٢٠٢٤-٨٧٦٥</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Alternative: Minimal Stat Badges on left side */}
                  <div className="absolute bottom-5 left-5 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-blue-100 flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-blue-600" />
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-gray-800">مدربون معتمدون</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-blue-100 flex items-center justify-center">
                          <Clock className="h-3 w-3 text-blue-600" />
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-gray-800">مرونة في المواعيد</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-[#1A73E8]/20 to-[#00AEEF]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-3 -left-3 w-28 h-28 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;