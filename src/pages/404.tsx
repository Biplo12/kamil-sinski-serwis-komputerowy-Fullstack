import Link from 'next/link';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main>
        <section>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-white'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            <Link href='/'>Back to Home</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
