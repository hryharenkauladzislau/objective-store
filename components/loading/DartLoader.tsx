"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BrandMarkPlaceholder } from "@/components/brand/BrandMarkPlaceholder";

/*
 * Фирменная загрузка (ТЗ §7): мягкие округлые дротики по очереди попадают
 * в кольцевую мишень; каждое попадание заполняет следующий сегмент прогресса.
 * В конце элементы собираются в знак бренда и интерфейс плавно открывается.
 *
 * Правила ТЗ:
 * - прогресс связан с реальной готовностью: шрифты + критическое изображение
 *   первого экрана (img[data-boot-critical]); дротики не опережают прогресс;
 * - если всё готово быстрее 400 мс — полноэкранная загрузка не показывается;
 * - максимум 2.5 с, затем интерфейс открывается (skeletons отдают секции);
 * - при prefers-reduced-motion — статичный знак и полоса прогресса;
 * - повторно в рамках сессии (внутренние переходы и перезагрузки) не показывается.
 */

const MIN_VISIBLE_MS = 400;
const MAX_TOTAL_MS = 2500;
const DART_STEP_MS = 180;
const SEGMENTS = 8;
const BOOT_FLAG = "objective:booted";

type Phase = "waiting" | "active" | "finishing" | "done";

/* prefers-reduced-motion как внешнее хранилище (правильный React-паттерн) */
function subscribeMotion(change: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", change);
  return () => mq.removeEventListener("change", change);
}
function getMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function DartLoader() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [hits, setHits] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    () => false,
  );
  const readyRef = useRef(false);
  const targetRef = useRef(0);

  /* Debug-режим для скриншотов: добавьте ?hold=N к любому адресу страницы */
  useEffect(() => {
    const hold = new URLSearchParams(window.location.search).get("hold");
    if (!hold) return;
    const t = window.setTimeout(() => {
      setPhase("active");
      setHits(Number(hold));
    }, 50);
    return () => window.clearTimeout(t);
  }, []);

  /* Реальные сигналы готовности: шрифты + критическое изображение первого экрана */
  useEffect(() => {
    let cancelled = false;
    const bump = (weight: number) => {
      if (cancelled) return;
      targetRef.current = Math.min(SEGMENTS, targetRef.current + weight);
      readyRef.current = targetRef.current >= SEGMENTS;
    };

    document.fonts?.ready.then(() => bump(SEGMENTS / 2));

    // Критическое изображение появляется в DOM после гидрации — короткий опрос.
    // Лимит мал, потому что фото первого экрана на главной больше нет (ТЗ:
    // фото владельца — только в «Обо мне» ниже фолда): не ждём его дольше ~1.2 с.
    let polls = 0;
    const pollImg = () => {
      if (cancelled || polls > 12) {
        bump(SEGMENTS / 2);
        return;
      }
      polls += 1;
      const img = document.querySelector<HTMLImageElement>('img[data-boot-critical="true"]');
      if (!img) {
        window.setTimeout(pollImg, 100);
        return;
      }
      if (img.complete) {
        bump(SEGMENTS / 2);
        return;
      }
      img
        .decode()
        .then(() => bump(SEGMENTS / 2))
        .catch(() => bump(SEGMENTS / 2));
    };
    pollImg();

    return () => {
      cancelled = true;
    };
  }, []);

  /* Дротики догоняют реальный прогресс по одному, но не опережают его */
  useEffect(() => {
    if (phase === "done" || phase === "finishing") return;
    const timer = window.setInterval(() => {
      setHits((prev) => (prev < targetRef.current ? prev + 1 : prev));
    }, DART_STEP_MS);
    return () => window.clearInterval(timer);
  }, [phase]);

  /* Жизненный цикл: порог 400 мс, максимум 2.5 с, один показ на сессию */
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("hold")) return; // debug-hold
    const start = performance.now();
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - start;

      // Уже показывали загрузку в этой сессии — не повторяем
      if (sessionStorage.getItem(BOOT_FLAG)) {
        window.clearInterval(timer);
        setPhase("done");
        return;
      }
      if (readyRef.current) {
        window.clearInterval(timer);
        sessionStorage.setItem(BOOT_FLAG, "1");
        setPhase(elapsed < MIN_VISIBLE_MS ? "done" : "finishing");
        return;
      }
      if (elapsed >= MIN_VISIBLE_MS) {
        setPhase((prev) => (prev === "waiting" ? "active" : prev));
      }
      if (elapsed >= MAX_TOTAL_MS) {
        // Максимальное ожидание: открываем интерфейс со skeleton-состояниями
        window.clearInterval(timer);
        readyRef.current = true;
        targetRef.current = SEGMENTS;
        sessionStorage.setItem(BOOT_FLAG, "1");
        setPhase("finishing");
      }
    }, 120);
    return () => window.clearInterval(timer);
  }, []);

  /* Финал: собираем элементы в знак бренда и открываем интерфейс */
  useEffect(() => {
    if (phase !== "finishing") return;
    const t = window.setTimeout(() => setPhase("done"), reducedMotion ? 250 : 850);
    return () => window.clearTimeout(t);
  }, [phase, reducedMotion]);

  if (phase === "done") return null;

  const visible = phase === "active" || phase === "finishing";
  const finishing = phase === "finishing";
  const progress = Math.min(1, hits / SEGMENTS);

  return (
    <div
      role="status"
      aria-label="Загрузка сайта"
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-canvas transition-opacity duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="relative flex h-60 w-60 items-center justify-center">
        <BrandMarkPlaceholder
          className={`text-4xl text-ink transition-transform duration-500 ease-out-soft ${
            finishing && !reducedMotion ? "scale-110" : ""
          }`}
        />

        {reducedMotion ? (
          <div className="absolute -bottom-2 h-1 w-40 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-300"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        ) : (
          <>
            {Array.from({ length: SEGMENTS }, (_, i) => {
              const angle = (360 / SEGMENTS) * i - 90;
              const landed = i < hits || finishing;
              const flying = i === hits && !finishing;
              return (
                <div
                  key={i}
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    transform: `rotate(${angle}deg)${finishing ? " scale(0.7)" : ""}`,
                    opacity: finishing ? 0 : 1,
                    transition:
                      "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease-out",
                  }}
                >
                  <div
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(-50%, -50%) translateY(${
                        landed ? -76 : flying ? -132 : -190
                      }px)`,
                      opacity: landed || flying ? 1 : 0,
                      transition:
                        "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease-out",
                    }}
                  >
                    {/* Мягкий округлый дротик без острых форм */}
                    <div className="relative h-9 w-2.5 rounded-full bg-ink">
                      <span className="absolute -bottom-1 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-accent" />
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <span className="sr-only">Загружаем каталог…</span>
    </div>
  );
}
