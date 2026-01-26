"use client";

import { useState, useEffect } from "react";
import { Gift, Star, Heart, Check, Sparkles, PartyPopper, ExternalLink, Loader2 } from "lucide-react";
import Swal from 'sweetalert2';

const categorias = ["Todos", "Brinquedos", "Educativos", "Arte", "Fantasias", "Pelúcias", "Roupas"];

const coresCategorias = {
  Brinquedos: "bg-pink-100 text-pink-700 border-pink-200",
  Educativos: "bg-amber-100 text-amber-700 border-amber-200",
  Arte: "bg-teal-100 text-teal-700 border-teal-200",
  Fantasias: "bg-purple-100 text-purple-700 border-purple-200",
  Pelúcias: "bg-rose-100 text-rose-700 border-rose-200",
  Roupas: "bg-sky-100 text-sky-700 border-sky-200",
};

const iconesCategorias = {
  Brinquedos: "🎀",
  Educativos: "📚",
  Arte: "🎨",
  Fantasias: "👑",
  Pelúcias: "🧸",
  Roupas: "👗",
};

export default function ListaPresentes(props) {
  const [presentes, setPresentes] = useState(props.gifts);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("Todos");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [presenteSelecionado, setPresenteSelecionado] = useState(null);
  const [nomeConvidado, setNomeConvidado] = useState("");
  const [processando, setProcessando] = useState(false);

  // Carrega presentes do backend
  useEffect(() => {
          setPresentes(props.gifts || []);
          setLoading(false);
  }, []);

  const reservarPresente = async () => {
    if (!nomeConvidado.trim() || !presenteSelecionado || processando) return;

    const guestName = nomeConvidado;
    const presentName = presenteSelecionado?.nome || '';

    if (presenteSelecionado.reservado) {
      Swal.fire({ icon: 'warning', title: 'Já reservado', text: 'Este presente já foi reservado por outra pessoa.' });
      return;
    }

    const confirmation = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não poderá ser desfeita. Se outra pessoa já reservou, não será possível reservar novamente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, reservar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirmation.isConfirmed) return;

    setProcessando(true);

    // Tenta pegar o token do meta tag ou do cookie XSRF-TOKEN
    const csrfMeta = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfMeta ? csrfMeta.getAttribute('content') : "";

    try {
      const res = await fetch('/presentes/reservar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify({
          id: presenteSelecionado.id,
          nome: guestName
        }),
      });

      if (res.status === 419) {
        throw new Error('Sessão expirada ou Token CSRF inválido. Recarregue a página.');
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao reservar o presente');
      }

      const data = await res.json();

      // Atualiza a lista com o retorno do servidor ou localmente
      if (data && data.presentes) {
        setPresentes(data.presentes);
      } else {
        setPresentes(prev => prev.map(p =>
          p.id === presenteSelecionado.id
            ? { ...p, reservado: true, reservadoPor: guestName }
            : p
        ));
      }

      // Mostrar feedback de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Reservado',
        text: `${guestName} reservou: ${presentName}`,
        timer: 2200,
        showConfirmButton: false,
      });

      setDialogAberto(false);
      setNomeConvidado('');
      setPresenteSelecionado(null);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: err.message || 'Ocorreu um erro',
      });
    } finally {
      setProcessando(false);
    }
  };

  const presentesFiltrados = filtro === "Todos"
    ? presentes
    : presentes.filter(p => p.categoria === filtro);

  const abrirDialog = (presente) => {
    if (presente.reservado) return;
    setPresenteSelecionado(presente);
    setDialogAberto(true);
  };

  const disponíveis = presentes.filter(p => !p.reservado).length;
  const reservados = presentes.filter(p => p.reservado).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-amber-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-pink-300 via-pink-200 to-amber-200 py-16 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-[10%] animate-bounce"><Star className="w-8 h-8 text-amber-400 fill-amber-400" /></div>
          <div className="absolute top-12 right-[15%] animate-pulse"><Heart className="w-7 h-7 text-pink-500 fill-pink-500" /></div>
        </div>

        <div className="relative max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <PartyPopper className="w-10 h-10 text-pink-600" />
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl px-6 py-2 font-bold rounded-full shadow-lg">
              3 Aninhos!
            </span>
            <PartyPopper className="w-10 h-10 text-pink-600 scale-x-[-1]" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent mb-3">
            Sarah Lorrine
          </h1>

          <p className="text-xl text-pink-600 font-semibold mb-8">Lista de Presentes</p>

          <div className="flex justify-center gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-pink-100 w-32">
              <span className="text-3xl font-bold text-teal-500">{loading ? '...' : disponíveis}</span>
              <p className="text-sm text-gray-500 font-medium">Disponíveis</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-pink-100 w-32">
              <span className="text-3xl font-bold text-pink-500">{loading ? '...' : reservados}</span>
              <p className="text-sm text-gray-500 font-medium">Reservados</p>
            </div>
          </div>
        </div>
      </header>

      {/* Filtros */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border-2 ${filtro === cat
                ? "bg-pink-500 text-white shadow-lg border-pink-500"
                : "bg-white text-pink-600 border-pink-200 hover:bg-pink-50"
                }`}
            >
              {cat !== "Todos" && <span className="mr-1">{iconesCategorias[cat]}</span>}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Presentes */}
      <main className="max-w-5xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
            <p className="text-pink-600 font-medium">Carregando surpresas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {presentesFiltrados.map(presente => (
              <div
                key={presente.id}
                onClick={() => abrirDialog(presente)}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-xl rounded-2xl border-2 overflow-hidden ${presente.reservado
                  ? "opacity-60 bg-gray-50 border-gray-200"
                  : "bg-white border-pink-100 hover:border-pink-300"
                  }`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl flex-shrink-0 transition-colors ${presente.reservado ? "bg-gray-200" : "bg-pink-100 group-hover:bg-pink-200"
                      }`}>
                      {presente.reservado ? <Check className="w-6 h-6 text-gray-400" /> : <Gift className="w-6 h-6 text-pink-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-base leading-tight ${presente.reservado ? "line-through text-gray-400" : "text-gray-800"}`}>
                        {presente.nome}
                      </h3>
                      {presente.reservado && (
                        <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-current" /> Reservado por {presente.reservadoPor}
                        </p>
                      )}
                      {presente.preco && !presente.reservado && (
                        <p className="text-lg font-bold text-teal-600 mt-2">{presente.preco}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${coresCategorias[presente.categoria]}`}>
                      {iconesCategorias[presente.categoria]} {presente.categoria}
                    </span>

                    {presente.link && !presente.reservado && (
                      <a
                        href={presente.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs text-pink-500 hover:underline font-medium"
                      >
                        Ver link <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal de Reserva */}
      {dialogAberto && presenteSelecionado && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-pink-100 px-6 py-5 border-b border-pink-200">
              <h2 className="text-xl font-bold text-pink-700 flex items-center gap-2">
                <Gift className="w-5 h-5" /> Reservar Presente
              </h2>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Você está reservando: <br />
                <strong className="text-gray-800">{presenteSelecionado.nome}</strong>
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">Seu nome:</label>
              <input
                type="text"
                placeholder="Ex: Titia Maria"
                value={nomeConvidado}
                onChange={e => setNomeConvidado(e.target.value)}
                disabled={processando}
                className="w-full rounded-xl border-2 border-pink-100 px-4 py-3 focus:border-pink-400 focus:outline-none transition-all"
                autoFocus
              />
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setDialogAberto(false)}
                disabled={processando}
                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={reservarPresente}
                disabled={!nomeConvidado.trim() || processando}
                className="flex-1 rounded-xl px-4 py-3 font-semibold text-white bg-pink-500 hover:bg-pink-600 disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
              >
                {processando ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-12 text-center text-pink-400">
        <p className="flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 fill-current" /> Feito para Sarah Lorrine
        </p>
      </footer>
    </div>
  );
}