import { useState, useEffect } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, MessageCircle, Phone } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

const Contact = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  );

  useEffect(() => {
    fetch('/data/profile.json')
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error('Error loading profile data:', error));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  if (!profileData) {
    return (
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto text-center">Loading...</div>
      </section>
    );
  }

  const contactInfo = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: profileData.whatsapp,
      link: `https://wa.me/${profileData.whatsapp.replace(/\+/g, '')}`,
      highlight: true,
    },
    {
      icon: Mail,
      label: 'Email',
      value: profileData.email,
      link: `mailto:${profileData.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profileData.phone,
      link: `tel:${profileData.phone}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profileData.location,
    },
  ];

  const socialLinks = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      link: `https://wa.me/${profileData.whatsapp.replace(/\+/g, '')}`,
      color: 'hover:text-green-600',
    },
    {
      icon: Github,
      label: 'GitHub',
      link: profileData.social.github,
      color: 'hover:text-gray-900',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      link: profileData.social.linkedin,
      color: 'hover:text-blue-600',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      link: profileData.social.twitter,
      color: 'hover:text-blue-400',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out. I'm always open to discussing new opportunities!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-lg shadow-md hover:shadow-lg transition-all ${
                      item.highlight
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-white hover:scale-105'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.highlight
                        ? 'bg-white/20'
                        : 'bg-gradient-to-br from-blue-600 to-cyan-600'
                    }`}>
                      <item.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${
                        item.highlight ? 'text-green-50' : 'text-gray-500'
                      }`}>
                        {item.label}
                      </p>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.label === 'WhatsApp' ? '_blank' : undefined}
                          rel={item.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                          className={`font-medium transition-colors ${
                            item.highlight
                              ? 'text-white hover:text-green-100'
                              : 'text-gray-900 hover:text-blue-600'
                          }`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Connect With Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-700 ${social.color} hover:scale-110`}
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <MessageCircle size={28} />
                Quick Response on WhatsApp
              </h3>
              <p className="text-green-100 leading-relaxed mb-4">
                Get instant quotes and discuss your academic writing needs 24/7!
                Fast, reliable, and always ready to help you succeed.
              </p>
              <a
                href={`https://wa.me/${profileData.whatsapp.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-all duration-300 hover:scale-105"
              >
                Chat Now on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Thank you for your message! I'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            Designed & Built by {profileData.name}
          </p>
          <p className="text-gray-500 mt-2">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
