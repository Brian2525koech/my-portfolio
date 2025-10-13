import { useState, useEffect } from 'react';
import { PenTool, User, ShieldCheck, Clock } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ProfileData {
  services: Service[];
  subtitle: string;
}

const Services = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetch('/data/profile.json')
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error('Error loading profile data:', error));
  }, []);

  const iconMap: { [key: string]: typeof PenTool } = {
    PenTool,
    User,
    ShieldCheck,
    Clock,
  };

  if (!profileData) {
    return (
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">Loading...</div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              What I Offer
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Professional Writing Services
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {profileData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profileData.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || PenTool;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Why Choose Me Section */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-3xl font-bold mb-6 text-center">
            Why Students Choose My Services
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-blue-100">Satisfied Students</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">98%</div>
              <p className="text-blue-100">A+ Grades Achieved</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-blue-100">On-Time Delivery</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg text-blue-50 leading-relaxed max-w-3xl mx-auto">
              Every paper is meticulously crafted to meet your specific
              requirements, thoroughly researched using credible sources, and
              guaranteed to pass both Turnitin and AI detection tests with
              flying colors. Your academic success is my priority!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
