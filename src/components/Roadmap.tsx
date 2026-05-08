"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const NAVBAR_HEIGHT = 64;

type Step = {
  number: string;
  title: string;
  description: string[];
  image: string;
};

const steps: Step[] = [
  {
    number: '01',
    title: 'Знакомство',
    description: [
      'Первичная консультация и выезд на объект',
      'Обсуждение задачи и целей проекта',
      'Детальное изучение ваших пожеланий',
    ],
    image: '/images/roadmap-stages/roadmap-1.png',
  },
  {
    number: '02',
    title: 'Бриф',
    description: [
      'Составление технического задания',
      'Сбор референсов и пожеланий',
    ],
    image: '/images/roadmap-stages/roadmap-2.png',
  },
  {
    number: '03',
    title: 'Концепция',
    description: [
      'Формирование концепции и стилистики',
      'Создание планировочного решения',
      '3D визуализация пространства',
    ],
    image: '/images/roadmap-stages/roadmap-3.png',
  },
  {
    number: '04',
    title: 'Разработка',
    description: [
      'Проектирование альбома рабочих чертежей',
      'Подготовка технической документации',
      'Разработка спецификаций и сметы',
    ],
    image: '/images/roadmap-stages/roadmap-4.png',
  },
  {
    number: '05',
    title: 'Авторский надзор',
    description: [
      'Контроль на всех этапах строительства',
      'Выезды на объект и проверка качества',
      'Корректировка решений в процессе',
    ],
    image: '/images/roadmap-stages/roadmap-5.png',
  },
];

export default function Roadmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState(0); // 0-1 within current step
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const offsetTop = section.offsetTop;
      const offsetHeight = section.offsetHeight;

      const progress = (scrollY - offsetTop) / (offsetHeight - windowHeight);
      const clampedProgress = Math.min(1, Math.max(0, progress));

      const index = Math.min(steps.length - 1, Math.max(0, Math.floor(clampedProgress * steps.length)));
      
      // Calculate progress within current step
      const stepProg = (clampedProgress * steps.length) - index;
      const clampedStepProg = Math.min(1, Math.max(0, stepProg));

      setActiveIndex(index);
      setStepProgress(clampedStepProg);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const activeStep = steps[activeIndex];

  return (
    <motion.section
      id="process"
      ref={sectionRef}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.2, 0, 0, 1] as any }}
      style={{
        height: '350vh',
        position: 'relative',
        backgroundColor: '#f7f6f4',
        color: '#111',
        fontFamily: 'var(--font-geist-sans), sans-serif',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .roadmap-container {
            flex-direction: column !important;
          }
          .roadmap-image-col {
            height: 260px !important;
            flex: 1 1 100% !important;
            order: -1;
          }
          .roadmap-text-col {
            flex: 1 1 100% !important;
          }
        }
      `}</style>
      <div
        style={{
          position: 'sticky',
          top: NAVBAR_HEIGHT + 'px',
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px 64px 80px 64px',
        }}
      >
        <div
          className="roadmap-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            width: '100%',
            flex: 1,
          }}
        >
          {/* LEFT COLUMN */}
          <div className="roadmap-text-col" style={{ flex: '0 0 45%' }}>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.3em',
                color: '#999',
                marginBottom: '24px',
                textTransform: 'uppercase',
                fontFamily: 'inherit',
              }}
            >
              Процесс работы
            </div>
            <div
              style={{
                fontSize: 'clamp(2.5rem, 4vw, 4.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                marginBottom: '48px',
                letterSpacing: '-0.02em',
                fontFamily: 'inherit',
              }}
            >
              Шаг за шагом
            </div>
            {/* Step content with animation */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] as any }}
            >
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 500,
                  marginBottom: '16px',
                  color: '#111',
                  fontFamily: 'inherit',
                }}
              >
                {activeStep.title}
              </div>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                {activeStep.description.map((item, i) => (
                  <li key={i} style={{
                    fontSize: '17px',
                    lineHeight: 1.6,
                    color: '#444',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}>
                    <span style={{ 
                      color: '#aaa', 
                      fontSize: '13px',
                      marginTop: '3px',
                      flexShrink: 0,
                    }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Visual Images */}
          <div className="roadmap-image-col" style={{ 
            flex: '0 0 45%', 
            position: 'relative', 
            height: 'calc(100vh - 220px)',
            minHeight: '400px',
          }}>
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <Image
                  key={step.number}
                  src={step.image}
                  alt={step.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out',
                  }}
                  sizes="45vw"
                  placeholder="empty"
                  quality={90}
                />
              );
            })}
            {/* Current step number large display - background watermark */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] as any }}
              style={{
                position: 'absolute',
                right: '64px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 'clamp(100px, 16vw, 200px)',
                opacity: 0.07,
                color: '#111',
                fontFamily: 'inherit',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            >
              {activeStep.number}
            </motion.div>
          </div>
        </div>

        {/* BOTTOM INDICATORS - Progress Bars */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '64px',
            right: '64px',
            display: 'flex',
            gap: '8px',
          }}
        >
          {steps.map((step, index) => {
            let widthPercent = 0;
            if (index < activeIndex) {
              widthPercent = 100;
            } else if (index === activeIndex) {
              widthPercent = stepProgress * 100;
            } else {
              widthPercent = 0;
            }
            return (
              <div
                key={step.number}
                style={{
                  flex: 1,
                  height: '1px',
                  backgroundColor: 'rgba(0,0,0,0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${widthPercent}%`,
                    backgroundColor: '#111',
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}