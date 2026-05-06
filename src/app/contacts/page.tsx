"use client";

import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';

export default function ContactsPage() {
  const router = useRouter();

  return (
    <>
      <Navigation />
      <main>
        {/* HERO BLOCK */}
        <section className="bg-[#111] text-white py-32 px-16">
          <h1 className="text-7xl font-light tracking-tight">
            КОНТАКТЫ
          </h1>
          <p className="text-neutral-400 text-lg mt-4">
            Свяжитесь с нами для обсуждения вашего проекта
          </p>
        </section>

        {/* CONTACT INFO SECTION */}
        <section className="bg-white py-24 px-16">
          <div className="max-w-6xl mx-auto">
            {/* TWO-COLUMN LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              
              {/* LEFT COLUMN - Contact Info */}
              <div>
                <h2 className="text-3xl font-light mb-8">
                  Информация
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-neutral-400 text-sm uppercase tracking-wider mb-2">Email</p>
                    <a 
                      href="mailto:immisaylova@gmail.com" 
                      className="text-neutral-900 text-lg hover:text-neutral-600 transition-colors duration-300"
                    >
                      immisaylova@gmail.com
                    </a>
                  </div>
   
                  <div>
                    <p className="text-neutral-400 text-sm uppercase tracking-wider mb-2">Телефон</p>
                    <a 
                      href="tel:+79309926600" 
                      className="text-neutral-900 text-lg hover:text-neutral-600 transition-colors duration-300"
                    >
                      +7-930-992-66-00
                    </a>
                  </div>
  
                </div>

                {/* LEGAL INFO */}
                <div className="mt-12 pt-8 border-t border-neutral-200">
                  <p className="text-neutral-400 text-xs uppercase tracking-wider mb-2">Юридическая информация</p>
                  <div className="space-y-1 text-sm text-neutral-500">
                    <p>ИНН: 381119727676</p>
                    <p>ОГРНИП: 321385000070508</p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - Social Media */}
              <div>
                <h2 className="text-3xl font-light mb-8">
                  Социальные сети
                </h2>

                <div className="space-y-4">
                  {/* Active Social Links */}
                  <a 
                    href="https://www.instagram.com/m9.buro/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group p-4 border-b border-neutral-200 hover:bg-neutral-50 transition-all duration-300"
                  >
                    <span className="text-neutral-900 text-lg">Instagram</span>
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.116.143 4.648 1.571 3.124 3.124 3.124 4.648 1.428 4.678.07 4.85.07 3.204 0 3.584-.012 4.85-.07 3.116-.143 4.648-1.571 3.124-3.124 3.124-4.648 1.428-4.678.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.116-.143-4.648-1.571-3.124-3.124-3.124-4.648-1.428-4.678-.07-4.85-.07zm0-2.163c-2.641 0-2.976.013-4.25.072-1.537.068-3.115.42-4.512 1.825-1.397 1.397-1.757 2.975-1.825 4.512-.059 1.274-.072 4.25-.072s3.191.013 4.25.072c1.537.068 3.115.42 4.512 1.825 1.397 1.397 1.757 2.975 1.825 4.512.059 1.274.072 4.25.072zm0 5.594a5.406 5.406 0 1 1 0 10.812 5.406 5.406 0 0 1 0-10.812zm6.406-2.032a1.188 1.188 0 1 1-2.376 0 1.188 1.188 0 0 1 2.376 0z"/>
                    </svg>
                  </a>

                  <a 
                    href="https://www.behance.net/misaylova26aa8" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group p-4 border-b border-neutral-200 hover:bg-neutral-50 transition-all duration-300"
                  >
                    <span className="text-neutral-900 text-lg">Behance</span>
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.5 11c1.381 0 2.5-1.119 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.119-2.5 2.5 1.119 2.5 2.5 2.5zm0-4c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm9 4c1.381 0 2.5-1.119 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.119-2.5 2.5 1.119 2.5 2.5 2.5zm0-4c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-8.5 2c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5-1.119-2.5-2.5-2.5 1.119-2.5 2.5 1.119 2.5 2.5zm0 4c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm17 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm-8.5-2.5c0-1.381-1.119-2.5-2.5-2.5s-2.5 1.119-2.5 2.5 1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5zm-2.5 4c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4zm8.5-4c0-1.381-1.119-2.5-2.5-2.5s-2.5 1.119-2.5 2.5 1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5zm-2.5 4c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4z"/>
                    </svg>
                  </a>

                  {/* Placeholder Social Links */}
                  <div className="flex items-center justify-between group p-4 border-b border-neutral-200 opacity-50 cursor-not-allowed">
                    <span className="text-neutral-900 text-lg">WhatsApp</span>
                    <span className="text-neutral-400 text-xs uppercase tracking-wider">Скоро</span>
                  </div>

                  <div className="flex items-center justify-between group p-4 border-b border-neutral-200 opacity-50 cursor-not-allowed">
                    <span className="text-neutral-900 text-lg">Telegram</span>
                    <span className="text-neutral-400 text-xs uppercase tracking-wider">Скоро</span>
                  </div>

                  <div className="flex items-center justify-between group p-4 border-b border-neutral-200 opacity-50 cursor-not-allowed">
                    <span className="text-neutral-900 text-lg">MAX</span>
                    <span className="text-neutral-400 text-xs uppercase tracking-wider">Скоро</span>
                  </div>

                  <div className="flex items-center justify-between group p-4 border-b border-neutral-200 opacity-50 cursor-not-allowed">
                    <span className="text-neutral-900 text-lg">Pinterest</span>
                    <span className="text-neutral-400 text-xs uppercase tracking-wider">Скоро</span>
                  </div>

                  <div className="flex items-center justify-between group p-4 border-b border-neutral-200 opacity-50 cursor-not-allowed">
                    <span className="text-neutral-900 text-lg">YouTube</span>
                    <span className="text-neutral-400 text-xs uppercase tracking-wider">Скоро</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BLOCK */}
        <section className="bg-[#f7f6f4] py-24 px-16 text-center">
          <h2 className="text-3xl font-light mb-8">
            Готовы начать проект?
          </h2>
          <button
            onClick={() => router.push('/#contact')}
            className="bg-black text-white px-12 py-4 text-sm tracking-widest uppercase hover:bg-neutral-800 transition-colors inline-block cursor-pointer"
          >
            Оставить заявку
          </button>
        </section>
      </main>
    </>
  );
}