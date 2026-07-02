"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const hotspots = [
  { id: "gat", label: "Gât / ceafă", top: "14%", left: "50%", sectionId: "serviciu-anf" },
  { id: "umar", label: "Umăr", top: "19%", left: "63%", sectionId: "serviciu-electroterapie" },
  { id: "coloana", label: "Coloană / lombar", top: "38%", left: "50%", sectionId: "serviciu-schroth" },
  { id: "genunchi", label: "Genunchi", top: "70%", left: "42%", sectionId: "serviciu-kinetoterapie" },
  { id: "glezna", label: "Gleznă", top: "88%", left: "58%", sectionId: "serviciu-dynamictape" },
] as const;

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function HeroSkeleton() {
  return (
    <div
      className="relative mx-auto h-[400px] sm:h-[500px] md:h-[600px]"
      style={{ aspectRatio: "3466 / 6000" }}
    >
      <Image
        src="/schelet-spate.png"
        alt="Schelet uman, vedere din spate"
        fill
        priority
        sizes="(max-width: 768px) 60vw, 350px"
        className="object-contain select-none pointer-events-none"
      />

      {hotspots.map((point) => (
        <motion.button
          key={point.id}
          type="button"
          aria-label={point.label}
          onClick={() => scrollToSection(point.sectionId)}
          className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal cursor-pointer"
          style={{ top: point.top, left: point.left }}
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 0 0 rgba(2, 180, 172, 0.5)",
              "0 0 0 8px rgba(2, 180, 172, 0)",
              "0 0 0 0 rgba(2, 180, 172, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{
            scale: 1.3,
            boxShadow:
              "0 0 0 10px rgba(2, 180, 172, 0.35), 0 0 16px 4px rgba(2, 180, 172, 0.65)",
          }}
        />
      ))}
    </div>
  );
}
