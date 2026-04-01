/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { FirebaseProvider } from './lib/FirebaseProvider';

const Home = React.lazy(() => import('./pages/Home'));
const Jobs = React.lazy(() => import('./pages/Jobs'));
const JobDetail = React.lazy(() => import('./pages/JobDetail'));
const Process = React.lazy(() => import('./pages/Process'));
const About = React.lazy(() => import('./pages/About'));
const Profile = React.lazy(() => import('./pages/Profile'));

export default function App() {
  return (
    <FirebaseProvider>
      <Router>
        <Layout>
          <React.Suspense
            fallback={
              <div className="min-h-[60vh] flex items-center justify-center bg-[#f8fafb]">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-[#003a59]/10 border-t-[#003a59] animate-spin" />
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-[#003a59]">
                    Đang tải nội dung
                  </p>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/process" element={<Process />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </React.Suspense>
        </Layout>
      </Router>
    </FirebaseProvider>
  );
}
