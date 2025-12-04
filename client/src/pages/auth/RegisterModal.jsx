import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useModal } from '../../context/ModalContext';

const RegisterModal = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const { register: registerUser } = useAuthStore();
  const { isRegisterOpen, closeModal, switchToLogin } = useModal();

  const password = watch('password');

  const onSubmit = (data) => {
    registerUser({
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'user'
    });
    closeModal();
    reset();
  };

  if (!isRegisterOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute left-4 top-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors shadow-md"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Full Container Image with Border */}
            <div className="hidden lg:block relative bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="absolute inset-4 rounded-xl border-4 border-white shadow-lg overflow-hidden bg-white">
                <div className="h-full w-full flex items-center justify-center">
                  <img 
                    src="/barake2.png" 
                    alt="مدرسة البركة للقيادة" 
                    className="h-full w-full object-contain p-6"
                    onError={(e) => {
                      console.error('Logo image failed to load');
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="h-full w-full flex flex-col items-center justify-center text-gray-400 p-8">
                          <div class="text-5xl mb-4">🚗</div>
                          <div class="text-xl font-bold mb-2">مدرسة البركة</div>
                          <div class="text-lg">للقيادة</div>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-6 md:p-8 lg:p-10">
              <div className="text-right mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  إنشاء حساب جديد
                </h2>
                <p className="text-gray-600 mt-2 text-lg">
                  سجل الآن وابدأ رحلة تعلم القيادة
                </p>
              </div>

              <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      الاسم الكامل
                    </label>
                    <input
                      {...register('name', { required: 'الاسم مطلوب' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-right shadow-sm"
                      placeholder="أدخل اسمك الكامل"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 text-right">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      رقم الهاتف
                    </label>
                    <input
                      {...register('phone', {
                        required: 'رقم الهاتف مطلوب',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'رقم هاتف غير صالح'
                        }
                      })}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-right shadow-sm"
                      placeholder="05XXXXXXXX"
                      dir="ltr"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 text-right">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    البريد الإلكتروني
                  </label>
                  <input
                    {...register('email', {
                      required: 'البريد الإلكتروني مطلوب',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'بريد إلكتروني غير صالح'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-right shadow-sm"
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 text-right">{errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      كلمة المرور
                    </label>
                    <input
                      {...register('password', {
                        required: 'كلمة المرور مطلوبة',
                        minLength: {
                          value: 6,
                          message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
                        }
                      })}
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-right shadow-sm"
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600 text-right">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      تأكيد كلمة المرور
                    </label>
                    <input
                      {...register('confirmPassword', {
                        required: 'يرجى تأكيد كلمة المرور',
                        validate: value => value === password || 'كلمات المرور غير متطابقة'
                      })}
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent text-right shadow-sm"
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600 text-right">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1A73E8] text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md hover:shadow-lg mt-4"
                >
                  إنشاء حساب
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  لديك حساب بالفعل؟{' '}
                  <button
                    onClick={switchToLogin}
                    className="text-[#1A73E8] hover:text-blue-700 font-semibold"
                  >
                    تسجيل الدخول
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;