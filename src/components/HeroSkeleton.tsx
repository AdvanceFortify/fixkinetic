"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const hotspots = [
  {
    id: "gat",
    label: "Gât / ceafă",
    top: "14%",
    left: "50%",
    sectionId: "serviciu-anf",
    tooltip:
      "ANF-therapy — discuri neuromodulatoare aplicate pe zonele inflamate, pentru reducerea durerii cervicale și a tensiunii musculare.",
  },
  {
    id: "umar",
    label: "Umăr",
    top: "19%",
    left: "63%",
    sectionId: "serviciu-electroterapie",
    tooltip:
      "Terapie Tecar — curent de radiofrecvență care generează căldură profundă, stimulează circulația și reduce inflamația în tendinite sau capsulită.",
  },
  {
    id: "coloana",
    label: "Coloană / lombar",
    top: "38%",
    left: "50%",
    sectionId: "serviciu-schroth",
    tooltip:
      "Terapia Schroth — exerciții tridimensionale de respirație și corecție posturală pentru probleme de coloană.",
  },
  {
    id: "genunchi",
    label: "Genunchi",
    top: "70%",
    left: "42%",
    sectionId: "serviciu-kinetoterapie",
    tooltip:
      "Kinetoterapie post-traumatică — program progresiv: control al durerii, refacerea mobilității, apoi întărirea musculară pentru stabilitate.",
  },
  {
    id: "glezna",
    label: "Gleznă",
    top: "88%",
    left: "58%",
    sectionId: "serviciu-dynamictape",
    tooltip: "Ține mișcarea și oferă stabilitate suplimentară la entorse.",
  },
] as const;

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function horizontalAnchorClass(leftPercent: number) {
  if (leftPercent >= 70) return "right-0 translate-x-0";
  if (leftPercent <= 30) return "left-0 translate-x-0";
  return "left-1/2 -translate-x-1/2";
}

function verticalAnchorClass(topPercent: number) {
  return topPercent <= 25 ? "top-full mt-3" : "bottom-full mb-3";
}

export default function HeroSkeleton() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeId) return;
    function handleOutsideClick(event: MouseEvent) {
      if (!(event.target instanceof Element) || !event.target.closest("[data-hotspot]")) {
        setActiveId(null);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [activeId]);

  return (
    <div className="flex flex-col items-center gap-3">
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

        {hotspots.map((point) => {
          const tooltip = "tooltip" in point ? point.tooltip : undefined;
          const isOpen = activeId === point.id;

          return (
            <div
              key={point.id}
              data-hotspot
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: point.top, left: point.left }}
              onMouseEnter={() => tooltip && setActiveId(point.id)}
              onMouseLeave={() =>
                tooltip && setActiveId((current) => (current === point.id ? null : current))
              }
            >
              <motion.button
                type="button"
                aria-label={point.label}
                aria-expanded={tooltip ? isOpen : undefined}
                onClick={() => {
                  if (tooltip) {
                    setActiveId(isOpen ? null : point.id);
                  } else {
                    scrollToSection(point.sectionId);
                  }
                }}
                onFocus={() => tooltip && setActiveId(point.id)}
                onBlur={() =>
                  tooltip && setActiveId((current) => (current === point.id ? null : current))
                }
                className="relative block h-4 w-4 rounded-full bg-[#DC2626] cursor-pointer"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(220, 38, 38, 0.5)",
                    "0 0 0 8px rgba(220, 38, 38, 0)",
                    "0 0 0 0 rgba(220, 38, 38, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{
                  scale: 1.3,
                  boxShadow:
                    "0 0 0 10px rgba(220, 38, 38, 0.35), 0 0 16px 4px rgba(220, 38, 38, 0.65)",
                }}
              />

              {tooltip && (
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      role="tooltip"
                      className={`absolute z-10 w-max max-w-[50vw] sm:max-w-[220px] rounded-lg bg-ink px-3 py-2 text-xs leading-snug text-white shadow-lg ${horizontalAnchorClass(
                        parseFloat(point.left)
                      )} ${verticalAnchorClass(parseFloat(point.top))}`}
                    >
                      <p>{tooltip}</p>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          scrollToSection(point.sectionId);
                          setActiveId(null);
                        }}
                        className="mt-1.5 font-medium text-teal underline decoration-teal/40 underline-offset-2 hover:text-white"
                      >
                        Vezi serviciul →
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </div>

      <p className="max-w-xs text-center text-[11px] text-ink-soft/70">
        Informații orientative. Diagnosticul și planul de tratament se stabilesc la evaluarea clinică.
      </p>
    </div>
  );
}
