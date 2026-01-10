"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  Calendar,
  Clock,
  Users,
  User,
  Baby,
  AlertCircle,
  Sparkles,
  PartyPopper,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CheckCircle,
  Cake,
} from "lucide-react"

function NoiseTexture() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

function Confetti() {
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  const count = prefersReduced ? 0 : isMobile ? 30 : 60
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.5 + Math.random() * 2,
        rotation: Math.random() * 360,
        color: ["#F0C6C8", "#E9B7BD", "#8FB59A", "#D59B83", "#F5D1A3"][Math.floor(Math.random() * 5)],
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute -top-4 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm animate-confetti-fall"
          style={{
            left: `${p.left}%`,
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

function WelcomeSlide({ guestName }) {
  const displayName = guestName || "convidado"

  return (
    <section
      role="region"
      aria-label="Bem-vindo"
      className="flex flex-col items-center justify-center min-h-[calc(100dvh-200px)] px-6 py-8 w-full max-w-2xl md:max-w-3xl mx-auto"
    >
      <div className="relative w-full bg-white/95 backdrop-blur-sm border-2 border-white/80 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#E9B7BD] via-[#F5D1A3] to-[#8FB59A]" />

        <div className="relative z-10 text-center space-y-6 sm:space-y-8">
          <div className="mx-auto w-full max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#7B3B3B] leading-tight">
              Olá, {displayName}!
            </h1>
            <p className="mt-2 text-base sm:text-lg text-[#8B6B6B]">
              Você foi convidado para o aniversário da Sarah Lorraine. Para que possamos organizar o buffet e os lugares
              com todo carinho, confirme sua presença nos próximos slides. É rápido e ajuda muito!
            </p>
          </div>

          <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <div className="bg-white rounded-xl p-4 border border-[#F2D8D8]/60 shadow-sm text-left flex items-start gap-3">
              <div className="w-12 h-12 rounded-md bg-[#FFF6F6] flex items-center justify-center text-[#D59B83]">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-[#8B6B6B]/90 uppercase font-semibold">Data & Horário</div>
                <div className="font-bold text-[#7B3B3B]">28 de Fevereiro — 13h00</div>
                <div className="text-xs text-[#8B6B6B]">Buffet Jokempô • Vila Industrial</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#F2D8D8]/60 shadow-sm text-left flex items-start gap-3">
              <div className="w-12 h-12 rounded-md bg-[#FFF8F1] flex items-center justify-center text-[#8FB59A]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-[#8B6B6B]/90 uppercase font-semibold">Convidados</div>
                <div className="font-bold text-[#7B3B3B]">Visão geral e ingressos</div>
                <div className="text-xs text-[#8B6B6B]">Veja quem foi convidado e quantos lugares garantidos</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#F2D8D8]/60 shadow-sm text-left flex items-start gap-3">
              <div className="w-12 h-12 rounded-md bg-[#FFF7F6] flex items-center justify-center text-[#E9B7BD]">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-[#8B6B6B]/90 uppercase font-semibold">Instruções</div>
                <div className="font-bold text-[#7B3B3B]">Cronograma & recomendações</div>
                <div className="text-xs text-[#8B6B6B]">
                  Dicas rápidas para o dia: chegada, brincadeiras e segurança
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#F2D8D8]/60 shadow-sm text-left flex items-start gap-3">
              <div className="w-12 h-12 rounded-md bg-[#F7F8F3] flex items-center justify-center text-[#D59B83]">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-[#8B6B6B]/90 uppercase font-semibold">Confirmação</div>
                <div className="font-bold text-[#7B3B3B]">Confirme sua presença</div>
                <div className="text-xs text-[#8B6B6B]">Toque no slide "Confirmar" para reservar seu lugar</div>
              </div>
            </div>
          </div>

          <p className="mt-2 text-xs text-[#8B6B6B]/80">
            Avance para ver o convite completo, o cronograma e a lista de convidados. Obrigado por fazer parte desta
            festa!
          </p>
        </div>
      </div>
    </section>
  )
}

function InstructionsSlide() {
  const schedule = [
    { Icon: Clock, hora: "13h", title: "Recepção", desc: "Crianças livres para brincar à vontade" },
    { Icon: Users, hora: "14h", title: "Piquenique", desc: "Hora de comer e brincar junto" },
    { Icon: Cake, hora: "15h", title: "Parabéns", desc: "O momento mais especial" },
    { Icon: Sparkles, hora: "16h", title: "Despedida", desc: "Últimas brincadeiras e diversão" },
  ]

  return (
    <div className="min-h-[calc(100dvh-200px)] flex items-center justify-center px-3 sm:px-4 py-4 w-full max-w-2xl md:max-w-3xl mx-auto">
      <div className="w-full space-y-4">
        <div className="relative bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 border-white/80 shadow-sm overflow-hidden">
          <div className="absolute -right-6 -top-8 w-28 h-28 bg-gradient-to-br from-[#E9B7BD]/18 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-6 -bottom-8 w-28 h-28 bg-gradient-to-br from-[#8FB59A]/18 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-start gap-2 mb-3">
              <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#E9B7BD] via-[#D59B83] to-[#8FB59A]" />
              <div>
                <h3 className="text-[#7B3B3B] font-serif font-bold text-lg sm:text-xl">Cronograma</h3>
                <p className="text-xs sm:text-xs text-[#8B6B6B] font-medium mt-1">Horário: 13h às 17h</p>
              </div>
            </div>

            <div className="mt-3 relative">
              <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-[#E9B7BD]/35 to-transparent" />

              <ul className="space-y-4">
                {schedule.map((item, i) => (
                  <li key={i} className="relative pl-16 sm:pl-20">
                    <div className="absolute left-0 top-1">
                      <div className="w-10 h-10 rounded-full bg-white border border-[#EAB9BF]/40 flex items-center justify-center shadow-sm">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80">
                          <item.Icon size={14} strokeWidth={1.6} className="text-[#7B3B3B]" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-md p-3 shadow-sm border border-[#F2D8D8]/60 hover:shadow-md transition">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-block text-xs font-semibold text-[#7B3B3B] bg-[#F7ECEB] border border-[#E9B7BD]/40 px-2 py-1 rounded-md shadow-sm">
                            {item.hora}
                          </span>
                          <h4 id={`sched-title-${i}`} className="text-[#7B3B3B] font-bold text-sm sm:text-sm">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                      <p className="text-sm text-[#8B6B6B] mt-2 max-w-xl">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#F5D1A3]/20 to-[#E9B7BD]/18 rounded-md p-3 flex gap-3 border-2 border-[#F5D1A3]/35 items-start">
          <AlertCircle className="w-5 h-5 text-[#D59B83] flex-shrink-0 mt-1" strokeWidth={1.6} />
          <div>
            <p className="text-sm text-[#7B3B3B]">
              <strong className="font-bold">Importante:</strong> Chegue no horário para que as crianças aproveitem todas
              as atrações e para que a programação ocorra conforme planejado.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function GroupSlide({ grupo }) {
  const convidados = grupo?.convidados || []

  return (
    <div className="min-h-[calc(100dvh-200px)] flex items-center justify-center px-4 sm:px-6 py-6 w-full max-w-2xl md:max-w-3xl mx-auto">
      <div className="w-full space-y-6">
        <div className="text-center pb-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#7B3B3B] mb-2 text-balance">
            Seus Convites
          </h2>
          <p className="text-base sm:text-lg text-[#8B6B6B] font-medium">{grupo.name}</p>
        </div>

        <div className="space-y-4">
          {convidados.length > 0 ? (
            convidados.map((pessoa, idx) => {
              const isCrianca = pessoa.isCrianca && pessoa.isCrianca.age != null

              return (
                <div key={idx} className="relative group">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border-2 border-[#EAB9BF]/50 p-5 sm:p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-between gap-4">
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#F7F1EF] rounded-full border-r-4 border-[#EAB9BF]/50" />
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#F7F1EF] rounded-full border-l-4 border-[#EAB9BF]/50" />

                    <div className="flex items-center gap-5 pl-3">
                      <div
                        className={`w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl sm:rounded-3xl flex items-center justify-center text-white shadow-lg ${
                          isCrianca
                            ? "bg-gradient-to-br from-[#8FB59A] to-[#7EA88E]"
                            : "bg-gradient-to-br from-[#D59B83] to-[#C58973]"
                        }`}
                      >
                        {isCrianca ? <Baby size={32} strokeWidth={2} /> : <User size={32} strokeWidth={2} />}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#7B3B3B] text-lg sm:text-xl leading-tight mb-1.5">
                          {pessoa.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#8B6B6B] uppercase tracking-wider font-bold flex items-center gap-2">
                          {isCrianca ? (
                            <>
                              <Cake className="w-3.5 h-3.5" />
                              {pessoa.isCrianca.age} anos
                            </>
                          ) : (
                            "Adulto"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="pr-2 opacity-40 group-hover:opacity-60 transition-opacity flex-shrink-0">
                      <Sparkles size={26} className="text-[#E9B7BD]" />
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-16 bg-white/50 rounded-3xl border-2 border-dashed border-[#D59B83]/40">
              <Users className="w-16 h-16 text-[#D59B83]/50 mx-auto mb-3" />
              <p className="text-[#8B6B6B] text-lg">Nenhum convidado listado</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center bg-gradient-to-br from-white to-[#FFF9F8] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border-2 border-white/80 shadow-xl">
          <p className="text-xs sm:text-sm text-[#8B6B6B]/80 uppercase tracking-widest mb-3 font-bold">
            Total de Ingressos
          </p>
          <div className="flex items-center justify-center gap-3">
            <p className="text-5xl sm:text-6xl font-black text-[#7B3B3B]">{convidados.length}</p>
            <Users className="w-8 h-8 sm:w-10 sm:h-10 text-[#E9B7BD]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ConfirmationSlide({ confirmed, onConfirm }) {
  return (
    <div className="min-h-[calc(100dvh-200px)] flex items-center justify-center px-4 sm:px-6 py-8 w-full max-w-2xl md:max-w-3xl mx-auto">
      <div className="w-full">
        {!confirmed ? (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl sm:rounded-[3rem] border-2 border-white/80 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#FFF5F6] to-transparent opacity-40 z-0" />

            <div className="relative z-10 space-y-8">
              <div className="w-32 h-32 sm:w-36 sm:h-36 bg-gradient-to-br from-white to-[#FFF9F8] rounded-full mx-auto flex items-center justify-center shadow-2xl mb-6 border-4 border-[#E9B7BD]/20">
                <PartyPopper className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] text-[#E9B7BD] animate-wiggle" strokeWidth={2} />
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7B3B3B] mb-5 text-balance">
                  Vai comparecer?
                </h2>
                <p className="text-[#8B6B6B] leading-relaxed text-base sm:text-lg max-w-md mx-auto">
                  Sua confirmação é muito importante para organizarmos tudo com carinho!
                </p>
              </div>

              <button
                onClick={onConfirm}
                className="w-full group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#E9B7BD] via-[#D59B83] to-[#E9B7BD] bg-size-200 p-6 sm:p-7 text-white shadow-2xl transition-all hover:bg-pos-100 hover:scale-[1.03] active:scale-[0.97] animate-gradient"
              >
                <span className="relative flex items-center justify-center gap-3 font-bold text-xl sm:text-2xl">
                  <CheckCircle size={30} strokeWidth={2.5} />
                  Confirmar Presença
                </span>
              </button>

              <p className="text-xs sm:text-sm text-[#8B6B6B]/60 italic">Toque no botão acima para confirmar</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="bg-gradient-to-br from-[#8FB59A]/25 to-[#7EA88E]/15 backdrop-blur-xl rounded-3xl sm:rounded-[3rem] border-2 border-[#8FB59A]/50 p-8 sm:p-12 text-center shadow-2xl">
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-[#8FB59A] rounded-full mx-auto flex items-center justify-center shadow-2xl mb-8 animate-bounce-once border-4 border-white/50">
                <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-white" strokeWidth={3} />
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#5A7A64] mb-5">
                Oba! Confirmado!
              </h2>
              <p className="text-[#6B8B74] text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Que alegria ter você conosco! Já separamos seu lugar. Nos vemos lá!
              </p>

              <div className="bg-white/90 rounded-2xl sm:rounded-3xl p-7 sm:p-8 text-[#5A7A64] border-2 border-[#8FB59A]/40 shadow-xl">
                <p className="font-bold text-lg sm:text-xl mb-4 flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Lembrete Final
                </p>
                <p className="text-base sm:text-lg font-bold text-[#7B3B3B] mb-2">28 de Fevereiro • 13h00</p>
                <p className="text-sm sm:text-base mt-2 text-[#8B6B6B]">Buffet Jokempô, Vila Industrial</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const [step, setStep] = useState(1)

  useEffect(() => {
    const firstTimer = setTimeout(() => {
      setStep(2)
    }, 3000)

    const secondTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onComplete(), 600)
    }, 6000)

    return () => {
      clearTimeout(firstTimer)
      clearTimeout(secondTimer)
    }
  }, [onComplete])

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 1.5,
        rotation: Math.random() * 360,
        color: ["#F0C6C8", "#E9B7BD", "#8FB59A", "#D59B83", "#F5D1A3"][Math.floor(Math.random() * 5)],
      })),
    [],
  )

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#FFF9F8] via-[#FFF5F6] to-[#FFF0F2] transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confettiPieces.map((p) => (
          <span
            key={p.id}
            className="absolute -top-4 w-2 h-2 rounded-sm animate-confetti-fall opacity-30"
            style={{
              left: `${p.left}%`,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              transform: `rotate(${p.rotation}deg)`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E9B7BD]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8FB59A]/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="text-center px-6 max-w-3xl relative z-10">
        <div
          className={`space-y-6 transition-all duration-700 ${
            step === 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 absolute"
          }`}
        >
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-[#E9B7BD] to-[#D59B83] rounded-full flex items-center justify-center shadow-2xl animate-float">
                <PartyPopper className="w-12 h-12 sm:w-14 sm:h-14 text-white" strokeWidth={2} />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-[#E9B7BD]/20 to-[#D59B83]/20 rounded-full blur-xl animate-pulse" />
            </div>
          </div>

          <p className="text-2xl sm:text-3xl lg:text-4xl text-[#8B6B6B] font-light leading-relaxed text-balance">
            Você está convidado para o aniversário da
          </p>
          <div className="py-6">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7B3B3B] via-[#E9B7BD] to-[#7B3B3B] leading-[0.9] animate-float">
              Sarah
            </h1>
            <p className="text-4xl sm:text-5xl lg:text-6xl text-[#E9B7BD] font-light mt-3 tracking-wide">Lorraine</p>
          </div>
          <div className="flex justify-center gap-2 pt-4">
            <Sparkles className="w-6 h-6 text-[#E9B7BD] animate-pulse" />
            <Sparkles className="w-5 h-5 text-[#D59B83] animate-pulse" style={{ animationDelay: "0.3s" }} />
            <Sparkles className="w-6 h-6 text-[#8FB59A] animate-pulse" style={{ animationDelay: "0.6s" }} />
          </div>
        </div>

        <div
          className={`space-y-8 transition-all duration-700 ${
            step === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-white/60">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#E9B7BD] via-[#F5D1A3] to-[#8FB59A] rounded-t-3xl" />

            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#8FB59A] to-[#7EA88E] rounded-2xl flex items-center justify-center shadow-xl animate-bounce-once">
                  <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <p className="text-3xl sm:text-4xl lg:text-5xl text-[#7B3B3B] font-bold leading-tight text-balance mb-4">
              Precisamos que você confirme sua presença
            </p>
            <p className="text-lg sm:text-xl text-[#8B6B6B] font-medium">É rápido e nos ajuda muito na organização</p>
          </div>

          <div className="flex justify-center gap-2 pt-4">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#E9B7BD] to-[#D59B83] animate-bounce" />
            <div
              className="w-3 h-3 rounded-full bg-gradient-to-r from-[#D59B83] to-[#F5D1A3] animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-3 h-3 rounded-full bg-gradient-to-r from-[#F5D1A3] to-[#8FB59A] animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Welcome() {
  const mockGrupo = {
    name: "Família Silva",
    telefone: "(11) 99999-9999",
    convidados: [
      { name: "João Silva", isCrianca: null },
      { name: "Maria Silva", isCrianca: null },
      { name: "Pedro Silva", isCrianca: { age: 5 } },
      { name: "Ana Silva", isCrianca: { age: 8 } },
    ],
  }

  const grupo = mockGrupo
  const guestName = grupo.name || ""
  const [showPreloader, setShowPreloader] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [confirmed, setConfirmed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const slidesTitles = [
    { Icon: PartyPopper, label: "Convite" },
    { Icon: ClipboardList, label: "Info" },
    { Icon: Users, label: "Convidados" },
    { Icon: CheckCircle, label: "Confirmar" },
  ]
  const totalSlides = slidesTitles.length

  const handleConfirm = () => {
    setConfirmed(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index)
    }
  }

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeThreshold = 75
    const diff = touchStartX.current - touchEndX.current

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide])

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showPreloader])

  if (showPreloader) {
    return <Preloader onComplete={() => setShowPreloader(false)} />
  }

  return (
    <div
      className="min-h-dvh relative overflow-x-hidden"
      style={{ touchAction: "pan-y" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF7F6] via-[#FDF2F0] to-[#EFE4E2] z-0" />
      <NoiseTexture />

      {showConfetti && <Confetti />}

      <main className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden scroll-smooth pb-28 sm:pb-32 pt-2">
        <div className="transition-opacity duration-300">
          {currentSlide === 0 && <WelcomeSlide guestName={guestName} />}
          {currentSlide === 1 && <InstructionsSlide />}
          {currentSlide === 2 && <GroupSlide grupo={grupo} />}
          {currentSlide === 3 && <ConfirmationSlide confirmed={confirmed} onConfirm={handleConfirm} />}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-[#F7F1EF] via-[#F7F1EF] to-transparent pt-4 pb-6 pb-safe px-4">
        <div className="max-w-2xl md:max-w-3xl mx-auto">
          <div className="flex justify-center gap-2 mb-4">
            {slidesTitles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-12 bg-[#7B3B3B]" : "w-8 bg-[#D59B83]/30 hover:bg-[#D59B83]/50"
                }`}
                aria-label={`Ir para ${slidesTitles[index].label}`}
              />
            ))}
          </div>

          <div className="bg-white/90 backdrop-blur-md border-2 border-white/60 shadow-2xl shadow-[#7B3B3B]/20 rounded-full p-2 flex items-center gap-2 justify-between">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${
                currentSlide === 0
                  ? "bg-[#E9B7BD]/20 text-[#8B6B6B]/30 cursor-not-allowed"
                  : "bg-gradient-to-br from-[#E9B7BD] to-[#D59B83] text-white hover:scale-105 hover:shadow-lg active:scale-95"
              }`}
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>

            <div className="flex-1 flex items-center justify-center gap-3 px-2">
              {slidesTitles.map((slide, index) => {
                const isActive = currentSlide === index
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#7B3B3B] to-[#5A2D2D] text-white shadow-md scale-105"
                        : "bg-transparent text-[#8B6B6B] hover:bg-[#F5D1A3]/20"
                    }`}
                  >
                    <slide.Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                    <span className="hidden sm:inline text-sm font-bold">{slide.label}</span>
                  </button>
                )
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={currentSlide === totalSlides - 1}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${
                currentSlide === totalSlides - 1
                  ? "bg-[#E9B7BD]/20 text-[#8B6B6B]/30 cursor-not-allowed"
                  : "bg-gradient-to-br from-[#D59B83] to-[#E9B7BD] text-white hover:scale-105 hover:shadow-lg active:scale-95"
              }`}
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
