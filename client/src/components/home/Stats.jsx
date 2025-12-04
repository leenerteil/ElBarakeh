import React, { useEffect, useState, useRef } from "react";
import { Award, GraduationCap, Star, Users, CheckCircle, Calendar, Shield } from "lucide-react";

const Stats = () => {
  const statsData = [
    { 
      number: 10, 
      suffix: "+", 
      label: "سنوات خبرة", 
      icon: <Award className="h-10 w-10 text-white" />,
      description: "خبرة طويلة في تدريب السائقين"
    },
    { 
      number: 1000, 
      suffix: "+", 
      label: "خريجين", 
      icon: <GraduationCap className="h-10 w-10 text-white" />,
      description: "طالب ناجح حصلوا على الرخصة"
    },
    { 
      number: 95, 
      suffix: "%", 
      label: "نسبة النجاح", 
      icon: <Star className="h-10 w-10 text-white" />,
      description: "أعلى نسبة نجاح في المنطقة"
    },
    { 
      number: 50, 
      suffix: "+", 
      label: "مدرب معتمد", 
      icon: <Users className="h-10 w-10 text-white" />,
      description: "مدرب محترف معتمد من الوزارة"
    }
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            startAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasStarted]);

  const startAnimation = () => {
    statsData.forEach((stat, index) => {
      const duration = 1200;
      const startTime = Date.now();
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(stat.number * easeOutQuart);
          return newCounts;
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = stat.number;
            return newCounts;
          });
        }
      };
      
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, index * 100);
    });
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-cyan-400 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            أرقام تتحدث عن <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">تميزنا</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            ثقة الآلاف من الطلاب والخريجين الذين اختاروا مدرسة البركة كشريك لهم في رحلة تعلم القيادة
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-blue-100 overflow-hidden"
            >
              {/* Animated background effect */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                {/* Icon Container */}
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {stat.icon}
                </div>
                
                {/* Animated Number */}
                <div className="text-5xl md:text-6xl font-black text-blue-900 mb-3 leading-none">
                  {counts[index]}
                  <span className="text-4xl md:text-5xl">{stat.suffix}</span>
                </div>
                
                {/* Label */}
                <div className="text-xl font-bold text-blue-800 mb-2">{stat.label}</div>
                
                {/* Description */}
                <div className="text-blue-600 text-sm leading-relaxed opacity-90">{stat.description}</div>
              </div>

              {/* Floating particles effect */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Stats;