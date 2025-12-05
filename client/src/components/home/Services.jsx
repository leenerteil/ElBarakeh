import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Car, Calendar, Shield, ArrowLeft, Award, Clock, Users, CheckCircle, Star } from 'lucide-react';

// Shared color configuration
const colors = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    hover: 'hover:text-blue-700'
  },
  cyan: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    gradient: 'from-cyan-500 to-blue-500',
    hover: 'hover:text-cyan-700'
  },
  blueCyan: {
    gradient: 'from-blue-500 to-cyan-400'
  }
};

// Service Card Component
const ServiceCard = ({ service }) => {
  const color = colors[service.color];
  
  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-1">
      <div className={`mb-6 p-4 rounded-lg inline-flex ${color.bg} ${color.text}`}>
        {service.icon}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {service.title}
      </h3>

      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
        {service.description}
      </p>

      <Link
        to={service.link}
        className={`inline-flex items-center gap-2 text-sm font-medium ${color.text} ${color.hover} transition-colors`}
      >
        اكتشف الخدمة
        <ArrowLeft className="h-4 w-4" />
      </Link>
    </div>
  );
};

// Benefit Card Component
const BenefitCard = ({ benefit, index }) => {
  const statColor = benefit.statColor || `from-blue-400 to-cyan-400`;
  
  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Decorative Corner */}
      <div className={`absolute top-0 right-0 h-16 w-16 bg-gradient-to-br ${statColor} opacity-5 rounded-bl-3xl`}></div>
      
      <div className="flex items-start gap-4">
        {/* Icon Container */}
        <div className={`flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br ${statColor} flex items-center justify-center`}>
          <div className="text-white">
            {benefit.icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-bold text-gray-900">
              {benefit.title}
            </h4>
            {benefit.stat && (
              <span className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${statColor} text-white`}>
                {benefit.stat}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {benefit.description}
          </p>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
    </div>
  );
};

// Section Header Component
const SectionHeader = ({ title, subtitle, gradientText = "", showDivider = true }) => (
  <div className="text-center mb-12">

    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      {title}
      {gradientText && (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
          {" "}{gradientText}
        </span>
      )}
    </h2>
    {subtitle && (
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        {subtitle}
      </p>
    )}
  </div>
);

// Services Component
const Services = () => {
  const services = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "المواد الدراسية",
      description: "مواد دراسية شاملة تغطي كل جوانب القيادة الآمنة والنظرية",
      link: "/study",
      color: "blue"
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: "اختبارات القيادة",
      description: "اختبارات تفاعلية لمحاكاة الامتحانات الرسمية",
      link: "/quiz",
      color: "cyan"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "حجز المواعيد",
      description: "حجز مرن للدروس العملية في الأوقات المناسبة لك",
      link: "/appointments",
      color: "blue"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "سلامة القيادة",
      description: "برامج تدريب متخصصة للقيادة الوقائية والآمنة",
      link: "/safety",
      color: "cyan"
    }
  ];

  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "خبرة ممتدة",
      description: "أكثر من 10 سنوات في تدريب السائقين المحترفين",
      stat: "10+",
      statColor: "from-blue-500 to-blue-600"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "نسبة نجاح مميزة",
      description: "95% من طلابنا يجتازون الاختبارات من أول محاولة",
      stat: "95%",
      statColor: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "مدربون معتمدون",
      description: "فريق من المدربين المعتمدين من وزارة النقل",
      stat: "50+",
      statColor: "from-blue-400 to-cyan-400"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "مرونة كاملة",
      description: "تعديل وتأجيل الدروس حسب احتياجك في أي وقت"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "توفير للوقت",
      description: "منهجية متكاملة تقصر الطريق نحو الحصول على الرخصة"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "سلامة مضمونة",
      description: "تدريبات عملية على أحدث السيارات المجهزة بأنظمة السلامة"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Services Header */}
        <SectionHeader
          title="خدماتنا المتكاملة"
          subtitle="نقدم باقة متكاملة من الخدمات المصممة لتحويلك إلى سائق محترف بأعلى معايير السلامة"
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-2 w-12 bg-blue-500 rounded-full"></div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                لماذا تختار <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">خدماتنا</span>؟
              </h3>
              <div className="h-2 w-12 bg-cyan-400 rounded-full"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نقدم لك مزايا حقيقية تجعل تجربة تعلم القيادة معنا الأفضل والأكثر فعالية
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                ابدأ رحلة القيادة الآمنة اليوم
              </h3>
              <p className="text-blue-100 mb-0 opacity-90">
                انضم إلى آلاف الطلاب الناجحين وابدأ رحلتك نحو القيادة المحترفة
                مع أفضل المدربين وأحدث وسائل التعليم
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-center"
              >
                سجل الآن مجاناً
              </Link>
              <Link
                to="/contact"
                className="bg-transparent text-white px-8 py-3 rounded-xl font-semibold border-2 border-white hover:bg-white/10 transition-all duration-300 text-center"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;