import React from 'react';
import { CheckCircle, Calendar, Clock, FileText, X } from 'lucide-react';

const AppointmentConfirmation = ({ appointment, onClose }) => {
  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity"></div>
      
      {/* WIDER Modal Content */}
      <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full animate-modalFadeIn">
        {/* Header */}
        <div className="sticky top-0 bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center">
            <CheckCircle className="text-green-600 ml-2" size={18} />
            <h3 className="text-sm font-semibold text-gray-800 mr-2">تم الحجز بنجاح</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="إغلاق"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Content - same height but wider */}
        <div className="overflow-y-auto max-h-[55vh] px-4 py-4">
          {/* Success Message */}
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="text-green-500" size={20} />
            </div>
            <p className="text-sm text-gray-600">
              تم تأكيد حجز <span className="font-bold text-primary-blue text-base">{appointment.totalSessions}</span> حصة
            </p>
          </div>

          {/* Booking Summary - using wider layout */}
          <div className="space-y-4 mb-4">
            {/* Total Sessions */}
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <FileText className="text-primary-blue ml-3" size={18} />
              <div className="mr-3">
                <p className="text-xs text-gray-500">إجمالي الحصص</p>
                <p className="font-bold text-base text-gray-800">{appointment.totalSessions} حصة</p>
              </div>
            </div>

            {/* Dates and Times - wider cards */}
            {appointment.dates.map((date, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Calendar className="text-primary-blue ml-2" size={16} />
                  <div className="mr-2 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-gray-800">
                        {date.display.split(' ')[0]} {date.display.split(' ')[1]}
                      </h4>
                      <span className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                        {date.sessions} حصة
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{date.day}</p>
                  </div>
                </div>
                
                <div className="space-y-2 pr-8">
                  {appointment.appointments
                    .filter(app => app.bookingDate === date.dateStr)
                    .map((app, appIndex) => (
                      <div key={appIndex} className="flex items-center justify-between bg-white p-2.5 rounded border border-gray-200">
                        <div className="flex items-center">
                          <Clock size={14} className="text-gray-500 ml-2" />
                          <span className="font-medium text-sm text-gray-800 mr-2">
                            حصة {app.sessionNumber}
                          </span>
                        </div>
                        <span className="font-bold text-sm text-gray-800">{app.time}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Important Notes - wider */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-sm text-yellow-800 mb-2 flex items-center">
              <span className="text-sm ml-2">📌</span>
              ملاحظات هامة:
            </h4>
            <ul className="text-yellow-700 text-sm space-y-1.5">
              <li className="flex items-start">
                <span className="ml-2 text-xs mt-0.5">•</span>
                <span>يجب الحضور قبل موعد الحصة بـ 15 دقيقة على الأقل</span>
              </li>
              <li className="flex items-start">
                <span className="ml-2 text-xs mt-0.5">•</span>
                <span>إحضار الرخصة الأصلية مع نسخة منها</span>
              </li>
              <li className="flex items-start">
                <span className="ml-2 text-xs mt-0.5">•</span>
                <span>ارتداء حذاء مناسب للقيادة</span>
              </li>
              <li className="flex items-start">
                <span className="ml-2 text-xs mt-0.5">•</span>
                <span>إلغاء الحجز يكون قبل 24 ساعة من الموعد</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white px-4 py-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-primary-blue text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none text-sm"
          >
            تم الفهم، شكراً
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;