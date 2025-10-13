import { useState, useEffect } from 'react';
import {
  FileText,
  Award,
  TrendingDown,
  BookOpen,
  CheckCircle,
  UserCheck,
  ShieldCheck,
  RefreshCw,
  MessageCircle,
  Lock,
  Download,
} from 'lucide-react';

interface Sample {
  title: string;
  category: string;
  subject: string;
  pages: number;
  grade: string;
  description: string;
  turnitinScore: number;
  aiScore: number;
  wordCount: number;
  excerpt: string;
  image: string;
  features: string[];
  download?: string;
}

interface Guarantee {
  title: string;
  description: string;
  icon: string;
}

interface WritingSamplesData {
  samples: Sample[];
  guarantees: Guarantee[];
}

const WritingSamples = () => {
  const [data, setData] = useState<WritingSamplesData | null>(null);

  useEffect(() => {
    fetch('/data/writing-samples.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error loading writing samples:', error));
  }, []);

  const iconMap: { [key: string]: typeof FileText } = {
    FileText,
    UserCheck,
    ShieldCheck,
    RefreshCw,
    MessageCircle,
    Lock,
  };

  if (!data) {
    return (
      <section
        id="writing-samples"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="max-w-7xl mx-auto text-center">Loading...</div>
      </section>
    );
  }

  return (
    <section
      id="writing-samples"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              Portfolio of Excellence
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Writing Samples & Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-4" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse through our collection of high-quality academic papers with
            verified Turnitin scores and AI detection results. Every piece
            showcases 100% original, human-written content that guarantees
            academic excellence.
          </p>
        </div>

        {/* Guarantees Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white mb-8">
            <h3 className="text-3xl font-bold mb-3 text-center">
              Our Quality Guarantee
            </h3>
            <p className="text-blue-50 text-center text-lg mb-8 max-w-3xl mx-auto">
              We stand behind every paper we deliver with ironclad guarantees
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.guarantees.map((guarantee, index) => {
                const IconComponent = iconMap[guarantee.icon] || FileText;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    <IconComponent size={32} className="mb-3" />
                    <h4 className="text-xl font-bold mb-2">{guarantee.title}</h4>
                    <p className="text-blue-50 leading-relaxed">
                      {guarantee.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Writing Samples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.samples.map((sample, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
            >
              {/* Sample Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={sample.image}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-lg">
                  <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                    <Award size={16} />
                    {sample.grade}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                    {sample.category}
                  </span>
                </div>
              </div>

              {/* Sample Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {sample.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen size={16} />
                  <span>{sample.subject}</span>
                </div>

                <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                  {sample.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingDown size={16} className="text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      {sample.turnitinScore}%
                    </p>
                    <p className="text-xs text-gray-600">Turnitin</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <UserCheck size={16} className="text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      {sample.aiScore}%
                    </p>
                    <p className="text-xs text-gray-600">AI Score</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <FileText size={16} className="text-gray-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {sample.pages}
                    </p>
                    <p className="text-xs text-gray-600">Pages</p>
                  </div>
                </div>

                {/* Features */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {sample.features.slice(0, 3).map((feature, fIndex) => (
                      <span
                        key={fIndex}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded flex items-center gap-1"
                      >
                        <CheckCircle size={12} className="text-green-600" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-600 font-medium">
                    {sample.wordCount.toLocaleString()} words
                  </p>
                  {sample.download && (
                    <a
                      href={sample.download}
                      download
                      className="flex items-center gap-1 text-white bg-gradient-to-r from-green-600 to-green-700 px-4 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied students who trust us with their
              academic success. Get your custom, plagiarism-free paper today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Order Your Paper Now
              </a>
              <a
                href={`https://wa.me/${data ? '+254712345678'.replace(/\+/g, '') : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                WhatsApp Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WritingSamples;
