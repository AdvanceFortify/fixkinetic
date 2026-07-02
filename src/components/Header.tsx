"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Acasă" },
  { href: "/despre", label: "Despre noi" },
  { href: "/servicii", label: "Servicii" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Fix Kinetic" width={40} height={40} />
          <span className="font-bold text-xl text-ink">
            Fix <span className="text-teal">Kinetic</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink-soft hover:text-teal transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:+40720699069"
          className="hidden md:inline-flex items-center rounded-full bg-teal px-5 py-2.5 text-white font-medium hover:bg-teal-dark transition-colors"
        >
          Programează-te acum!
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-ink"
          aria-label="Meniu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-4 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-ink-soft"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+40720699069"
            className="rounded-full bg-teal px-5 py-2.5 text-white font-medium text-center"
          >
            Programează-te acum!
          </a>
        </nav>
      )}
    </header>
  );
}