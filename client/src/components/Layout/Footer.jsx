import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A73E8] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          
          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Brand Section - LEFT ALIGNED */}
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center">
                  <img 
                    src="/barake.png" 
                    alt="مدرسة البركة للقيادة" 
                    className="h-full w-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="h-full w-full bg-white/10 rounded-lg flex items-center justify-center">
                          <span class="text-white font-bold text-lg md:text-xl">البركة</span>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">مدرسة البركة للقيادة</h3>
                  <p className="text-blue-100 text-sm md:text-base mt-1">تعليم القيادة باحترافية</p>
                </div>
              </div>
              <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                نقدم أفضل برامج تعليم القيادة بأحدث الأساليب التعليمية ومعلمين معتمدين.
              </p>
            </div>

            {/* Contact Information - CENTER ALIGNED */}
            <div className="space-y-4 text-center">
              <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6">معلومات الاتصال</h4>
              <div className="space-y-3 md:space-y-4">
                {/* Phone */}
                <div className="flex items-center justify-center gap-3">
                  <Phone className="h-5 w-5 text-blue-100 flex-shrink-0" />
                  <span className="text-sm md:text-base">+966 55 123 4567</span>
                </div>
                {/* Email */}
                <div className="flex items-center justify-center gap-3">
                  <Mail className="h-5 w-5 text-blue-100 flex-shrink-0" />
                  <span className="text-sm md:text-base dir-ltr">info@albarakeh-driving.com</span>
                </div>
                {/* Address */}
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-100 flex-shrink-0" />
                  <span className="text-sm md:text-base">الرياض، حي العليا، شارع الملك فهد</span>
                </div>
                {/* Hours */}
                <div className="flex items-center justify-center gap-3">
                  <Clock className="h-5 w-5 text-blue-100 flex-shrink-0" />
                  <span className="text-sm md:text-base">الأحد - الخميس: 8 صباحاً - 8 مساءً</span>
                </div>
              </div>
            </div>

            {/* Quick Links - RIGHT ALIGNED */}
            <div className="space-y-4 text-right">
              <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6">روابط سريعة</h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link to="/about" className="text-blue-100 hover:text-white text-sm md:text-base transition-colors block py-1">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link to="/study" className="text-blue-100 hover:text-white text-sm md:text-base transition-colors block py-1">
                    المادة الدراسية
                  </Link>
                </li>
                <li>
                  <Link to="/quiz" className="text-blue-100 hover:text-white text-sm md:text-base transition-colors block py-1">
                    اختبارات القيادة
                  </Link>
                </li>
                <li>
                  <Link to="/appointments" className="text-blue-100 hover:text-white text-sm md:text-base transition-colors block py-1">
                    حجز موعد
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-blue-100 hover:text-white text-sm md:text-base transition-colors block py-1">
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Optional: Footer Bottom */}
          <div className="border-t border-blue-400 mt-8 pt-6 text-center">
            <p className="text-blue-100 text-sm">
              © {currentYear} مدرسة البركة للقيادة. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;