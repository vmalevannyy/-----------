"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactsSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+7 ',
    object: '',
    location: '',
    projectType: '',
    area: '',
    agreePolicy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [phoneError, setPhoneError] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [shakeButton, setShakeButton] = useState(false);

  useEffect(() => {
    setSubmitMessage('');
    setPhoneError(false);
    setSubmitStatus(null);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, ''); // только цифры
    // Убираем ведущую 7, если есть (будет добавлена как +7)
    if (digits.startsWith('7')) {
      digits = digits.slice(1);
    }
    // Максимум 10 цифр после +7
    if (digits.length > 10) {
      digits = digits.slice(0, 10);
    }
    // Форматируем как +7 (XXX) XXX-XX-XX
    let formatted = '+7';
    if (digits.length > 0) {
      formatted += ' (' + digits.slice(0, 3) + ')';
    }
    if (digits.length > 3) {
      formatted += ' ' + digits.slice(3, 6);
    }
    if (digits.length > 6) {
      formatted += '-' + digits.slice(6, 8);
    }
    if (digits.length > 8) {
      formatted += '-' + digits.slice(8, 10);
    }
    setFormData((prev) => ({ ...prev, phone: formatted }));
    // Валидация: должно быть ровно 10 цифр после +7 (всего 11 с 7)
    const phoneDigits = formatted.replace(/\D/g, '');
    setPhoneError(phoneDigits.length > 1 && phoneDigits.length < 11);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 50 * 1024 * 1024) {
      alert('Файл слишком большой. Максимум 50 МБ.');
      e.target.value = '';
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Definitive phone validation
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      setPhoneError(true);
      setSubmitMessage('Пожалуйста, введите полный номер телефона');
      setSubmitStatus('error');
      setShakeButton(true);
      setTimeout(() => setShakeButton(false), 300);
      return;
    }

    // Validate select fields
    if (!formData.object || !formData.location || !formData.projectType) {
      setSubmitMessage('Пожалуйста, заполните все обязательные поля');
      setSubmitStatus('error');
      return;
    }

    if (!formData.agreePolicy) {
      setSubmitMessage('Пожалуйста, согласитесь с политикой конфиденциальности');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      // Send clean phone format: + and digits
      const cleanPhone = '+' + phoneDigits;
      formDataToSend.append('phone', cleanPhone);
      formDataToSend.append('object', formData.object);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('projectType', formData.projectType);
      formDataToSend.append('area', formData.area);
      
      if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitMessage('Спасибо! Мы свяжемся с вами в ближайшее время.');
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '+7 ',
          object: '',
          location: '',
          projectType: '',
          area: '',
          agreePolicy: false,
        });
        setSelectedFile(null);
      } else {
        setSubmitMessage('Ошибка при отправке. Попробуйте еще раз.');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Ошибка при отправке. Попробуйте еще раз.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldStyle = {
    width: '100%',
    padding: '1.25rem 0',
    fontSize: '1rem',
    border: 'none',
    borderBottom: '1px solid #ddd',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.3s ease',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 400,
    marginBottom: '0.75rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    color: '#666',
  };

  // Custom Select Component
  function CustomSelect({ name, options, placeholder }: { name: string; options: { value: string; label: string }[]; placeholder: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.value === formData[name as keyof typeof formData]);

    return (
      <div ref={ref} style={{ position: 'relative', width: '100%' }}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            ...fieldStyle,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: isOpen ? '1px solid #000' : fieldStyle.borderBottom,
          }}
        >
          <span style={{ color: formData[name as keyof typeof formData] ? '#000' : 'rgba(0,0,0,0.25)', fontWeight: 300, letterSpacing: '0.3px' }}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            style={{ display: 'inline-block', fontSize: '0.8rem', color: '#666' }}
          >
            ▼
          </motion.span>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                border: '1px solid #eee',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                zIndex: 10,
                marginTop: '2px',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  style={{
                    padding: '1.25rem 0',
                    cursor: 'pointer',
                    backgroundColor: option.value === formData[name as keyof typeof formData] ? '#000' : 'transparent',
                    color: option.value === formData[name as keyof typeof formData] ? '#fff' : '#000',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontSize: '1rem',
                    letterSpacing: '0.3px',
                    fontWeight: 300,
                    borderBottom: '1px solid #eee',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (option.value !== formData[name as keyof typeof formData]) {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (option.value !== formData[name as keyof typeof formData]) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#000';
                    }
                  }}
                >
                  {option.label}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section id="contact" style={{ padding: '8rem 2rem', backgroundColor: '#fff', scrollMarginTop: '80px' }}>
      <style>
        {`
          #contact {
            --color-error: oklch(45% 0.15 30);
            --color-error-bg: oklch(95% 0.05 30);
          }
          input::placeholder, select::placeholder {
            color: rgba(0, 0, 0, 0.25) !important;
            font-weight: 300;
            letter-spacing: 0.3px;
          }
          input:focus, select:focus {
            outline: none;
            border-bottom-color: #000;
          }
        `}
      </style>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '3.5rem', fontWeight: 200, marginBottom: '3rem', letterSpacing: '-0.02em', textAlign: 'center' }}>
          НАЧАТЬ ПРОЕКТ
        </h2>

         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           {/* Ряд 1: Имя и Телефон */}
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
             <div>
               <input
                 type="text"
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                 required
                 placeholder="Ваше имя"
                 style={fieldStyle}
               />
             </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onBlur={() => {
                    const phoneDigits = formData.phone.replace(/\D/g, '');
                    if (phoneDigits.length > 1 && phoneDigits.length < 11) {
                      setPhoneError(true);
                    }
                  }}
                  required
                  placeholder="+7"
                  style={{
                    ...fieldStyle,
                    borderBottom: phoneError ? '1px solid var(--color-error)' : fieldStyle.borderBottom,
                  }}
                />
                {phoneError && (
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-error)',
                    marginTop: '0.5rem',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    letterSpacing: '0.05em',
                  }}>
                    Пожалуйста, введите полный номер телефона
                  </div>
                )}
              </div>
           </div>

           {/* Ряд 2: Объект и Локация */}
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
             <div>
               <CustomSelect
                 name="object"
                 options={[
                   { value: 'Квартира', label: 'Квартира' },
                   { value: 'Дом', label: 'Дом' },
                   { value: 'Коммерческое помещение', label: 'Коммерческое помещение' },
                 ]}
                 placeholder="Объект"
               />
             </div>
             <div>
               <CustomSelect
                 name="location"
                 options={[
                   { value: 'Москва', label: 'Москва' },
                   { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
                   { value: 'Другой регион', label: 'Другой регион' },
                   { value: 'Европа', label: 'Европа' },
                   { value: 'Дубай', label: 'Дубай' },
                 ]}
                 placeholder="Локация"
               />
             </div>
           </div>

           {/* Ряд 3: Что проектируем, Площадь и Файл */}
           <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '2rem', alignItems: 'baseline' }}>
             <div>
               <CustomSelect
                 name="projectType"
                 options={[
                   { value: 'Интерьер', label: 'Интерьер' },
                   { value: 'Архитектура', label: 'Архитектура' },
                   { value: 'Архитектура и интерьер', label: 'Архитектура и интерьер' },
                 ]}
                 placeholder="Что проектируем"
               />
             </div>
             <div>
               <input
                 type="number"
                 name="area"
                 value={formData.area}
                 onChange={handleChange}
                 required
                 placeholder="Площадь"
                 min="1"
                 style={fieldStyle}
               />
             </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf,.dwg,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    zIndex: 1,
                  }}
                />
                <label
                  htmlFor="file-upload"
                  style={{
                    ...fieldStyle,
                    display: 'block',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {selectedFile ? 'Готово ✓' : 'Выберите файл'}
                </label>
              </div>
           </div>

          {/* Чекбокс согласия */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input
              type="checkbox"
              name="agreePolicy"
              checked={formData.agreePolicy}
              onChange={handleChange}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            />
            <label style={{ margin: 0, fontSize: '0.95rem', cursor: 'pointer' }}>
              Я согласен с политикой конфиденциальности
            </label>
          </div>

          {/* Кнопка отправки */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            animate={shakeButton ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.3 }}
            style={{
              padding: '1.5rem 5rem',
              fontSize: '1.1rem',
              fontWeight: 400,
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              cursor: (isSubmitting || phoneError) ? 'not-allowed' : 'pointer',
              transition: 'all 0.6s cubic-bezier(0.2, 0, 0, 1)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              width: '100%',
              maxWidth: '450px',
              margin: '2rem auto 0',
              display: 'block',
              opacity: phoneError ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting && !phoneError) {
                e.currentTarget.style.backgroundColor = '#222';
                e.currentTarget.style.letterSpacing = '3px';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000';
              e.currentTarget.style.letterSpacing = '2px';
            }}
          >
            {isSubmitting ? 'Отправка...' : 'ОТПРАВИТЬ'}
          </motion.button>
        </form>

        {submitMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            style={{
              marginTop: '2rem',
              padding: '1.25rem',
              backgroundColor: submitStatus === 'success' ? 'rgba(0, 0, 0, 0.05)' : 'var(--color-error-bg)',
              color: submitStatus === 'success' ? '#333' : 'var(--color-error)',
              fontSize: '0.95rem',
              textAlign: 'center',
              borderLeft: submitStatus === 'success' ? '2px solid #333' : '2px solid var(--color-error)',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            {submitMessage}
          </motion.div>
        )}
      </div>
    </section>
  );
}