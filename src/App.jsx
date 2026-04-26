import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const CustomBuild = lazy(() => import('./pages/CustomBuild'));
const Gallery = lazy(() => import('./pages/Gallery'));
const FAQ = lazy(() => import('./pages/FAQ'));

function AdminRedirect() {
  useEffect(() => {
    window.location.href = '/admin/index.html';
  }, []);
  return null;
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<div className="flex h-screen items-center justify-center bg-surface text-primary">LOADING ENGINE...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="configurator" element={<CustomBuild />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="faq" element={<FAQ />} />
            </Route>
            {/* Redirect for Decap CMS */}
            <Route path="/admin" element={<AdminRedirect />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  )
}

export default App
