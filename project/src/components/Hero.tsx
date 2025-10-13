import { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Twitter, MessageCircle, Award, CheckCircle } from 'lucide-react';

interface ProfileData {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  whatsapp: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

const Hero = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetch('/data/profile.json')
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error('Error loading profile data:', error));
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!profileData) {
    return (
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
      >
        <div className="text-center">Loading...</div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur-xl opacity-50 animate-pulse" />
              <img
                src={profileData.image}
                alt={profileData.name}
                className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-white shadow-2xl"
              />
            </div>
          </div>

          {/* Greeting */}
          <div className="inline-block">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              100% Human Written • 0% Plagiarism • A+ Grades Guaranteed
            </span>
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {profileData.name}
            </span>
          </h1>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700">
            {profileData.title}
          </h2>

          {/* Subtitle */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full border-2 border-green-200">
              <Award size={20} />
              <span className="font-semibold">{profileData.subtitle}</span>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {profileData.tagline}
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle size={20} className="text-green-600" />
              <span className="font-medium">500+ Happy Students</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle size={20} className="text-green-600" />
              <span className="font-medium">Less than 5% AI Score</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle size={20} className="text-green-600" />
              <span className="font-medium">24/7 Support</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href={`https://wa.me/${profileData.whatsapp.replace(/\+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle size={20} />
              WhatsApp Me Now
            </a>
            <button
              onClick={() => scrollToSection('writing-samples')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              View Writing Samples
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-white text-gray-900 rounded-lg font-medium border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get A Quote
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center pt-8">
            <a
              href={profileData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 text-gray-700 hover:text-blue-600"
            >
              <Github size={24} />
            </a>
            <a
              href={profileData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 text-gray-700 hover:text-blue-600"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={profileData.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 text-gray-700 hover:text-blue-600"
            >
              <Twitter size={24} />
            </a>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollToSection('about')}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <ArrowDown size={32} className="text-gray-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
