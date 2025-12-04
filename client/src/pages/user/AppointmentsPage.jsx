import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppointmentStore } from '../../store/appointmentStore';
import { useAuthStore } from '../../store/authStore';
import { Calendar, Clock, User, Car, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppointmentsPage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { availableSlots, bookAppointment } = useAppointmentStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSlotSelect = (slot) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/appointments' } });
      return;
    }
    
    if (slot.available) {
      setSelectedSlot(slot);
      setShowForm(true);
    }
  };

  const onSubmit = (data) => {
    const appointment = {
      id: Date.now(),
      userId: user.id,
      userName: user.name || data.name,
      userEmail: user.email || data.email,
      slotId: selectedSlot.id,
      date: new Date().toISOString(),
      day: selectedSlot.day,
      time: selectedSlot.time,
      lessonType: data.lessonType,
      notes: data.notes,
      status: 'pending'
    };
    
    bookAppointment(appointment);
    setShowForm(false);
    setSelectedSlot(null);
  };

  if (!isAuthenticated) {
    navigate('/login', { state: { from: '/appointments' } });
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold mb-4">حجز مواعيد دروس القيادة</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اختر الوقت المناسب لك واحجز درس قيادة مع أفضل المدربين المعتمدين
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Available Slots */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Calendar className="ml-2" />
                  المواعيد المتاحة
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableSlots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => handleSlotSelect(slot)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        slot.available
                          ? 'border-gray-200 hover:border-primary-blue hover:shadow-md'
                          : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                      } ${selectedSlot?.id === slot.id ? 'border-primary-blue bg-blue-50' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{slot.day}</span>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          slot.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {slot.available ? 'متاح' : 'محجوز'}
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock size={16} className="ml-1" />
                        <span>{slot.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              {showForm && selectedSlot && (
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-6">تفاصيل الحجز</h3>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          الاسم الكامل
                        </label>
                        <input
                          {...register('name', { required: 'الاسم مطلوب' })}
                          defaultValue={user?.name || ''}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                          placeholder="أدخل اسمك الكامل"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                          defaultValue={user?.email || ''}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                          placeholder="example@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نوع الدرس
                      </label>
                      <select
                        {...register('lessonType', { required: 'نوع الدرس مطلوب' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                      >
                        <option value="">اختر نوع الدرس</option>
                        <option value="beginner">مبتدئ - الدرس الأول</option>
                        <option value="intermediate">متوسط - تحسين المهارات</option>
                        <option value="advanced">متقدم - القيادة على الطرق السريعة</option>
                        <option value="parking">تدريب على ركن السيارات</option>
                        <option value="night">قيادة ليلية</option>
                      </select>
                      {errors.lessonType && (
                        <p className="mt-1 text-sm text-red-600">{errors.lessonType.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ملاحظات إضافية (اختياري)
                      </label>
                      <textarea
                        {...register('notes')}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                        placeholder="أي ملاحظات أو متطلبات خاصة"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">تفاصيل الموعد:</span>
                        <span className="text-primary-blue">{selectedSlot.day} - {selectedSlot.time}</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        سيتم تأكيد الحجز عبر البريد الإلكتروني. يرجى الحضور قبل الموعد بـ 10 دقائق.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setSelectedSlot(null);
                        }}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-primary-blue text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={20} />
                        تأكيد الحجز
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Instructions Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Car className="ml-2" />
                  إرشادات الحجز
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 text-primary-blue rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                      1
                    </div>
                    <span>اختر موعداً مناسباً من الجدول</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 text-primary-blue rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                      2
                    </div>
                    <span>املأ معلوماتك وحدد نوع الدرس</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 text-primary-blue rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                      3
                    </div>
                    <span>تأكيد الحجز عبر البريد الإلكتروني</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 text-primary-blue rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                      4
                    </div>
                    <span>الحضور قبل الموعد بـ 10 دقائق</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary-blue text-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">معلومات مهمة</h3>
                <ul className="space-y-2">
                  <li>• مدة الدرس: ساعتان</li>
                  <li>• يرجى إحضار الرخصة إن وجدت</li>
                  <li>• يمكن إلغاء الحجز قبل 24 ساعة</li>
                  <li>• سيارات التدريس مؤمنة بالكامل</li>
                  <li>• مدربون معتمدون من المرور</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;