import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle, Clock, Shield, Headphones } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: 'استفسار عام'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        subject: 'استفسار عام'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "اتصل بنا",
      info: "+966 50 123 4567",
      description: "من الأحد إلى الخميس، 8 صباحاً - 6 مساءً"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "البريد الإلكتروني",
      info: "info@albarakeh.com",
      description: "نرد خلال 24 ساعة عمل"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "العنوان",
      info: "الرياض، حي الملقا",
      description: "شارع الملك فهد، مبنى رقم 123"
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="h-5 w-5" />,
      text: "رد سريع خلال 24 ساعة"
    },
    {
      icon: <Headphones className="h-5 w-5" />,
      text: "دعم فني متخصص"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      text: "استشارات مجانية"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      text: "متاح 5 أيام في الأسبوع"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              تواصل <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">معنا</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              لديك استفسار أو تحتاج إلى مساعدة؟ فريقنا متاح دائماً للرد على استفساراتك
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            {/* Contact Information - Left Side */}
            <div className="lg:col-span-1 flex flex-col h-full">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 flex-1 flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-900 mb-6 pb-3 border-b border-blue-100">
                    معلومات التواصل
                  </h3>
                  
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                        <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                          <div className="text-white">
                            {item.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-blue-700 font-semibold text-sm">{item.info}</p>
                          <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-8 pt-6 border-t border-blue-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">لماذا تختارنا؟</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-blue-50">
                        <div className="text-blue-600">
                          {benefit.icon}
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-2 h-full">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-blue-100 h-full flex flex-col">
                {isSubmitted ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">تم إرسال رسالتك بنجاح!</h4>
                    <p className="text-gray-600 max-w-md">
                      سنقوم بالرد عليك في أقرب وقت ممكن. شكراً لتواصلك معنا.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-blue-900 mb-6 pb-3 border-b border-blue-100">
                      أرسل رسالتك
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                      <div className="space-y-6 flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              الاسم الكامل *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="أدخل اسمك الكامل"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              البريد الإلكتروني *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="example@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              رقم الهاتف *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="+966 50 123 4567"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              نوع الاستفسار *
                            </label>
                            <select
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                              <option value="استفسار عام">استفسار عام</option>
                              <option value="التسجيل والدورات">التسجيل والدورات</option>
                              <option value="الأسعار والعروض">الأسعار والعروض</option>
                              <option value="الشكاوى والمقترحات">الشكاوى والمقترحات</option>
                              <option value="دعم فني">دعم فني</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            الرسالة *
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full h-full min-h-[150px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                            placeholder="اكتب رسالتك هنا..."
                          ></textarea>
                        </div>
                      </div>

                      <div className="pt-6 mt-auto">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                            isSubmitting 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-lg hover:shadow-xl'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              جاري الإرسال...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              إرسال الرسالة
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;