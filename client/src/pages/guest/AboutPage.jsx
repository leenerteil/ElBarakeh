import React from 'react';
import { Users, Target, Eye, Award, Shield, Clock, MapPin } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A73E8] mb-4">
            مدرسة البركة للقيادة
          </h1>
          <p className="text-lg md:text-xl text-blue-600 max-w-3xl mx-auto leading-relaxed">
            رواد في تعليم القيادة الآمنة والمهنية منذ أكثر من 15 عاماً
          </p>
        </div>

        {/* About Office Section */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#1A73E8] rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800">عن المدرسة</h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-blue-700 text-lg leading-relaxed mb-4">
                  مدرسة البركة للقيادة مؤسسة رائدة في مجال تعليم القيادة في لبنان، 
                  نلتزم بتقديم أعلى معايير الجودة والأمان في تدريب السائقين.
                </p>
                <p className="text-blue-600 leading-relaxed">
                  نتميز بفريق من المدربين المعتمدين ذوي الخبرة الطويلة، وأحدث المركبات المجهزة بأعلى 
                  معايير السلامة، ومناهج تدريبية متطورة تواكب أحدث الأنظمة الدولية.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#1A73E8] to-blue-400 rounded-xl p-6 text-white text-center">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <Shield className="w-8 h-8" />
                    <div>
                      <p className="text-2xl font-bold">100%</p>
                      <p className="text-blue-100">نسبة النجاح</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <Clock className="w-8 h-8" />
                    <div>
                      <p className="text-2xl font-bold">15+</p>
                      <p className="text-blue-100">سنة خبرة</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simplified History Section */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#1A73E8] rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800">مسيرتنا</h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  year: "2009",
                  title: "بداية رحلتنا",
                  description: "تأسيس مدرسة البركة للقيادة بهدف تعليم القيادة الآمنة والمهنية"
                },
                {
                  year: "2016",
                  title: "نقلة نوعية",
                  description: "تحديث الأسطول وتطوير المناهج باستخدام أحدث التقنيات العالمية"
                },
                {
                  year: "الآن",
                  title: "الريادة",
                  description: "نفخر بتخريج آلاف السائقين الماهرين والمساهمة في مجتمع أكثر أماناً"
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-xl border ${index === 1 ? 'bg-gradient-to-br from-blue-50 to-white border-[#1A73E8]' : 'bg-white border-blue-100'}`}
                >
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-[#1A73E8] text-white rounded-full font-bold text-lg">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">{item.title}</h3>
                  <p className="text-blue-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-20">
          {/* Mission */}
          <div className="bg-gradient-to-br from-[#1A73E8] to-blue-500 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold">رسالتنا</h2>
            </div>
            <p className="text-lg leading-relaxed text-blue-100">
              تمكين الأفراد من امتلاك مهارات القيادة الآمنة والمهنية من خلال تقديم برامج تدريبية متكاملة، 
              باستخدام أحدث الوسائل التعليمية والتقنيات الحديثة، في بيئة آمنة ومحفزة على التعلم.
            </p>
            <ul className="mt-6 space-y-3">
              {['تطوير مهارات القيادة الدفاعية', 'تعزيز الثقافة المرورية', 'استخدام أحدث وسائل التدريب', 'ضمان أعلى معايير الجودة'].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
                <Eye className="w-7 h-7 text-[#1A73E8]" />
              </div>
              <h2 className="text-2xl font-bold text-blue-800">رؤيتنا</h2>
            </div>
            <p className="text-blue-700 text-lg leading-relaxed">
              أن نكون المدرسة الرائدة في تقديم تعليم القيادة في لبنان، 
              وأن نساهم في بناء مجتمع يتحلى بأعلى معايير السلامة المرورية والمسؤولية المجتمعية.
            </p>
            <div className="mt-8 p-5 bg-blue-50 rounded-xl">
              <h3 className="font-bold text-blue-800 mb-3">أهدافنا المستقبلية</h3>
              <div className="grid grid-cols-2 gap-3">
                {['التوسع الجغرافي', 'التحول الرقمي', 'الشراكات الدولية', 'الابتكار المستمر'].map((goal, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#1A73E8] rounded-full"></div>
                    <span className="text-blue-600 text-sm">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-10">قيمنا الأساسية</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "السلامة", description: "نضع السلامة فوق كل اعتبار في جميع برامجنا التدريبية" },
              { icon: Users, title: "الاحترافية", description: "نلتزم بأعلى معايير الجودة والاحترافية" },
              { icon: Award, title: "التميز", description: "نسعى للتميز في كل ما نقدمه من خدمات" },
              { icon: Target, title: "الابتكار", description: "نطور أنظمتنا باستمرار لتقديم الأفضل" }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-[#1A73E8]" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">{value.title}</h3>
                <p className="text-blue-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Office Location Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#1A73E8] rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800">موقعنا</h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-blue-800 mb-3">مدرسة البركة للقيادة</h3>
                <div className="space-y-2 text-blue-600">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>بيروت، لبنان</span>
                  </p>
                  <p>شارع الحمرا، بناية البركة، الطابق الثالث</p>
                </div>
              </div>
              
              {/* Google Maps Embed */}
              <div className="relative h-96 rounded-xl overflow-hidden border border-blue-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.306558261738!2d35.5083723152095!3d33.81721978067245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f1e6b5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sBeirut%2C%20Lebanon!5e0!3m2!1sen!2slb!4v1636543212345!5m2!1sen!2slb"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="مدرسة البركة للقيادة على خرائط جوجل"
                  className="absolute inset-0"
                ></iframe>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">ساعات العمل:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-blue-600">
                  <p>السبت - الخميس: 8:00 صباحاً - 6:00 مساءً</p>
                  <p>الجمعة: 9:00 صباحاً - 2:00 ظهراً</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;