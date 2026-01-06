"use client"

import React from "react"

import { useMemo, useState, useEffect } from "react"

/** ---------- Visual helpers ---------- */
function CornerLeaves({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M28 62c35-34 90-54 160-42"
        stroke="#E9B7BD"
        strokeOpacity="0.55"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M34 92c44-42 108-63 170-44"
        stroke="#F2C7C4"
        strokeOpacity="0.55"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M24 56c40 20 64 42 92 80 10 14 22 32 52 64"
        stroke="#D59B83"
        strokeOpacity="0.75"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M52 78c18 1 30 10 36 26-18 0-30-9-36-26Z" fill="#8FB59A" fillOpacity="0.8" />
      <path d="M78 94c17 2 29 12 34 27-18-1-29-11-34-27Z" fill="#7EA88E" fillOpacity="0.8" />
      <path d="M60 112c15 3 25 14 28 28-17-2-26-12-28-28Z" fill="#96BEA3" fillOpacity="0.75" />
      <path d="M116 132c16 2 27 12 31 28-17-1-27-11-31-28Z" fill="#7FA890" fillOpacity="0.7" />
      <path d="M142 156c14 4 22 15 24 29-16-2-23-13-24-29Z" fill="#92BBA0" fillOpacity="0.7" />
      <circle cx="34" cy="140" r="8" fill="#F2C7C4" fillOpacity="0.55" />
      <circle cx="58" cy="156" r="5" fill="#E9B7BD" fillOpacity="0.55" />
      <circle cx="86" cy="170" r="7" fill="#F2C7C4" fillOpacity="0.45" />
    </svg>
  )
}

function Ribbon({ children }) {
  return (
    <div
      className="relative inline-flex items-center justify-center animate-fade-in-up"
      style={{ animationDelay: "300ms" }}
    >
      <div
        className="absolute -left-7 top-1/2 h-10 w-10 -translate-y-1/2 rotate-12 rounded-xl bg-[#EAB9BF]/70 shadow-sm animate-float"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="absolute -right-7 top-1/2 h-10 w-10 -translate-y-1/2 -rotate-12 rounded-xl bg-[#EAB9BF]/70 shadow-sm animate-float"
        style={{ animationDelay: "200ms" }}
      />
      <div className="relative rounded-2xl border border-[#EAB9BF]/70 bg-gradient-to-r from-[#F0C6C8] via-[#F6D7D2] to-[#F0C6C8] px-10 py-4 shadow-md hover:shadow-xl transition-shadow duration-300">
        {children}
      </div>
    </div>
  )
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.2 + Math.random() * 2.5,
        rotation: Math.random() * 360,
        size: 5 + Math.random() * 8,
        color: ["#F0C6C8", "#E9B7BD", "#8FB59A", "#96BEA3", "#F2C7C4", "#D59B83"][Math.floor(Math.random() * 6)],
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute -top-10 animate-confetti-fall opacity-0 rounded-sm"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
        size: 20 + Math.random() * 15,
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden opacity-20">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 animate-float-up"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          💕
        </span>
      ))}
    </div>
  )
}

