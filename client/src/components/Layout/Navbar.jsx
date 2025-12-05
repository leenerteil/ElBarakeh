import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, Home, BookOpen, Calendar, Menu, X, Car, Users } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useModal } from '../../context/ModalContext';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuthStore();
  const { openLoginModal, openRegisterModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'الرئيسية', icon: <Home size={22} /> },
    { path: '/about', label: 'من نحن', icon: <Users size={22} /> },
    { path: '/study', label: 'المادة الدراسية', icon: <BookOpen size={22} />, requiresAuth: true },
    { path: '/quiz', label: 'اختبار القيادة', icon: <Car size={22} />, requiresAuth: true },
    { path: '/appointments', label: 'حجز موعد', icon: <Calendar size={22} />, requiresAuth: true },
  ];

  const adminLinks = [
    { path: '/admin/users', label: 'إدارة المستخدمين' },
    { path: '/admin/schedule', label: 'إدارة الجدول' },
    { path: '/admin/appointments', label: 'الحجوزات' },
  ];

  const handleNavLinkClick = (link) => {
    if (link.requiresAuth && !isAuthenticated) {
      openLoginModal();
      return false;
    }
    return true;
  };

  const handleStudyLinkClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openLoginModal({
        onSuccess: () => {
          navigate('/study');
        }
      });
    } else {
      navigate('/study');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#1A73E8] text-white shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
          
          {/* Logo and Brand */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden ml-2 sm:ml-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="قائمة التنقل"
            >
              {isMobileMenuOpen ? <X size={24} className="sm:w-6 sm:h-6" /> : <Menu size={24} className="sm:w-6 sm:h-6" />}
            </button>
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 flex items-center justify-center">
                <img 
                  src="/barake.png" 
                  alt="مدرسة البركة للقيادة" 
                  className="h-full w-auto object-contain max-h-full"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'h-full w-full flex items-center justify-center';
                    fallback.innerHTML = `
                      <div class="text-white font-bold text-lg sm:text-xl md:text-2xl flex items-center justify-center">
                        <Car class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-1" />
                        <span>البركة</span>
                      </div>
                    `;
                    e.target.parentNode.insertBefore(fallback, e.target);
                  }}
                />
              </div>
              
              {/* Brand text */}
              <div className="text-right">
                <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold block leading-tight">
                  مدرسة البركة للقيادة
                </span>
                <span className="text-xs sm:text-sm md:text-base text-blue-100 block mt-0.5 sm:mt-1 leading-tight">
                  تعليم القيادة باحترافية
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {/* Navigation Links */}
            <div className="flex items-center gap-3 lg:gap-4 xl:gap-6">
              {navLinks.map((link) => (
                <React.Fragment key={link.path}>
                  {link.path === '/study' ? (
                    <button
                      onClick={handleStudyLinkClick}
                      className={`flex items-center gap-1 lg:gap-2 hover:text-blue-200 transition-colors text-sm lg:text-base xl:text-lg ${
                        location.pathname === link.path ? 'text-blue-200 font-bold border-b-2 border-white pb-1 lg:pb-2' : ''
                      }`}
                    >
                      <span className="hidden lg:inline">{link.label}</span>
                      <span className="lg:hidden">{link.label.split(' ')[0]}</span>
                      {link.icon}
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 lg:gap-2 hover:text-blue-200 transition-colors text-sm lg:text-base xl:text-lg ${
                        location.pathname === link.path ? 'text-blue-200 font-bold border-b-2 border-white pb-1 lg:pb-2' : ''
                      }`}
                    >
                      <span className="hidden lg:inline">{link.label}</span>
                      <span className="lg:hidden">{link.label.split(' ')[0]}</span>
                      {link.icon}
                    </Link>
                  )}
                </React.Fragment>
              ))}
              
              {isAdmin && (
                <div className="flex items-center gap-2 lg:gap-3 border-r-2 border-blue-400 pr-2 lg:pr-3">
                  {adminLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`hover:text-blue-200 transition-colors px-2 py-1 rounded text-sm lg:text-base ${
                        location.pathname === link.path ? 'text-blue-200 font-bold bg-white/10' : ''
                      }`}
                    >
                      <span className="hidden lg:inline">{link.label}</span>
                      <span className="lg:hidden">{link.label.split(' ')[1] || link.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
              {isAuthenticated ? (
                <>
                  {/* User info */}
                  <div className="flex items-center gap-1 lg:gap-2">
                    <div className="w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <User size={14} className="lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                    </div>
                    <span className="text-xs lg:text-sm xl:text-base hidden lg:inline">
                      {user?.name?.split(' ')[0] || 'المستخدم'}
                    </span>
                  </div>
                  
                  {/* Logout button */}
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 hover:text-blue-200 transition-colors text-xs lg:text-sm xl:text-base"
                  >
                    <span className="hidden lg:inline">تسجيل الخروج</span>
                    <span className="lg:hidden">خروج</span>
                    <LogOut size={14} className="lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                  </button>
                </>
              ) : (
                <>
                  {/* Login button - Opens Modal */}
                  <button
                    onClick={openLoginModal}
                    className="px-3 py-1.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 rounded-lg hover:bg-[#0d5dc2] transition-colors border border-white/30 text-xs lg:text-sm xl:text-base"
                  >
                    <span className="hidden lg:inline">تسجيل الدخول</span>
                    <span className="lg:hidden">دخول</span>
                  </button>
                  
                  {/* Register button - Opens Modal */}
                  <button
                    onClick={openRegisterModal}
                    className="px-3 py-1.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 bg-white text-[#1A73E8] rounded-lg hover:bg-gray-100 transition-colors font-bold text-xs lg:text-sm xl:text-base shadow"
                  >
                    <span className="hidden lg:inline">إنشاء حساب</span>
                    <span className="lg:hidden">تسجيل</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Auth Button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="text-sm hidden sm:inline">
                  {user?.name?.split(' ')[0] || 'المستخدم'}
                </span>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="px-3 py-1.5 rounded border border-white/30 text-xs sm:text-sm"
              >
                دخول
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1A73E8] border-t border-blue-400 py-3 sm:py-4">
            <div className="space-y-2 sm:space-y-3">
              {navLinks.map((link) => (
                <React.Fragment key={link.path}>
                  {link.path === '/study' ? (
                    <button
                      onClick={handleStudyLinkClick}
                      className={`flex items-center justify-between w-full p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                        location.pathname === link.path 
                          ? 'bg-white/10 text-white' 
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      {React.cloneElement(link.icon, { size: 20 })}
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                        location.pathname === link.path 
                          ? 'bg-white/10 text-white' 
                          : 'hover:bg-white/5'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      {React.cloneElement(link.icon, { size: 20 })}
                    </Link>
                  )}
                </React.Fragment>
              ))}
              
              {isAdmin && (
                <div className="border-t border-blue-400 pt-3 sm:pt-4 mt-2 sm:mt-3">
                  <p className="text-xs sm:text-sm text-blue-200 px-3 sm:px-4 mb-2 sm:mb-3">إدارة النظام</p>
                  {adminLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                        location.pathname === link.path 
                          ? 'bg-white/10 text-white' 
                          : 'hover:bg-white/5'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {isAuthenticated ? (
                <>
                  <div className="border-t border-blue-400 pt-3 sm:pt-4 mt-2 sm:mt-3">
                    <div className="flex items-center justify-between p-3 sm:p-4">
                      <span className="text-sm sm:text-base">{user?.name || 'المستخدم'}</span>
                      <User size={20} className="sm:w-5 sm:h-5" />
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between w-full p-3 sm:p-4 rounded-lg hover:bg-white/5 text-sm sm:text-base"
                    >
                      <span>تسجيل الخروج</span>
                      <LogOut size={20} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-3 sm:pt-4 border-t border-blue-400 space-y-2">
                  <button
                    onClick={() => {
                      openRegisterModal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-center py-2.5 sm:py-3 bg-white text-[#1A73E8] rounded-lg font-bold text-sm sm:text-base shadow"
                  >
                    إنشاء حساب جديد
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;