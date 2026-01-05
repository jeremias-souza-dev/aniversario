"use client"

import { Head } from "@inertiajs/react"
import { useState } from "react"

export default function Welcome({ auth }) {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <>
      <Head title="Aniversário da Sarah" />

      <div className="min-h-screen bg-[#f8f5f3] relative overflow-hidden">
        {/* Aquarela / folhas no fundo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
          <div className="absolute top-10 -right-28 h-80 w-80 rounded-full bg-rose-200/35 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-96 w-96 rounded-full bg-pink-100/60 blur-3xl" />

          {/* galhos/folhas (leve e sutil) */}
          <div className="absolute top-8 left-6 text-3xl opacity-50 animate-sway">🌿</div>
          <div className="absolute top-14 right-8 text-4xl opacity-45 animate-float">🍃</div>
          <div className="absolute top-28 left-1/3 text-3xl opacity-40 animate-sway">🌿</div>
          <div className="absolute top-40 right-1/3 text-3xl opacity-35 animate-float">🍂</div>
          <div className="absolute bottom-32 left-10 text-4xl opacity-35 animate-sway">🍃</div>
          <div className="absolute bottom-24 right-12 text-4xl opacity-35 animate-float">🌿</div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-10 sm:py-14">
          <div className="max-w-3xl mx-auto">
            {/* Card convite (no clima do convite da imagem) */}
            <div className="bg-white/85 backdrop-blur rounded-3xl shadow-2xl border border-rose-200/60 overflow-hidden">
              {/* Topo */}
              <div className="px-6 sm:px-10 pt-10 sm:pt-12 text-center">
                <p className="tracking-[0.18em] text-xs sm:text-sm text-rose-800/80 font-semibold">
                  ANIVERSÁRIO DA
                </p>

                {/* Faixa rosa (ribbon) */}
                <div className="mt-4 flex justify-center">
                  <div className="relative inline-block">
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 h-10 w-10 rotate-12 bg-rose-300/70 rounded-lg blur-[1px]" />
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 h-10 w-10 -rotate-12 bg-rose-300/70 rounded-lg blur-[1px]" />
                    <div className="relative px-8 sm:px-12 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-rose-300/90 via-pink-200/90 to-rose-300/90 shadow-lg border border-rose-200">
                      <h1 className="text-4xl sm:text-6xl font-extrabold text-rose-900 leading-none">
                        Sarah
                      </h1>
                    </div>
                  </div>
                </div>

                <p className="mt-6 sm:mt-7 text-base sm:text-lg text-rose-900/80 px-2">
                  Ela vai completar <span className="font-bold">3 aninhos</span> e espera por você para brincar,
                  sorrir e se divertir <span className="font-bold">muuuuito</span>!
                </p>
              </div>

              {/* Linha divisória suave */}
              <div className="mt-8 sm:mt-10 px-6 sm:px-10">
                <div className="h-px w-full bg-rose-200/60" />
              </div>

              {/* Data / Hora / Local (layout parecido com o convite) */}
              <div className="px-6 sm:px-10 py-8 sm:py-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 items-center">
                  {/* Mês */}
                  <div className="text-center">
                    <p className="text-sm sm:text-base tracking-[0.12em] text-rose-900/70 font-semibold">
                      FEVEREIRO
                    </p>
                    <div className="mt-2 h-px bg-rose-200/70 w-24 mx-auto" />
                  </div>

                  {/* Dia */}
                  <div className="text-center">
                    <div className="mx-auto h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-rose-200/70 border border-rose-200 shadow-inner flex items-center justify-center">
                      <span className="text-3xl sm:text-4xl font-extrabold text-rose-900">28</span>
                    </div>
                  </div>

                  {/* Horário */}
                  <div className="text-center">
                    <p className="text-sm sm:text-base tracking-[0.12em] text-rose-900/70 font-semibold">
                      12:30
                    </p>
                    <div className="mt-2 h-px bg-rose-200/70 w-24 mx-auto" />
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-base sm:text-lg font-semibold text-rose-900">
                    Buffet Jokempô – Mogi das Cruzes
                  </p>
                </div>

                {/* Confirmação */}
                <div className="mt-10 text-center">
                  {!confirmed ? (
                    <>
                      <button
                        onClick={() => setConfirmed(true)}
                        className="w-full sm:w-auto px-7 sm:px-12 py-4 rounded-full text-lg sm:text-xl font-extrabold
                                   bg-rose-700 text-white shadow-lg hover:shadow-xl
                                   hover:bg-rose-800 transition-all duration-300 active:scale-[0.98]"
                      >
                        💗 Confirmar Presença
                      </button>
                      <p className="mt-3 text-sm text-rose-900/60">
                        Clique para confirmar (você pode ajustar a lógica para enviar WhatsApp/Salvar RSVP depois)
                      </p>
                    </>
                  ) : (
                    <div className="mx-auto max-w-xl bg-rose-100/70 border border-rose-200 rounded-2xl p-5 sm:p-6 animate-in fade-in duration-500">
                      <p className="text-2xl sm:text-3xl font-extrabold text-rose-800">🎉 Presença Confirmada!</p>
                      <p className="mt-2 text-base sm:text-lg text-rose-900/80">
                        Vai ser lindo ter você com a gente 💕
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Rodapé com “bichinhos” (emoji, para ficar próximo do tema do convite) */}
              <div className="bg-gradient-to-b from-white/0 to-rose-50/80 px-6 sm:px-10 pt-2 pb-8">
                <div className="flex items-end justify-center gap-4 sm:gap-6 text-3xl sm:text-4xl opacity-90">
                  <span title="hipopótamo">🦛</span>
                  <span title="leão">🦁</span>
                  <span title="girafa">🦒</span>
                  <span title="elefante">🐘</span>
                  <span title="zebra">🦓</span>
                </div>
              </div>
            </div>

            {/* Observações opcionais (bem discretas, para não brigar com o convite) */}
            <div className="mt-6 text-center text-sm text-rose-900/55">
              Se quiser, me diga o endereço completo e um telefone para contato que eu encaixo no layout.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
