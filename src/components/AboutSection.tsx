"use client";

import { motion, useReducedMotion } from 'framer-motion';

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="about"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.2, 0, 0, 1] as any }}
      style={{
        padding: '8rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#fafaf5',
        scrollMarginTop: '80px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: shouldReduceMotion ? undefined : [0.2, 0, 0, 1] as any }}
          style={{
            fontSize: '2rem',
            lineHeight: 1.4,
            color: '#333',
            fontWeight: 200,
            letterSpacing: '-0.02em',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          Ваша индивидуальность — это ваши привычки. <br />
          Мы проектируем пространство, где вам не нужно <br />
          о них задумываться.
        </motion.p>
      </div>

       <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: shouldReduceMotion ? undefined : [0.2, 0, 0, 1] as any, delay: shouldReduceMotion ? 0 : 0.2 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div
            style={{
              width: '400px',
              aspectRatio: '3/4',
              backgroundColor: '#e8e8e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem',
              color: '#999',
              fontStyle: 'italic',
            }}
          >
            <img
              src="/images/Мари любимка моя/IMG_8447.JPG"
              alt="Команда"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>
       </motion.div>
    </motion.section>
  );
}