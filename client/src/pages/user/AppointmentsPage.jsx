import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppointmentStore } from '../../store/appointmentStore';
import { useAuthStore } from '../../store/authStore';
import { Calendar, Clock, ChevronRight, ChevronLeft, X, Plus, Minus, CheckCircle, Trash2, Menu, X as XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, parseISO, isToday, isPast, isSameDay } from 'date-fns';
import { ar } from 'date-fns/locale';
import AppointmentConfirmation from '../../components/Appointments/AppointmentConfirmation';

const AppointmentsPage = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [dateSessions, setDateSessions] = useState({});
  const [dateTimeSelections, setDateTimeSelections] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showMobileCalendar, setShowMobileCalendar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { availableSlots, bookAppointment, getSlotsByDate, getAvailableDates } = useAppointmentStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get available dates for the calendar
  const availableDates = getAvailableDates();
  
  // Generate calendar days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Navigation guards
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/appointments' } });
    }
  }, [isAuthenticated, navigate]);

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setValue('name', user.name || '');
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  const handleDateSelect = (dateStr) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/appointments' } });
      return;
    }
    
    const date = parseISO(dateStr);
    if (isPast(date) && !isToday(date)) return;
    
    if (availableDates.includes(dateStr)) {
      if (selectedDates.includes(dateStr)) {
        // Remove date from selection
        setSelectedDates(prev => prev.filter(d => d !== dateStr));
        
        // Clean up session data for removed date
        const newSessions = { ...dateSessions };
        const newSelections = { ...dateTimeSelections };
        delete newSessions[dateStr];
        delete newSelections[dateStr];
        setDateSessions(newSessions);
        setDateTimeSelections(newSelections);
      } else {
        // Add date to selection
        setSelectedDates(prev => [...prev, dateStr]);
        
        // Initialize with 1 session for new date
        setDateSessions(prev => ({
          ...prev,
          [dateStr]: 1
        }));
        
        // Initialize time selections as empty
        setDateTimeSelections(prev => ({
          ...prev,
          [dateStr]: []
        }));
      }
    }
    
    // On mobile, hide calendar after selection
    if (isMobile) {
      setShowMobileCalendar(false);
    }
  };

  const updateDateSessions = (dateStr, count) => {
    const newCount = Math.max(1, Math.min(10, count));
    setDateSessions(prev => ({
      ...prev,
      [dateStr]: newCount
    }));
    
    // Clear time selections if reducing sessions
    const currentSelections = dateTimeSelections[dateStr] || [];
    if (newCount < currentSelections.length) {
      setDateTimeSelections(prev => ({
        ...prev,
        [dateStr]: currentSelections.slice(0, newCount)
      }));
    } else if (newCount > currentSelections.length) {
      setDateTimeSelections(prev => ({
        ...prev,
        [dateStr]: [...currentSelections, ...Array(newCount - currentSelections.length).fill(null)]
      }));
    }
  };

  const handleTimeSelect = (dateStr, sessionIndex, timeSlot) => {
    setDateTimeSelections(prev => {
      const dateSelections = prev[dateStr] || [];
      const newSelections = [...dateSelections];
      
      if (newSelections[sessionIndex]?.time === timeSlot.time) {
        // Deselect if same time clicked
        newSelections[sessionIndex] = null;
      } else {
        // Select new time
        newSelections[sessionIndex] = timeSlot;
      }
      
      return {
        ...prev,
        [dateStr]: newSelections
      };
    });
  };

  const onSubmit = (data) => {
    if (selectedDates.length === 0) return;
    
    // Create appointments for each date and session
    const appointments = [];
    
    selectedDates.forEach(dateStr => {
      const sessions = dateSessions[dateStr] || 1;
      const timeSelections = dateTimeSelections[dateStr] || [];
      
      // Check if all sessions have time slots selected
      const hasMissingTimeSlot = timeSelections.length < sessions || timeSelections.some(slot => !slot);
      if (hasMissingTimeSlot) {
        alert('الرجاء تحديد موعد لكل الحصص المطلوبة');
        return;
      }
      
      for (let i = 0; i < sessions; i++) {
        const timeSlot = timeSelections[i];
        if (!timeSlot) continue; // Skip if no time selected
        
        const appointment = {
          id: Date.now() + i,
          userId: user?.id,
          userName: data.name,
          userEmail: data.email,
          userPhone: data.phone,
          slotId: timeSlot.slotId,
          date: new Date().toISOString(),
          bookingDate: dateStr,
          day: format(parseISO(dateStr), 'EEEE', { locale: ar }),
          time: timeSlot.time,
          lessonType: data.lessonType,
          instructorId: timeSlot.instructorId,
          notes: data.notes,
          status: 'confirmed',
          dateDisplay: format(parseISO(dateStr), 'dd MMMM yyyy', { locale: ar }),
          sessionNumber: i + 1,
          totalSessions: sessions
        };
        
        // Book appointment
        bookAppointment(appointment);
        appointments.push(appointment);
      }
    });
    
    if (appointments.length > 0) {
      // Set booking details for confirmation modal
      setBookingDetails({
        appointments: appointments,
        totalSessions: selectedDates.reduce((total, date) => total + (dateSessions[date] || 1), 0),
        dates: selectedDates.map(date => ({
          dateStr: date,
          display: format(parseISO(date), 'dd MMMM yyyy', { locale: ar }),
          day: format(parseISO(date), 'EEEE', { locale: ar }),
          sessions: dateSessions[date] || 1
        }))
      });
      
      // Show confirmation modal
      setShowConfirmation(true);
      
      // Reset form
      setSelectedDates([]);
      setDateSessions({});
      setDateTimeSelections({});
      reset();
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  // Get day of month start for calendar alignment
  const startDay = monthStart.getDay();

  // Check if all selected dates have complete time selections
  // FIXED: Only check for sessions that have available time slots
  const allSessionsHaveTime = selectedDates.every(dateStr => {
    const sessions = dateSessions[dateStr] || 1;
    const timeSelections = dateTimeSelections[dateStr] || [];
    const dateSlots = getSlotsByDate(dateStr);
    const availableHours = dateSlots.filter(slot => slot.available);
    
    // If there are no available hours at all, we should still allow submission
    // but with a warning or by automatically excluding this date
    if (availableHours.length === 0) {
      return true; // Allow submission, but handle in onSubmit
    }
    
    // Check if all sessions have time selected
    for (let i = 0; i < sessions; i++) {
      if (!timeSelections[i]) return false;
    }
    return true;
  });

  // Check if form is ready for submission
  const isFormReady = () => {
    // Basic validation
    if (selectedDates.length === 0) return false;
    
    // Check if there's at least one session with time selected
    let hasAtLeastOneSession = false;
    
    selectedDates.forEach(dateStr => {
      const sessions = dateSessions[dateStr] || 1;
      const timeSelections = dateTimeSelections[dateStr] || [];
      
      for (let i = 0; i < sessions; i++) {
        if (timeSelections[i]) {
          hasAtLeastOneSession = true;
        }
      }
    });
    
    return hasAtLeastOneSession;
  };

  // Calendar Component (Reusable)
  const CalendarComponent = ({ className = '' }) => (
    <div className={`bg-white rounded-xl shadow-lg p-4 ${className}`}>
      {/* Calendar Header - Smaller and cleaner */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar className="text-primary-blue ml-2" size={18} />
          <h3 className="text-base font-semibold text-gray-800">التقويم</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="الشهر السابق"
          >
            <ChevronRight size={18} />
          </button>
          <span className="font-medium text-gray-800 text-sm min-w-[100px] text-center">
            {format(currentMonth, 'MMMM yyyy', { locale: ar })}
          </span>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="الشهر التالي"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-600 py-1">
            {day.substring(0, 1)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for alignment */}
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={`empty-${index}`} className="h-8"></div>
        ))}
        
        {calendarDays.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const isAvailable = availableDates.includes(dateStr);
          const isSelected = selectedDates.includes(dateStr);
          const isDatePast = isPast(day) && !isToday(day);
          const isDateToday = isToday(day);
          
          return (
            <div key={dateStr} className="flex items-center justify-center">
              <button
                onClick={() => handleDateSelect(dateStr)}
                disabled={isDatePast || !isAvailable}
                className={`
                  relative flex items-center justify-center
                  h-8 w-8 rounded-full transition-all duration-200
                  text-sm font-medium
                  ${isSelected 
                    ? 'bg-transparent text-gray-900' 
                    : ''
                  }
                  ${!isSelected && isAvailable && !isDatePast 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : ''
                  }
                  ${isDatePast 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : ''
                  }
                  ${!isAvailable && !isSelected && !isDatePast 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : ''
                  }
                  ${isDateToday && !isSelected 
                    ? 'text-primary-blue font-semibold' 
                    : ''
                  }
                `}
              >
                {/* Selection circle */}
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-7 h-7 border-2 border-primary-blue border-opacity-100 rounded-full flex items-center justify-center"></div>
                  </div>
                )}
                
                {/* Date number */}
                <span className={`
                  relative z-10
                  ${isSelected ? 'text-primary-blue font-bold' : ''}
                `}>
                  {format(day, 'd')}
                </span>
                
                {/* Today indicator dot */}
                {isDateToday && !isSelected && (
                  <div className="absolute bottom-0 w-1 h-1 bg-primary-blue rounded-full"></div>
                )}
                
                {/* Available indicator dot */}
                {isAvailable && !isSelected && !isDatePast && !isDateToday && (
                  <div className="absolute bottom-0 w-1 h-1 bg-green-500 rounded-full"></div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Dates Summary - Cleaner */}
      {selectedDates.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-800 text-sm">التواريخ المحددة</h4>
            <span className="text-xs bg-primary-blue text-white px-2 py-0.5 rounded-full">
              {selectedDates.length}
            </span>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
            {selectedDates.map(dateStr => (
              <div key={dateStr} className="flex items-center justify-between bg-blue-50 p-2 rounded-lg">
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm text-gray-800 truncate">
                    {format(parseISO(dateStr), 'dd MMM yyyy', { locale: ar })}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {format(parseISO(dateStr), 'EEEE', { locale: ar })} • {dateSessions[dateStr] || 1} حصة
                  </div>
                </div>
                <button
                  onClick={() => handleDateSelect(dateStr)}
                  className="p-1 hover:bg-red-100 rounded-full transition-colors flex-shrink-0 ml-2"
                  aria-label="إزالة"
                >
                  <Trash2 size={12} className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      {/* Mobile Calendar Toggle Button */}
      {isMobile && !showMobileCalendar && selectedDates.length === 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={() => setShowMobileCalendar(true)}
            className="w-full bg-primary-blue text-white py-2.5 rounded-lg font-medium flex items-center justify-center shadow-lg text-sm"
          >
            <Calendar className="ml-2" size={16} />
            عرض التقويم
          </button>
        </div>
      )}

      {/* Mobile Calendar Overlay */}
      {isMobile && showMobileCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white h-[70vh] mt-auto rounded-t-xl overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="text-lg font-semibold">اختر التواريخ</h3>
              <button
                onClick={() => setShowMobileCalendar(false)}
                className="p-1"
                aria-label="إغلاق"
              >
                <XIcon size={20} />
              </button>
            </div>
            <div className="p-3 overflow-y-auto h-[calc(70vh-60px)]">
              <CalendarComponent />
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-3 max-w-7xl mx-auto">
        {/* Main Header - Clean and centered */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-1">حجز مواعيد دروس القيادة</h1>
          <p className="text-gray-600 text-sm">
            اختر التواريخ والأوقات المناسبة لحجز دروس القيادة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          {/* Left Column - Calendar */}
          {(!isMobile || selectedDates.length === 0) && !showMobileCalendar && (
            <div className={`${isMobile ? 'hidden' : 'block'} lg:block`}>
              <CalendarComponent />
            </div>
          )}

          {/* Right Column - Session Selection */}
          <div className="lg:col-span-2">
            {selectedDates.length > 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-4">
                {/* Mobile Back Button */}
                {isMobile && (
                  <button
                    onClick={() => setShowMobileCalendar(true)}
                    className="mb-3 flex items-center text-primary-blue text-sm font-medium"
                  >
                    <ChevronRight size={16} />
                    <span className="mr-1">العودة للتقويم</span>
                  </button>
                )}

                {/* Session Selection Header - Clean and compact */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                  <div className="flex items-center">
                    <Clock className="text-primary-blue ml-2" size={18} />
                    <h2 className="text-base font-semibold text-gray-800">
                      تحديد الحصص
                    </h2>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                    {selectedDates.length} تاريخ
                  </span>
                </div>

                <div className="space-y-4">
                  {selectedDates.map((dateStr, dateIndex) => {
                    const dateSlots = getSlotsByDate(dateStr);
                    const availableHours = dateSlots.filter(slot => slot.available).map(slot => ({
                      time: slot.time,
                      slotId: slot.id,
                      instructorId: slot.instructorId
                    }));
                    
                    const sessions = dateSessions[dateStr] || 1;
                    const timeSelections = dateTimeSelections[dateStr] || [];

                    return (
                      <div key={dateStr} className="border border-gray-200 rounded-lg p-3">
                        {/* Date Header - Compact */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <Calendar className="text-gray-500 ml-1" size={14} />
                              <h3 className="text-sm font-semibold text-gray-800 mr-1">
                                {format(parseISO(dateStr), 'dd MMMM yyyy', { locale: ar })}
                              </h3>
                            </div>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {format(parseISO(dateStr), 'EEEE', { locale: ar })}
                            </p>
                          </div>
                          
                          {/* Sessions Counter - Compact */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600">الحصص:</span>
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                              <button
                                onClick={() => updateDateSessions(dateStr, sessions - 1)}
                                className="w-6 h-6 flex items-center justify-center bg-white rounded hover:bg-gray-50 text-sm font-bold"
                                aria-label="تقليل"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="mx-2 text-sm font-semibold text-gray-800">{sessions}</span>
                              <button
                                onClick={() => updateDateSessions(dateStr, sessions + 1)}
                                className="w-6 h-6 flex items-center justify-center bg-white rounded hover:bg-gray-50 text-sm font-bold"
                                aria-label="زيادة"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Session Time Selection - Clean layout */}
                        <div className="space-y-3">
                          {Array.from({ length: sessions }).map((_, sessionIndex) => {
                            const selectedTime = timeSelections[sessionIndex];
                            
                            return (
                              <div key={sessionIndex} className="bg-gray-50 p-2 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-medium text-gray-800">
                                    الحصة {sessionIndex + 1}
                                  </h4>
                                  {selectedTime && (
                                    <span className="text-xs text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full">
                                      ✓ تم الاختيار
                                    </span>
                                  )}
                                </div>
                                
                                {availableHours.length > 0 ? (
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {availableHours.map((hourSlot, timeIndex) => {
                                      const isSelected = selectedTime?.time === hourSlot.time;
                                      
                                      return (
                                        <button
                                          key={timeIndex}
                                          type="button"
                                          onClick={() => handleTimeSelect(dateStr, sessionIndex, hourSlot)}
                                          className={`
                                            p-2 rounded border transition-all text-center
                                            ${isSelected
                                              ? 'border-primary-blue bg-blue-50'
                                              : 'border-gray-300 hover:border-primary-blue hover:bg-white'
                                            }
                                          `}
                                        >
                                          <div className="font-semibold text-sm text-gray-800">
                                            {hourSlot.time}
                                          </div>
                                          <div className="text-xs text-gray-600 mt-0.5">
                                            ٢ ساعة
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div className="text-center py-2 text-gray-500 text-sm">
                                    لا توجد أوقات متاحة لهذا التاريخ
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Booking Form - Clean and organized */}
                <div className="mt-5 pt-4 border-t border-gray-200">
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">معلومات الحجز</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            الاسم الكامل *
                          </label>
                          <input
                            {...register('name', { required: 'الاسم مطلوب' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-blue focus:border-primary-blue text-sm"
                            placeholder="أدخل اسمك الكامل"
                          />
                          {errors.name && (
                            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            البريد الإلكتروني *
                          </label>
                          <input
                            {...register('email', {
                              required: 'البريد الإلكتروني مطلوب',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'بريد إلكتروني غير صالح'
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-blue focus:border-primary-blue text-sm"
                            placeholder="example@email.com"
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            رقم الهاتف *
                          </label>
                          <input
                            {...register('phone', {
                              required: 'رقم الهاتف مطلوب',
                              pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'رقم هاتف غير صالح (10 أرقام)'
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-blue focus:border-primary-blue text-sm"
                            placeholder="05xxxxxxxx"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            نوع الدرس *
                          </label>
                          <select
                            {...register('lessonType', { required: 'نوع الدرس مطلوب' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-blue focus:border-primary-blue text-sm"
                          >
                            <option value="">اختر نوع الدرس</option>
                            <option value="beginner">مبتدئ - الدرس الأول</option>
                            <option value="intermediate">متوسط - تحسين المهارات</option>
                            <option value="advanced">متقدم - القيادة على الطرق السريعة</option>
                            <option value="parking">تدريب على ركن السيارات</option>
                            <option value="night">قيادة ليلية</option>
                          </select>
                          {errors.lessonType && (
                            <p className="mt-1 text-xs text-red-600">{errors.lessonType.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          ملاحظات إضافية (اختياري)
                        </label>
                        <textarea
                          {...register('notes')}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-blue focus:border-primary-blue text-sm"
                          placeholder="أي ملاحظات أو متطلبات خاصة..."
                        />
                      </div>

                      {/* DEBUG: Show current state */}
                      <div className="text-xs text-gray-500">
                        <p>الحالة: {isFormReady() ? 'جاهز للتقديم' : 'غير جاهز'}</p>
                        <p>تم تحديد {selectedDates.length} تواريخ</p>
                        <p>جلسات مختارة: {Object.values(dateTimeSelections).flat().filter(Boolean).length}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDates([]);
                            setDateSessions({});
                            setDateTimeSelections({});
                            reset();
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm order-2 sm:order-1"
                        >
                          إلغاء الكل
                        </button>
                        <button
                          type="submit"
                          disabled={!isFormReady()}  // Use the new validation function
                          className={`
                            py-2 rounded-lg font-medium text-sm transition-colors flex-1
                            ${!isFormReady()
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-primary-blue text-white hover:bg-blue-700'
                            }
                            order-1 sm:order-2
                          `}
                        >
                          تأكيد الحجز
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              /* Empty State - Clean and minimal */
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
                <Calendar size={40} className="text-gray-300 mb-3" />
                <h3 className="text-base font-semibold text-gray-700 mb-1">اختر تواريخ من التقويم</h3>
                <p className="text-gray-500 text-sm mb-4">
                  اختر تواريخ متعددة من التقويم لتحديد الحصص والأوقات
                </p>
                
                {/* Instructions - Minimal */}
                <div className="w-full">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <h4 className="font-medium text-sm text-gray-800 mb-2">كيفية الحجز:</h4>
                    <ol className="text-xs text-gray-700 space-y-1 text-right">
                      <li>١. اختر تواريخ متعددة من التقويم</li>
                      <li>٢. حدد عدد الحصص لكل تاريخ</li>
                      <li>٣. اختر الوقت المناسب لكل حصة</li>
                      <li>٤. أكمل بياناتك الشخصية</li>
                      <li>٥. اضغط تأكيد الحجز</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && bookingDetails && (
          <AppointmentConfirmation
            appointment={bookingDetails}
            onClose={() => {
              setShowConfirmation(false);
              setBookingDetails(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;