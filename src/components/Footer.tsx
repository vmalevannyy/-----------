import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#f7f6f4] py-6 px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Left: Copyright */}
        <span className="text-neutral-400 text-xs tracking-[0.2em] uppercase">
          © 2025 M9
        </span>

        {/* Center: Separator + Links */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 tracking-[0.2em] uppercase">
          <a 
            href="https://www.instagram.com/m9.buro/" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 transition-colors duration-300"
          >
            Instagram
          </a>
          <span>·</span>
          <Link 
            href="/contacts"
            className="hover:text-neutral-900 transition-colors duration-300"
          >
            Контакты
          </Link>
        </div>
      </div>
    </footer>
  );
}