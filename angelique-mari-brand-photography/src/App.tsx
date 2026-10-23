/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import AboutMe from './components/AboutMe';
import ReviewModal from './components/ReviewModal';
import ClientGalleryModal from './components/ClientGalleryModal';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bioModalOpen, setBioModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [clientGalleryOpen, setClientGalleryOpen] = useState(false);

  // Hash-based routing synchronization for #review and #client-gallery
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#review' || hash === '#review-freelancer' || hash === '#write-review') {
        setReviewModalOpen(true);
      } else if (hash === '#client-gallery' || hash === '#gallery') {
        setClientGalleryOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenReviewModal = () => {
    window.location.hash = '#review';
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
    const hash = window.location.hash.toLowerCase();
    if (hash === '#review' || hash === '#review-freelancer' || hash === '#write-review') {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleOpenClientGallery = () => {
    window.location.hash = '#client-gallery';
    setClientGalleryOpen(true);
  };

  const handleCloseClientGallery = () => {
    setClientGalleryOpen(false);
    const hash = window.location.hash.toLowerCase();
    if (hash === '#client-gallery' || hash === '#gallery') {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-black text-[#FF6800] overflow-x-hidden selection:bg-[#FF6800] selection:text-black">
        {/* Stage 1: Arrive (Cinematic, focused Hero) */}
        <Hero
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onReviewClick={handleOpenReviewModal}
          onClientGalleryClick={handleOpenClientGallery}
        />

        {/* Stage 2 & 3: Experience & Explore (Selected Archival Works) */} 
        <Portfolio /> 

        {/* Stage 3.5: About Me (Editorial Artist Profile inspired by reference) */}
        <AboutMe onBioModalToggle={setBioModalOpen} />

        {/* Stage 4: Enquire (Visual Category Cards & Direct WhatsApp Confirmation) */}
        <EnquiryForm /> 
        
        {/* Editorial Brand Footer */}
        <Footer onReviewClick={handleOpenReviewModal} /> 
      </div>

      {/* Review Freelancer Modal with Hash Routing (#review) */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={handleCloseReviewModal}
      />

      {/* Client Gallery Passcode Portal Modal (#client-gallery) */}
      <ClientGalleryModal
        isOpen={clientGalleryOpen}
        onClose={handleCloseClientGallery}
      />

      {/* Native Brand Floating WhatsApp Widget (hidden when modal/drawer is open) */}
      <WhatsAppWidget isHidden={menuOpen || bioModalOpen || reviewModalOpen || clientGalleryOpen} />
    </>
  );
}