/** ---------- Main ---------- */
export default function Welcome() {
  const [index, setIndex] = useState(0)
  const [logged, setLogged] = useState(false)
  const [guest, setGuest] = useState({ name: "", email: "" })
  const [confirmed, setConfirmed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [mounted, setMounted] = useState(false)

  const theme = useMemo(
    () => ({
      bg: "#F7F1EF",
      text: "#5A2D2D",
      muted: "rgba(90,45,45,0.68)",
      line: "rgba(234,185,191,0.65)",
      primary: "#7B3B3B",
      primaryHover: "#6A3131",
      chip: "#F0C6C8",
    }),
    [],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  const go = (next) => setIndex(Math.max(0, Math.min(2, next)))

  const mockGoogleLogin = () => {
    setLogged(true)
    setGuest({ name: "Convidado(a)", email: "convidado@gmail.com" })
    setTimeout(() => go(1), 400)
  }

  const confirmPresence = () => {
    setConfirmed(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 4500)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(index + 1)
      if (e.key === "ArrowLeft") go(index - 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [index])

  const progress = ((index + 1) / 3) * 100

  return (
    <>
      {showConfetti && <Confetti />}
      <FloatingHearts />

      <div
        className={`h-screen w-screen overflow-hidden transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundColor: theme.bg }}
      >
        <div className="absolute left-0 right-0 top-0 z-20 px-3 sm:px-6 md:px-8 pt-3 sm:pt-4 animate-slide-down">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <div
                className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.18em] animate-fade-in"
                style={{ color: theme.muted }}
              >
                CONVITE • SARAH
              </div>
              <div
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm animate-fade-in"
                style={{ color: theme.muted, animationDelay: "100ms" }}
              >
                <span className={`transition-all duration-300 ${index === 0 ? "font-bold scale-110" : ""}`}>1</span>
                <span>•</span>
                <span className={`transition-all duration-300 ${index === 1 ? "font-bold scale-110" : ""}`}>2</span>
                <span>•</span>
                <span className={`transition-all duration-300 ${index === 2 ? "font-bold scale-110" : ""}`}>3</span>
              </div>
            </div>

            <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-white/60 border border-[#EAB9BF]/50 shadow-sm">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(123,59,59,0.5)]"
                style={{ width: `${progress}%`, backgroundColor: theme.primary }}
              />
            </div>
          </div>
        </div>

        <div className="h-full w-full relative">
          {/* SLIDE 1 — Login */}
          {index === 0 && (
            <section
              key="slide-0"
              className="absolute inset-0 flex items-center justify-center px-3 sm:px-6 md:px-8 animate-fade-in-up"
            >
              <CornerLeaves className="pointer-events-none absolute -top-4 -left-4 sm:-top-6 sm:-left-6 h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 opacity-90 animate-fade-in" />
              <CornerLeaves
                className="pointer-events-none absolute -top-4 -right-4 sm:-top-6 sm:-right-6 h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 -scale-x-100 opacity-90 animate-fade-in"
                style={{ animationDelay: "200ms" }}
              />

              <div className="w-full max-w-3xl animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[28px] border border-[#EAB9BF]/60 bg-white/80 shadow-xl sm:shadow-2xl backdrop-blur hover:shadow-[0_20px_60px_rgba(123,59,59,0.2)] transition-shadow duration-500">
                  <div className="px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-14 text-center">
                    <p
                      className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.18em] sm:tracking-[0.22em] animate-fade-in"
                      style={{ color: theme.muted }}
                    >
                      ANIVERSÁRIO DA
                    </p>

                    <div className="mt-4 sm:mt-5">
                      <Ribbon>
                        <h1
                          className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-none"
                          style={{ color: theme.text, fontFamily: "ui-serif, Georgia, serif" }}
                        >
                          Sarah
                        </h1>
                      </Ribbon>
                    </div>

                    <p
                      className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed px-2 animate-fade-in"
                      style={{ color: theme.muted, animationDelay: "500ms" }}
                    >
                      Para confirmar sua presença, primeiro precisamos identificar você
                    </p>

                    <div
                      className="mx-auto mt-5 sm:mt-7 h-px w-full max-w-xl animate-scale-x"
                      style={{ backgroundColor: theme.line, animationDelay: "600ms" }}
                    />

                    <div
                      className="mx-auto mt-6 sm:mt-8 max-w-xl rounded-xl sm:rounded-2xl border border-[#EAB9BF]/60 bg-white/70 p-4 sm:p-5 md:p-6 text-left animate-fade-in-up shadow-sm hover:shadow-md transition-all duration-300"
                      style={{ animationDelay: "700ms" }}
                    >
                      <h2 className="text-base sm:text-lg md:text-xl font-extrabold" style={{ color: theme.text }}>
                        1) Validação com Google
                      </h2>
                      <p className="mt-2 text-xs sm:text-sm md:text-base" style={{ color: theme.muted }}>
                        (Front only) Depois você troca pelo seu login Google real.
                      </p>

                      <button
                        onClick={mockGoogleLogin}
                        className="mt-4 sm:mt-5 w-full rounded-xl border border-[#EAB9BF]/70 bg-white px-4 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-[#EAB9BF] active:scale-[0.98] group"
                        style={{ color: theme.text }}
                      >
                        <span className="inline-flex items-center justify-center gap-2 sm:gap-3">
                          <span className="h-6 w-6 sm:h-7 sm:w-7 grid place-items-center rounded-full bg-[#F7F1EF] border border-[#EAB9BF]/60 group-hover:rotate-12 transition-transform duration-300 text-xs sm:text-sm">
                            G
                          </span>
                          Entrar com Google
                        </span>
                      </button>

                      <div className="mt-4 sm:mt-5 flex flex-col gap-2 sm:gap-3">
                        <button
                          onClick={() => go(1)}
                          className="w-full rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-extrabold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                          style={{ backgroundColor: theme.primary, color: "white" }}
                        >
                          Continuar
                        </button>
                        <button
                          onClick={() => go(1)}
                          className="w-full rounded-xl border border-[#EAB9BF]/70 bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                          style={{ color: theme.text }}
                        >
                          Pular login (teste)
                        </button>
                      </div>
                    </div>

                    <div
                      className="mt-5 sm:mt-7 text-[10px] sm:text-xs md:text-sm animate-fade-in px-2"
                      style={{ color: theme.muted, animationDelay: "900ms" }}
                    >
                      Dica: use ← → no teclado para navegar
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SLIDE 2 — Instruções */}
          {index === 1 && (
            <section
              key="slide-1"
              className="absolute inset-0 flex items-center justify-center px-3 sm:px-6 md:px-8 overflow-y-auto animate-fade-in-up"
            >
              <CornerLeaves className="pointer-events-none absolute -top-4 -left-4 sm:-top-6 sm:-left-6 h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 opacity-90" />
              <CornerLeaves className="pointer-events-none absolute -top-4 -right-4 sm:-top-6 sm:-right-6 h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 -scale-x-100 opacity-90" />

              <div className="w-full max-w-3xl py-16 sm:py-20">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[28px] border border-[#EAB9BF]/60 bg-white/80 shadow-xl sm:shadow-2xl backdrop-blur hover:shadow-[0_20px_60px_rgba(123,59,59,0.2)] transition-shadow duration-500">
                  <div className="px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-14">
                    <div className="text-center">
                      <p
                        className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.18em] sm:tracking-[0.22em]"
                        style={{ color: theme.muted }}
                      >
                        INSTRUÇÕES
                      </p>
                    </div>

                    <div className="mx-auto mt-4 sm:mt-6 max-w-2xl rounded-xl sm:rounded-2xl border border-[#EAB9BF]/60 bg-white/70 p-4 sm:p-5 md:p-6 shadow-sm">
                      <div className="flex flex-col gap-3 sm:gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold" style={{ color: theme.text }}>
                          Oi!
                        </h2>

                        {logged && (
                          <div className="rounded-lg sm:rounded-xl border border-[#EAB9BF]/50 bg-[#FFF7F6] px-3 py-2 text-xs sm:text-sm animate-fade-in shadow-sm">
                            <p className="font-semibold" style={{ color: theme.text }}>
                              {guest.name}
                            </p>
                            <p style={{ color: theme.muted }}>{guest.email}</p>
                          </div>
                        )}
                      </div>

                      <div
                        className="mt-3 space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed"
                        style={{ color: theme.muted }}
                      >
                        <p>
                          O aniversário da Sarah Lorraine será no Buffet Jokempô e terá início às{" "}
                          <span
                            className="font-semibold px-1.5 sm:px-2 py-0.5 rounded-md bg-[#F0C6C8]/30 transition-colors hover:bg-[#F0C6C8]/50"
                            style={{ color: theme.text }}
                          >
                            13h
                          </span>
                        </p>

                        <div className="rounded-lg sm:rounded-xl border border-[#EAB9BF]/50 bg-white/60 p-3 sm:p-4 hover:bg-white/80 transition-colors duration-300 shadow-sm hover:shadow">
                          <p className="font-semibold" style={{ color: theme.text }}>
                            Local: Buffet Jokempô
                          </p>
                          <p className="mt-1">Rua Vereador Dr. Abílio de Mello Pinto, 259</p>
                          <p>Vila Industrial – Mogi das Cruzes/SP</p>
                        </div>

                        <p>
                          Diferente de salão comum, no buffet a festa é toda cronogramada, para que as crianças
                          aproveitem bem cada momento. Funcionará assim:
                        </p>

                        <ul className="space-y-2">
                          {[
                            { emoji: "🕐", hora: "1ª hora:", desc: "crianças livres para brincar à vontade" },
                            { emoji: "🕑", hora: "2ª hora:", desc: "brincadeiras com as crianças + piquenique" },
                            { emoji: "🎂", hora: "3ª hora:", desc: "parabéns" },
                            { emoji: "🎈", hora: "4ª hora:", desc: "brincadeiras e finalização da festa" },
                          ].map((item, i) => (
                            <li
                              key={i}
                              className="group flex items-start gap-2 p-2 rounded-lg hover:bg-[#F0C6C8]/20 transition-colors duration-300"
                            >
                              <span className="text-base sm:text-lg group-hover:scale-110 transition-transform duration-300">
                                {item.emoji}
                              </span>
                              <span className="flex-1">
                                <span className="font-semibold" style={{ color: theme.text }}>
                                  {item.hora}
                                </span>{" "}
                                {item.desc}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="rounded-lg sm:rounded-xl border border-[#EAB9BF]/50 bg-[#FFF7F6] p-3 sm:p-4 shadow-sm hover:shadow transition-shadow duration-300">
                          <p>
                            Pedimos, por gentileza, que quem tem filhos chegue no horário, para aproveitar melhor os
                            brinquedos e a comida
                          </p>
                          <p className="mt-2 sm:mt-3">
                            Também precisamos da confirmação de presença, para conseguirmos organizar tudo com carinho
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-6 flex flex-col gap-2 sm:gap-3">
                        <button
                          onClick={() => go(0)}
                          className="w-full order-2 sm:order-1 sm:w-auto rounded-xl border border-[#EAB9BF]/70 bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                          style={{ color: theme.text }}
                        >
                          Voltar
                        </button>
                        <button
                          onClick={() => go(2)}
                          className="w-full order-1 sm:order-2 sm:flex-1 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-extrabold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                          style={{ backgroundColor: theme.primary, color: "white" }}
                        >
                          Ir para confirmação
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-8 text-center">
                      <p className="text-xs sm:text-sm md:text-base font-semibold" style={{ color: theme.text }}>
                        Buffet Jokempô – Mogi das Cruzes
                      </p>
                      <p className="mt-1 text-[10px] sm:text-xs md:text-sm" style={{ color: theme.muted }}>
                        Fevereiro • 28 • 13h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SLIDE 3 — Confirmação */}
          {index === 2 && (
            <section
              key="slide-2"
              className="absolute inset-0 flex items-center justify-center px-3 sm:px-6 md:px-8 animate-fade-in-up"
            >
              <CornerLeaves className="pointer-events-none absolute -top-4 -left-4 sm:-top-6 sm:-left-6 h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 opacity-90" />
              <CornerLeaves className="pointer-events-none absolute -top-4 -right-4 sm:-top-6 sm:-right-6 h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 -scale-x-100 opacity-90" />

              <div className="w-full max-w-3xl">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[28px] border border-[#EAB9BF]/60 bg-white/80 shadow-xl sm:shadow-2xl backdrop-blur hover:shadow-[0_20px_60px_rgba(123,59,59,0.2)] transition-shadow duration-500">
                  <div className="px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-14 text-center">
                    <p
                      className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.18em] sm:tracking-[0.22em]"
                      style={{ color: theme.muted }}
                    >
                      CONFIRMAÇÃO
                    </p>

                    <div className="mt-4 sm:mt-6">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold px-2" style={{ color: theme.text }}>
                        {confirmed ? "Obrigada por confirmar" : "Confirme sua presença"}
                      </h2>
                      <p
                        className="mx-auto mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed px-2"
                        style={{ color: theme.muted }}
                      >
                        {confirmed
                          ? "Isso ajuda a gente a organizar tudo com carinho para as crianças aproveitarem cada momento."
                          : "Sua confirmação nos ajuda a preparar tudo com muito carinho"}
                      </p>
                    </div>

                    <div className="mx-auto mt-6 sm:mt-8 max-w-xl rounded-xl sm:rounded-2xl border border-[#EAB9BF]/60 bg-white/70 p-4 sm:p-5 md:p-6 text-left shadow-sm">
                      {!confirmed ? (
                        <>
                          <p
                            className="text-xs sm:text-sm md:text-base text-center px-2"
                            style={{ color: theme.muted }}
                          >
                            Clique no botão abaixo para confirmar sua presença.
                          </p>

                          <button
                            onClick={confirmPresence}
                            className="mt-4 sm:mt-5 w-full rounded-full px-5 sm:px-7 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-extrabold shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.05] active:scale-[0.98] group overflow-hidden relative"
                            style={{ backgroundColor: theme.primary, color: "white" }}
                          >
                            <span className="relative z-10 inline-flex items-center justify-center gap-2">
                              <span className="group-hover:scale-125 transition-transform duration-300">✨</span>
                              Confirmar presença
                              <span className="group-hover:scale-125 transition-transform duration-300">✨</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          </button>

                          <button
                            onClick={() => go(1)}
                            className="mt-3 sm:mt-4 w-full rounded-xl border border-[#EAB9BF]/70 bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                            style={{ color: theme.text }}
                          >
                            Voltar para instruções
                          </button>
                        </>
                      ) : (
                        <div className="rounded-xl sm:rounded-2xl border border-[#EAB9BF]/60 bg-[#FFF7F6] p-4 sm:p-6 text-center animate-fade-in-up shadow-sm">
                          <p
                            className="text-xl sm:text-2xl md:text-3xl font-extrabold animate-bounce-once"
                            style={{ color: theme.text }}
                          >
                            Presença confirmada!
                          </p>
                          <p className="mt-2 text-xs sm:text-sm md:text-base" style={{ color: theme.muted }}>
                            Vai ser muito especial ter você com a gente
                          </p>

                          <div className="mt-4 sm:mt-5 rounded-lg sm:rounded-xl bg-white/70 border border-[#EAB9BF]/50 p-3 sm:p-4 text-left hover:bg-white/90 transition-colors duration-300 shadow-sm hover:shadow">
                            <p className="text-sm sm:text-base font-semibold" style={{ color: theme.text }}>
                              Buffet Jokempô
                            </p>
                            <p className="text-xs sm:text-sm mt-1" style={{ color: theme.muted }}>
                              Rua Vereador Dr. Abílio de Mello Pinto, 259 — Vila Industrial, Mogi das Cruzes/SP
                            </p>
                            <p className="mt-2 text-xs sm:text-sm" style={{ color: theme.muted }}>
                              Início às{" "}
                              <span
                                className="font-semibold px-1.5 sm:px-2 py-0.5 rounded-md bg-[#F0C6C8]/40"
                                style={{ color: theme.text }}
                              >
                                13h
                              </span>
                            </p>
                          </div>

                          <div className="mt-5 sm:mt-6 flex flex-col gap-2 sm:gap-3">
                            <button
                              onClick={() => {
                                setConfirmed(false)
                                setLogged(false)
                                setGuest({ name: "", email: "" })
                                go(0)
                              }}
                              className="w-full order-1 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-extrabold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                              style={{ backgroundColor: theme.primary, color: "white" }}
                            >
                              Voltar ao início
                            </button>

                            <button
                              onClick={() => go(1)}
                              className="w-full order-2 rounded-xl border border-[#EAB9BF]/70 bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                              style={{ color: theme.text }}
                            >
                              Ver instruções
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 sm:mt-8 flex items-end justify-center gap-2 sm:gap-3 md:gap-4 text-2xl sm:text-3xl md:text-4xl opacity-90">
                      {["🦛", "🦁", "🦒", "🐘", "🦓"].map((emoji, i) => (
                        <span
                          key={i}
                          className="animate-float cursor-pointer hover:scale-125 transition-transform duration-300"
                          style={{ animationDelay: `${i * 200}ms` }}
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 px-3 sm:px-6 md:px-8 pb-3 sm:pb-4 md:pb-5 animate-slide-up">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl sm:rounded-2xl border border-[#EAB9BF]/55 bg-white/70 backdrop-blur px-3 sm:px-4 py-2.5 sm:py-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <button
                  onClick={() => go(index - 1)}
                  disabled={index === 0}
                  className="rounded-lg sm:rounded-xl border border-[#EAB9BF]/70 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shadow-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md hover:scale-[1.05] active:scale-[0.98]"
                  style={{ color: theme.text }}
                >
                  ← Voltar
                </button>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      className={[
                        "h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300",
                        i === index ? "scale-125 shadow-md" : "opacity-60 hover:opacity-90 hover:scale-110",
                      ].join(" ")}
                      style={{ backgroundColor: i === index ? theme.primary : "rgba(123,59,59,0.25)" }}
                      aria-label={`Ir para passo ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => go(index + 1)}
                  disabled={index === 2}
                  className="rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-extrabold shadow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-xl hover:scale-[1.05] active:scale-[0.98]"
                  style={{ backgroundColor: theme.primary, color: "white" }}
                >
                  Próximo →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
