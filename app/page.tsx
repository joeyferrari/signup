"use client";  // This tells Next.js that this component is a client-side component

import { useRef, useState } from 'react';
import { Shirt, Calendar, Truck, Sparkles } from 'lucide-react';
import Head from 'next/head'; // Import Head
import Image from 'next/image'; // Import Next.js Image component

export default function Home() {
  // Create a ref to the form section
  const formRef = useRef<HTMLDivElement | null>(null);

  // Form values state
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Function to scroll to the form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to update form values
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Check if all fields are filled
  const isFormValid = formValues.firstName && formValues.lastName && formValues.email;

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/mailerlite-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Something went wrong, please try again.');
      } else {
        setSuccess(true);
        setFormValues({ firstName: '', lastName: '', email: '' });
      }
    } catch {
      setError('Failed to submit, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Head component to set the page title */}
      <Head>
        <title>Lux Laundry Service - Claim Your Free Service!</title>
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="px-4 py-12 md:py-24">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center leading-tight mb-4">
              Wash Twice, Pay Once - Receive a Free Laundry Service on Your Second Basket with Every Purchase!
            </h1>
            <p className="text-[#7B7C02] text-xl md:text-2xl text-center mb-12">
              Generously gift your free basket to a family member, neighbor, or friend&mdash;share the love of clean laundry&mdash;or keep it for yourself!
            </p>
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div ref={formRef} className="md:w-1/2 pr-0 md:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                  Treat Your Clothes - Enjoy a FREE Laundry Service on Your First Visit Today!
                </h2>
                <p className="text-[#7B7C02] text-lg mb-4 text-center">
                  Fill in your details below to claim your free laundry service:
                </p>
                {success && <p className="text-green-600">Thank you! You&apos;ve been subscribed.</p>}
                {error && <p className="text-red-600">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="Your email address..."
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-md flex items-center justify-center font-bold ${
                      isFormValid
                        ? 'bg-[#F7F6C9] hover:bg-[#e0e0a5] text-black'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                    disabled={!isFormValid || loading}
                  >
                    <Shirt className="mr-2" />
                    {loading ? 'Submitting...' : 'Claim Your Free Service Now!'}
                  </button>
                </form>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <Image
                  src="/laundry-image.jpg"  // Ensure this is the correct image name
                  alt="Fresh Laundry"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">How it Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-[#7B7C02]" />
                <h3 className="text-xl font-bold mb-2">Schedule Online</h3>
                <p>Choose pickup and drop-off times that work best for you in our mobile or web app.</p>
              </div>
              <div className="text-center">
                <Truck className="mx-auto mb-4 h-12 w-12 text-[#7B7C02]" />
                <h3 className="text-xl font-bold mb-2">We Pickup</h3>
                <p>A delivery agent will pick up your laundry during your scheduled pickup time.</p>
              </div>
              <div className="text-center">
                <Sparkles className="mx-auto mb-4 h-12 w-12 text-[#7B7C02]" />
                <h3 className="text-xl font-bold mb-2">Expert Cleaning</h3>
                <p>Sit back and relax. Never worry about laundry or dry cleaning again.</p>
              </div>
              <div className="text-center">
                <Shirt className="mx-auto mb-4 h-12 w-12 text-[#7B7C02]" />
                <h3 className="text-xl font-bold mb-2">We Deliver</h3>
                <p>Your clothes come back clean and wrinkle-free on your scheduled drop-off date.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Your Best Choice Section */}
        <section className="bg-[#F7F6C9] text-black px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">What Makes Us Your Best Choice?</h2>
            <p className="text-center mb-12 text-lg">
              We&apos;re excited to offer you top-notch laundry services with our state-of-the-art facilities and expert staff.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shirt className="mx-auto mb-4 h-12 w-12" />
                <h3 className="text-xl font-bold mb-2">Convenience</h3>
                <p>
                  Enjoy hassle-free laundry service that fits your busy lifestyle. We are dedicated to making your experience seamless, providing flexible options that cater to your needs.
                </p>
              </div>
              <div className="text-center">
                <Shirt className="mx-auto mb-4 h-12 w-12" />
                <h3 className="text-xl font-bold mb-2">24-Hour Turnaround</h3>
                <p>
                  We know your time is valuable. That&apos;s why we guarantee a 24-hour turnaround on all laundry services, ensuring you never have to wait long for your freshly cleaned clothes.
                </p>
              </div>
              <div className="text-center">
                <Shirt className="mx-auto mb-4 h-12 w-12" />
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p>
                  Our skilled professionals use advanced techniques and eco-friendly products to ensure your clothes receive the utmost care, delivering impeccable results that you can trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-4 py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Hear From Our Happy Customers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-[#7B7C02] font-bold text-center mb-4">
                  &quot;Highly Recommend!&quot;
                </p>
                <p className="text-center mb-4">
                  We use Lux Laundry on a weekly basis and I would highly recommend their service. The app is easy to use. Free pick up and delivery at a competitive and fair price. I wish I had found you sooner!
                </p>
                <p className="text-center font-bold">
                  <a href="https://www.google.com/search?q=lux+laundry" target="_blank" className="underline">Clean.Organize.Repeat.</a>
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-[#7B7C02] font-bold text-center mb-4">
                  &quot;Professional!&quot;
                </p>
                <p className="text-center mb-4">
                  Prompt, professional pickups/drop offs. Clothes arrive perfectly clean and perfectly folded. Their service saves me a lot of time. I highly recommend them!
                </p>
                <p className="text-center font-bold">
                  <a href="https://www.google.com/search?q=lux+laundry" target="_blank" className="underline">Kevin Kirkwood</a>
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-[#7B7C02] font-bold text-center mb-4">
                  &quot;5 Star Times 10!&quot;
                </p>
                <p className="text-center mb-4">
                  This place gets a 5 star times 10. Joey was very helpful, accommodated me at the very last minute. This will for sure continue to receive business from me. Well deserved! Thank you so much Joey, very professional, continue being kind.
                </p>
                <p className="text-center font-bold">
                  <a href="https://www.google.com/search?q=lux+laundry" target="_blank" className="underline">Naika Baptiste</a>
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <button onClick={scrollToForm} className="bg-[#F7F6C9] hover:bg-[#e0e0a5] text-black font-bold py-3 px-8 rounded-md inline-flex items-center">
                <Shirt className="mr-2" />
                Claim Your Free Service Now!
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#F7F6C9] text-black px-4 py-8">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm">
              Copyright © {new Date().getFullYear()} LuxLaundryService.com | All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
