import React from 'react';
import Hero from '../../components/home/Hero';
import Services from '../../components/home/Services';
import Stats from '../../components/home/Stats';
import ContactForm from '../../components/home/ContactForm'; // Changed from CTA to ContactForm

const Home = () => {
  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>

      <Hero />
      <Stats />
      <Services />
      <ContactForm /> {/* Changed from CTA to ContactForm */}
    </div>
  );
};

export default Home;