import { useState, useEffect } from 'react';
import { Code2, Lightbulb, Rocket, GraduationCap } from 'lucide-react';

interface Highlight {
  icon: string;
  title: string;
  description: string;
}

interface AboutData {
  paragraphs: string[];
  highlights: Highlight[];
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch('/data/about.json')
      .then((response) => response.json())
      .then((data) => setAboutData(data))
      .catch((error) => console.error('Error loading about data:', error));
  }, []);

  const iconMap: { [key: string]: typeof Code2 } = {
    Code2,
    Lightbulb,
    Rocket,
    GraduationCap,
  };

  if (!aboutData) {
    return (
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">Loading...</div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right side - Highlights grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {aboutData.highlights.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Code2;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
