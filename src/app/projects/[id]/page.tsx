"use client";

import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { projects } from '@/data/projects';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

const LUXURY_EASE = [0.2, 0, 0, 1] as any;
const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

function Lightbox({ 
  images, 
  currentIndex, 
  onClose, 
  onNavigate 
}: { 
  images: string[]; 
  currentIndex: number; 
  onClose: () => void; 
  onNavigate: (index: number) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [direction, setDirection] = useState(0);

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  // Preload adjacent images
  useEffect(() => {
    const preload = (url: string) => {
      const img = new window.Image();
      img.src = url;
    };
    if (currentIndex > 0) preload(images[currentIndex - 1]);
    if (currentIndex < images.length - 1) preload(images[currentIndex + 1]);
  }, [currentIndex, images]);

  // Reset loaded state when index changes
  useEffect(() => {
    setImgLoaded(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setDirection(-1);
        onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
      } else if (e.key === 'ArrowRight') {
        setDirection(1);
        onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '32px',
          cursor: 'pointer',
          zIndex: 1001,
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >
        ✕
      </button>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        style={{
          position: 'absolute',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '48px',
          cursor: 'pointer',
          zIndex: 1001,
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '48px',
          cursor: 'pointer',
          zIndex: 1001,
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >
        ›
      </button>

      {/* Image */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
          style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            cursor: 'default',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Loading Skeleton */}
          {!imgLoaded && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          )}
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            width={1200}
            height={800}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
            onLoad={() => setImgLoaded(true)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Counter */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '14px',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
        }}
      >
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
}

function ProjectImage({ src, alt, index, onClick }: { src: string; alt: string; index: number; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.05]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        position: 'relative', 
        overflow: 'hidden',
        width: '100%',
        aspectRatio: index % 3 === 0 ? '16/9' : '4/3',
        cursor: onClick ? 'pointer' : 'default',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: LUXURY_EASE }}
      onClick={onClick}
    >
      <motion.div
        style={{
          y,
          scale,
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          placeholder="empty"
          quality={90}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1400px"
        />
      </motion.div>
    </motion.div>
  );
}

export default function ProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const shouldReduceMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Проект не найден (id: {projectId})</div>;
  }

  const currentIndex = projects.findIndex(p => p.id === projectId);
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const handleBack = () => {
    router.push('/#projects');
  };

  const handleNext = () => {
    router.push(`/projects/${nextProject.id}`);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Navigation */}
      <Navigation />
      
      {/* Header with luxury typography */}
      <motion.div 
        style={{ 
          position: 'relative', 
          padding: '6rem 2rem 4rem',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: LUXURY_EASE }}
      >
        <button
          onClick={handleBack}
          style={{
            position: 'absolute',
            top: '3rem',
            left: '2rem',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '0.75rem',
            cursor: 'pointer',
            color: '#666',
            fontWeight: 300,
            letterSpacing: '0.5px',
            padding: 0,
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          ← Назад в галерею
        </button>
        
        <h1 style={{ 
          textAlign: 'center', 
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
          fontWeight: 200,
          margin: 0, 
          letterSpacing: '-0.02em',
          color: '#111',
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
        }}>
          {project.title}
        </h1>

        {/* Project Info Bar */}
        {(project.location || project.area || project.year) && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '2rem',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#666',
          }}>
            {project.location && <span>{project.location}</span>}
            {project.area && <span>{project.area}</span>}
            {project.year && <span>{project.year}</span>}
          </div>
        )}
      </motion.div>

      {/* Editorial Rhythm Gallery */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        padding: '0 2rem',
      }}>
        {project.images.map((image, index) => {
          const isFullBleed = index % 4 === 0;
          const isAsymmetricLeft = index % 4 === 1;
          const isAsymmetricRight = index % 4 === 2;
          const isPair = index % 4 === 3;

          if (isFullBleed) {
            return (
              <motion.div
                key={index}
                style={{ marginBottom: '8rem' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: LUXURY_EASE }}
              >
                <ProjectImage 
                  src={image} 
                  alt={`${project.title} ${index + 1}`} 
                  index={index}
                  onClick={() => openLightbox(index)}
                />
              </motion.div>
            );
          } else if (isAsymmetricLeft) {
            return (
              <motion.div
                key={index}
                style={{ 
                  display: 'flex',
                  gap: '2px',
                  marginBottom: '8rem',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: LUXURY_EASE }}
              >
                <div style={{ width: '60%' }}>
                  <ProjectImage 
                    src={image} 
                    alt={`${project.title} ${index + 1}`} 
                    index={index}
                    onClick={() => openLightbox(index)}
                  />
                </div>
                <div style={{ width: '40%' }} />
              </motion.div>
            );
          } else if (isAsymmetricRight && index > 0) {
            const prevImage = project.images[index - 1];
            return (
              <motion.div
                key={index}
                style={{ 
                  display: 'flex',
                  gap: '2px',
                  marginBottom: '8rem',
                  marginTop: '-8rem',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: LUXURY_EASE }}
              >
                <div style={{ width: '40%' }} />
                <div style={{ width: '60%' }}>
                  <ProjectImage 
                    src={image} 
                    alt={`${project.title} ${index + 1}`} 
                    index={index}
                    onClick={() => openLightbox(index)}
                  />
                </div>
              </motion.div>
            );
          } else if (isPair) {
            const nextIndex = index + 1;
            const nextImage = project.images[nextIndex];
            if (!nextImage) return null;
            
            return (
              <motion.div
                key={index}
                style={{ 
                  display: 'flex',
                  gap: '2px',
                  marginBottom: '8rem',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: LUXURY_EASE }}
              >
                <div style={{ flex: '1' }}>
                  <ProjectImage 
                    src={image} 
                    alt={`${project.title} ${index + 1}`} 
                    index={index}
                    onClick={() => openLightbox(index)}
                  />
                </div>
                <div style={{ flex: '1' }}>
                  <ProjectImage 
                    src={nextImage} 
                    alt={`${project.title} ${nextIndex + 1}`} 
                    index={nextIndex}
                    onClick={() => openLightbox(nextIndex)}
                  />
                </div>
              </motion.div>
            );
          }
          return null;
        })}
      </div>

      {/* Next Project Section */}
      <motion.div
        style={{ 
          padding: '6rem 2rem', 
          borderTop: '1px solid #eee',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: LUXURY_EASE }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#666',
          }}>
            Следующий проект
          </span>
        </div>
        
        <motion.div
          onClick={handleNext}
          style={{
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: '16/9',
          }}
          whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
        >
          <Image
            src={nextProject.images[0]}
            alt={nextProject.title}
            fill
            style={{
              objectFit: 'cover',
            }}
            placeholder="empty"
            quality={90}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 1400px"
          />
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
          >
            <h3
              style={{
                color: '#fff',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 200,
                textAlign: 'center',
                margin: 0,
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
              }}
            >
              {nextProject.title}
            </h3>
          </motion.div>
        </motion.div>

        {/* Navigation buttons */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '3rem',
        }}>
          <button
            onClick={handleBack}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '0.75rem',
              cursor: 'pointer',
              color: '#666',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '1rem 0',
              borderBottom: '1px solid #ddd',
              transition: 'all 0.6s cubic-bezier(0.2, 0, 0, 1)',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.letterSpacing = '0.15em';
              e.currentTarget.style.borderBottomColor = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.letterSpacing = '0.1em';
              e.currentTarget.style.borderBottomColor = '#ddd';
            }}
          >
            ← Все проекты
          </button>
          
          <button
            onClick={handleNext}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '0.75rem',
              cursor: 'pointer',
              color: '#666',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '1rem 0',
              borderBottom: '1px solid #ddd',
              transition: 'all 0.6s cubic-bezier(0.2, 0, 0, 1)',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.letterSpacing = '0.15em';
              e.currentTarget.style.borderBottomColor = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.letterSpacing = '0.1em';
              e.currentTarget.style.borderBottomColor = '#ddd';
            }}
          >
            Следующий проект: {nextProject.title} →
          </button>
        </div>
      </motion.div>

      {/* CTA Section */}
      <div style={{
        backgroundColor: 'oklch(0.1 0 0)',
        color: 'white',
        padding: '5rem 1rem',
      }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              marginBottom: '2rem',
              margin: 0,
            }}
          >
            Готовы начать свой проект?
          </h2>
          <button
            onClick={() => { window.location.href = '/#contact'; }}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid white',
              color: 'white',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              padding: '1rem 3rem',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.5s cubic-bezier(0.2, 0, 0, 1)',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'black';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
          >
            НАЧАТЬ ПРОЕКТ
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={project.images}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNavigate={navigateLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}