'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (
      !formData.name ||
      !formData.email ||
      !formData.category ||
      !formData.message
    ) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const submissions = JSON.parse(
      localStorage.getItem('contact_submissions') || '[]',
    );
    submissions.push({
      ...formData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      category: '',
      message: '',
    });
    setLoading(false);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Header />
      <main id='main-content'>
        <section className='border-b border-border bg-muted/30 py-14 md:py-20'>
          <div className='container-max max-w-3xl'>
            <h1 className='text-4xl font-semibold tracking-tight md:text-5xl'>
              Add your event
            </h1>
            <p className='mt-5 text-lg leading-relaxed text-muted-foreground'>
              Tell us about your event. We&apos;ll review your submission and
              follow up with next steps.
            </p>
          </div>
        </section>

        <section className='section-spacing'>
          <div className='container-max max-w-2xl'>
            <ul className='mb-12 grid gap-4 sm:grid-cols-3'>
              {[
                {
                  title: 'Simple submission',
                  body: 'One short form — no account required.',
                },
                {
                  title: 'Quick review',
                  body: 'We typically respond within 24–48 hours.',
                },
                {
                  title: 'More visibility',
                  body: 'Reach people browsing for events to attend.',
                },
              ].map((item) => (
                <li key={item.title} className='card p-4 text-sm'>
                  <h3 className='font-semibold'>{item.title}</h3>
                  <p className='mt-1 leading-relaxed text-muted-foreground'>
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>

            {submitted ? (
              <div
                className='card border-primary/20 bg-primary/5 p-8 text-center'
                role='status'>
                <CheckCircle
                  className='mx-auto mb-4 size-12 text-primary'
                  aria-hidden
                />
                <h2 className='text-2xl font-semibold tracking-tight'>
                  Thanks — we got it
                </h2>
                <p className='mt-2 text-muted-foreground'>
                  We&apos;ll review your event and reply within 24–48 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className='card p-6 md:p-8'
                noValidate>
                {error && (
                  <div
                    className='mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive'
                    role='alert'>
                    {error}
                  </div>
                )}

                <div className='mb-6'>
                  <label
                    htmlFor='name'
                    className='mb-2 block text-sm font-medium'>
                    Full Name *
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='min-h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
                    placeholder='Your full name'
                  />
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='email'
                    className='mb-2 block text-sm font-medium'>
                    Email Address *
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='min-h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
                    placeholder='your@email.com'
                  />
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='category'
                    className='mb-2 block text-sm font-medium'>
                    Event Category *
                  </label>
                  <select
                    id='category'
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className='min-h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'>
                    <option value=''>Select a category</option>
                    <option value='concerts'>Concerts & Performances</option>
                    <option value='sports'>Sports & Recreation</option>
                    <option value='workshops'>Workshops & Learning</option>
                    <option value='meetups'>Meetups & Networking</option>
                    <option value='festivals'>Festivals & Celebrations</option>
                    <option value='other'>Other</option>
                  </select>
                </div>

                <div className='mb-8'>
                  <label
                    htmlFor='message'
                    className='mb-2 block text-sm font-medium'>
                    Tell Us About Your Event *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className='min-h-35 w-full resize-none rounded-lg border border-input bg-background px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
                    placeholder='Share details about your event, including name, date, venue, and what makes it special...'
                  />
                  <p className='text-xs text-gray-500 mt-2'>
                    Share key details about your event so we can feature it
                    properly.
                  </p>
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed'>
                  {loading ? 'Submitting…' : 'Submit'}
                </button>

                <p className='mt-4 text-center text-xs text-muted-foreground'>
                  By submitting, you agree to let us feature your event on
                  Bharat Book of Records.
                </p>
              </form>
            )}

            <div className='mt-16 border-t border-border pt-10'>
              <h2 className='mb-6 text-2xl font-semibold tracking-tight'>
                Common questions
              </h2>
              <div className='space-y-6'>
                <details className='group'>
                  <summary className='cursor-pointer text-base font-medium marker:content-none'>
                    How long does it take to review my submission?
                  </summary>
                  <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                    We typically review submissions within 24-48 hours. Our team
                    will evaluate your event and get back to you with next
                    steps.
                  </p>
                </details>

                <details className='group'>
                  <summary className='cursor-pointer text-base font-medium marker:content-none'>
                    Do you charge to list events?
                  </summary>
                  <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                    No! Listing your event on Bharat Book of Records is
                    completely free. We&apos;re focused on connecting event
                    seekers with organizers.
                  </p>
                </details>

                <details className='group'>
                  <summary className='cursor-pointer text-base font-medium marker:content-none'>
                    Can I update my event information after listing?
                  </summary>
                  <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                    Yes! Once listed, you can reach out to us to update event
                    details, dates, or any other information. We want to keep
                    our platform accurate and up-to-date.
                  </p>
                </details>

                <details className='group'>
                  <summary className='cursor-pointer text-base font-medium marker:content-none'>
                    What if my event is on Facebook but not showing up?
                  </summary>
                  <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                    If you&apos;ve posted on Facebook but haven&apos;t seen your
                    event here yet, reach out to us. We&apos;ll help ensure your
                    event gets featured.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
