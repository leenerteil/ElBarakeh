import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useModal } from '../../context/ModalContext';
import { useNavigate } from 'react-router-dom';

const LoginModal = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { login } = useAuthStore();
  const { isLoginOpen, closeModal, switchToRegister, handleLoginSuccess } = useModal();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Call the login function from auth store
      await login({
        id: 1,
        name: data.email.split('@')[0],
        email: data.email,
        role: 'user'
      });
      
      // Reset form
      reset();
      
      // Handle login success (this includes closing the modal)
      handleLoginSuccess();
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute left-4 top-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors shadow-md"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Form */}
            <div className="p-6 md:p-8 lg:p-10">
              <div className="text-right mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  تسجيل الدخول
                </h2>
                <p className="text-gray-600 mt-2 text-lg">
                  أدخل بياناتك للوصول إلى حسابك
                </p>
              </div>

              <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#1A73E8] focus:ring-[#1A73E8] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
                      تذكرني
                    </label>
                  </div>
                  <button type="button" className="text-sm text-[#1A73E8] hover:text-blue-700 font-medium">
                    نسيت كلمة المرور؟
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1A73E8] text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
                >
                  تسجيل الدخول
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  ليس لديك حساب؟{' '}
                  <button
                    onClick={switchToRegister}
                    className="text-[#1A73E8] hover:text-blue-700 font-semibold"
                  >
                    إنشاء حساب جديد
                  </button>
                </p>
              </div>
            </div>

            {/* Right side - Full Container Image with Border */}
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
                          <p class="text-xl font-bold mb-2">مدرسة البركة</p>
                          <p class="text-lg">للقيادة</p>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;