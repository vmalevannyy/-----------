"use client";

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { projects } from '@/data/projects';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const getItemVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as any }
  }
});

export default function ProjectsSection() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const handleProjectClick = (id: string) => {
    router.push(`/projects/${id}`);
  };

  return (
    <motion.div 
      id="projects" 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ backgroundColor: 'white', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', scrollMarginTop: '80px' }}
    >
      {projects.map((project, index) => (
        <ProjectItem 
          key={project.id}
          project={project} 
          onClick={() => handleProjectClick(project.id)} 
          aspectRatio={index === 2 || index === 5 || index === 8 ? "16/7" : "4/3"} 
          gridColumn={index === 2 || index === 5 || index === 8 ? "span 2" : undefined}
          shouldReduceMotion={shouldReduceMotion}
        />
      ))}
    </motion.div>
  );
}

function ProjectItem({ project, onClick, aspectRatio, gridColumn, shouldReduceMotion }: { 
  project: typeof projects[0]; 
  onClick: () => void; 
  aspectRatio: string; 
  gridColumn?: string;
  shouldReduceMotion: boolean | null;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [20, -20]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.05]);

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={getItemVariants(shouldReduceMotion)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        aspectRatio: aspectRatio,
        gridColumn: gridColumn,
      }}
    >
      <motion.img
        src={project.images[0]}
        alt={project.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          y: parallaxY,
          scale: parallaxScale,
        }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      />
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h3
          style={{
            color: '#fff',
            fontSize: '1.5rem',
            fontWeight: 200,
            textAlign: 'center',
            margin: 0,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
          }}
        >
          {project.title}
        </h3>
      </motion.div>
    </motion.div>
  );
}