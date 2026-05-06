"use client";

import { useRouter, useParams } from 'next/navigation';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { projects } from '@/data/projects';
import { useRef } from 'react';
import Image from 'next/image';

const LUXURY_EASE = [0.2, 0, 0, 1] as any;
const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

function ProjectImage({ src, alt, index }: { src: string; alt: string; index: number }) {
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
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: LUXURY_EASE }}
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
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          loading="lazy"
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
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
                  />
                </div>
                <div style={{ flex: '1' }}>
                  <ProjectImage 
                    src={nextImage} 
                    alt={`${project.title} ${nextIndex + 1}`} 
                    index={nextIndex}
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
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            loading="lazy"
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
    </div>
  );
}