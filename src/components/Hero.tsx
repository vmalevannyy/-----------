"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Импорт стилей Swiper (должны быть в глобальном CSS, но можно и тут)
import 'swiper/css';
import 'swiper/css/effect-fade';

const images = [
  '/images/MainPage/001_0000.webp',
  '/images/MainPage/001_Spalnya005_0000.webp',
  '/images/MainPage/001_Spalnya008_0000.webp',
  '/images/MainPage/001_Timesquare006_0000.webp',
  '/images/MainPage/001_VORONEZH003_0000.webp',
  '/images/MainPage/001_VORONEZH010_0000.webp',
  '/images/MainPage/002_0000.webp',
  '/images/MainPage/2_006_0000.webp',
  '/images/MainPage/010_0000.webp',
  '/images/MainPage/Corona_Camera006_0000.webp',
  '/images/MainPage/IMG_1587.webp',
  '/images/MainPage/Livingroom_001_0000.webp', 
  '/images/MainPage/Livingroom_005_0000.webp',
  '/images/MainPage/VR_LR_003_0000.webp',
  '/images/MainPage/СПАЛЬНЯ_001_0100.webp',
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-neutral-900">
      {/* Слайдер */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        fadeEffect={{ crossFade: true }}
        speed={1500} // Чуть медленнее для "люксового" спокойствия
        loop={true}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image} className="relative w-full h-full">
              <Image
                src={image}
                alt={`Luxury Interior Design ${index + 1}`}
                fill
                priority={index === 0} // Приоритет загрузки для первого кадра
                className="object-cover"
                sizes="100vw"
                placeholder="empty"
                quality={90}
              />
            </SwiperSlide>
        ))}
      </Swiper>

      {/* Оверлей — используем градиент для глубины */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Контент */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center px-4">
          {/* Скрытый h1 для SEO, если его нет в другом месте */}
          <h1 className="sr-only">M9 Architecture & Design</h1>
          
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-10 py-4 bg-white text-black text-sm font-medium tracking-[0.15em] uppercase rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10">Начать проект</span>
          </button>
        </div>
      </div>
    </section>
  );
}