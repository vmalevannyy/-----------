import Navigation from '../../components/Navigation';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      name: "Экспресс-проект",
      price: "3 500 ₽/кв.м.",
      items: [
        "Встреча и бриф",
        "Создание концепции проекта в виде коллажа",
        "Базовые чертежи для стройки",
      ],
    },
    {
      name: "Стандартный проект",
      price: "6 000 ₽/кв.м.",
      items: [
        "Встреча и бриф",
        "Создание концепции проекта и 3D визуализаций",
        "Подготовка полного альбома чертежей",
        "Комплектация и составление проектных смет",
      ],
    },
    {
      name: "Авторский надзор",
      price: "50 000 ₽/месяц",
      items: [
        "Выезды на объект 3 раза в месяц",
        "Контроль сроков и технологий реализации",
        "Мониторинг реализации проекта",
      ],
    },
  ];

  return (
    <>
      <Navigation />
      <main>
      {/* HERO BLOCK */}
      <section className="bg-[#111] text-white py-32 px-16">
        <h1 className="text-7xl font-light tracking-tight">УСЛУГИ</h1>
        <p className="text-neutral-400 text-lg mt-4">
          Полный спектр услуг по проектированию и реализации интерьеров
        </p>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-white">
        {services.map((service, index) => (
          <div
            key={index}
            className="border-t border-neutral-200 py-12 px-16 flex justify-between items-start hover:bg-neutral-50 transition-colors duration-300"
          >
            <div>
              <h2 className="text-4xl font-light text-neutral-900">
                {service.name}
              </h2>
              <ul className="mt-6">
                {service.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-neutral-500 text-sm leading-8 before:content-['—_']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-2xl font-light text-neutral-900 whitespace-nowrap ml-8">
              {service.price}
            </div>
          </div>
        ))}
      </section>

      {/* CTA BLOCK */}
      <section className="bg-[#f7f6f4] py-24 px-16 text-center">
        <h2 className="text-3xl font-light mb-8">
          Хотите узнать стоимость вашего проекта?
        </h2>
        <Link
          href="/#contact"
          className="bg-black text-white px-12 py-4 text-sm tracking-widest uppercase hover:bg-neutral-800 transition-colors inline-block"
        >
          Связаться с нами
        </Link>
      </section>
    </main>
    </>
  );
}
