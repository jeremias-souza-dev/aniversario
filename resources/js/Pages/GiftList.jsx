"use client";

import { useState, useEffect } from "react";
import { Gift, Star, Heart, Check, Sparkles, PartyPopper, ExternalLink, Loader2, ImageOff, ArrowUp } from "lucide-react";
import Swal from 'sweetalert2';

const categorias = ["Todos", "Brinquedos", "Educativos", "Arte", "Fantasias", "Pelúcias", "Roupas"];

const coresCategorias = {
  Brinquedos: "bg-pink-100 text-pink-700 border-pink-300",
  Educativos: "bg-amber-100 text-amber-700 border-amber-300",
  Arte: "bg-teal-100 text-teal-700 border-teal-300",
  Fantasias: "bg-purple-100 text-purple-700 border-purple-300",
  Pelúcias: "bg-rose-100 text-rose-700 border-rose-300",
  Roupas: "bg-sky-100 text-sky-700 border-sky-300",
};

const iconesCategorias = {
  Brinquedos: "🎀", Educativos: "📚", Arte: "🎨", Fantasias: "👑", Pelúcias: "🧸", Roupas: "👗",
};

export default function ListaPresentes({ gifts, auth }) {
  const [presentes, setPresentes] = useState(gifts || []);
  const [loading, setLoading] = useState(!gifts);
  const [filtro, setFiltro] = useState("Todos");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [presenteSelecionado, setPresenteSelecionado] = useState(null);

  // Use real_name from auth as default, fallback to google name, then empty
  const defaultName = auth?.user?.user_relationship?.real_name || auth?.user?.name || "";
  const [nomeConvidado, setNomeConvidado] = useState(defaultName);

  const [processando, setProcessando] = useState(false);
  const [imagemErro, setImagemErro] = useState({});
  const [telaConfirmacao, setTelaConfirmacao] = useState(false);
  const [reservaConfirmada, setReservaConfirmada] = useState(null);

  // Estado para controlar a visibilidade da seta para cima
  const [mostrarSubir, setMostrarSubir] = useState(false);

  useEffect(() => {
    if (gifts) {
      setPresentes(gifts);
      setLoading(false);
    }

    // Listener de scroll para mostrar/esconder a seta
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setMostrarSubir(true);
      } else {
        setMostrarSubir(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [gifts]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageError = (id) => {
    setImagemErro(prev => ({ ...prev, [id]: true }));
  };

  const reservarPresente = async () => {
    if (!nomeConvidado.trim() || !presenteSelecionado || processando) return;

    const guestName = nomeConvidado;
    const presentId = presenteSelecionado.id;
    const presentName = presenteSelecionado.nome;

    const result = await Swal.fire({
      title: 'Confirmar Reserva?',
      text: `Você está reservando "${presentName}". Deseja continuar?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, reservar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ec4899',
    });

    if (!result.isConfirmed) return;

    setProcessando(true);

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
        body: JSON.stringify({
          id: presentId,
          nome: guestName
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao processar reserva.');
      }

      setPresentes(prev => prev.map(p =>
        p.id === presentId
          ? { ...p, reservado: true, reservadoPor: guestName }
          : p
      ));

      setReservaConfirmada({
        nome: presentName,
        preco: presenteSelecionado.preco,
        link: presenteSelecionado.link,
        imagem: presenteSelecionado.imagem,
        reservadoPor: guestName
      });

      setDialogAberto(false);
      // Keep name for next reservation if they want
      // setNomeConvidado(''); 
      setPresenteSelecionado(null);
      setTelaConfirmacao(true);

    } catch (err) {
      Swal.fire('Ops!', err.message, 'error');
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
      {/* Decorações flutuantes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s' }}>
          <Sparkles className="w-6 h-6 text-amber-300" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <Star className="w-5 h-5 text-pink-300 fill-pink-300" />
        </div>
        <div className="absolute top-60 left-20 animate-pulse" style={{ animationDelay: '1s' }}>
          <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
        </div>
      </div>

      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-pink-300 via-pink-200 to-amber-200 py-16 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-[10%] animate-bounce">
            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
          </div>
          <div className="absolute top-8 right-[20%] animate-pulse">
            <Heart className="w-7 h-7 text-pink-500 fill-pink-500" />
          </div>
          <div className="absolute bottom-6 left-[25%] animate-bounce" style={{ animationDelay: '0.3s' }}>
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div className="absolute top-16 right-[10%] animate-pulse" style={{ animationDelay: '0.6s' }}>
            <Star className="w-5 h-5 text-pink-400 fill-pink-400" />
          </div>
        </div>

        <div className="relative max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <PartyPopper className="w-10 h-10 text-pink-600" />
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl px-6 py-2 font-bold rounded-full shadow-lg">
              3 Aninhos!
            </span>
            <PartyPopper className="w-10 h-10 text-pink-600 scale-x-[-1]" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent mb-3 drop-shadow-sm">
            Sarah Lorraine
          </h1>

          <p className="text-xl text-pink-600 font-semibold mb-8">Lista de Presentes</p>

          <div className="flex justify-center gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border-2 border-pink-100">
              <span className="text-3xl font-bold text-teal-500">{loading ? '...' : disponíveis}</span>
              <p className="text-sm text-gray-500 font-medium">Disponíveis</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border-2 border-pink-100">
              <span className="text-3xl font-bold text-pink-500">{loading ? '...' : reservados}</span>
              <p className="text-sm text-gray-500 font-medium">Reservados</p>
            </div>
          </div>
        </div>
      </header>

      {/* Filtros */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        {auth?.user?.user_relationship?.real_name && (
          <div className="flex flex-col items-center justify-center mb-8 animate-fade-in">
            <div className="relative mb-2">
              {auth.user.avatar ? (
                <img
                  src={auth.user.avatar}
                  alt={auth.user.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full border-4 border-white shadow-md bg-pink-100 flex items-center justify-center text-2xl">
                  🎁
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-green-400 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>
            <p className="text-xl font-medium text-pink-700">
              Olá, <span className="font-bold">{auth.user.user_relationship.real_name}</span>!
            </p>
            <p className="text-sm text-pink-500/80">Que bom ter você aqui</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-center">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${filtro === cat
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg border-pink-500 scale-105"
                : "bg-white text-pink-600 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
                }`}
            >
              {cat !== "Todos" && <span className="mr-1">{iconesCategorias[cat]}</span>}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Presentes */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
            <p className="text-pink-600 font-medium">Carregando surpresas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {presentesFiltrados.map(presente => (
              <div
                key={presente.id}
                onClick={() => abrirDialog(presente)}
                className={`group cursor-pointer transition-all duration-300 rounded-2xl border-2 overflow-hidden ${presente.reservado
                  ? "opacity-70 bg-gray-50 border-gray-200 cursor-not-allowed"
                  : "bg-white border-pink-100 hover:border-pink-300 hover:shadow-xl hover:-translate-y-1"
                  }`}
              >
                {/* Imagem do Presente */}
                <div className={`relative aspect-square overflow-hidden ${presente.reservado ? 'grayscale' : ''}`}>
                  {presente.imagem && !imagemErro[presente.id] ? (
                    <img
                      src={presente.imagem || "/placeholder.svg"}
                      alt={presente.nome}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={() => handleImageError(presente.id)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-amber-100 flex items-center justify-center">
                      {imagemErro[presente.id] ? (
                        <ImageOff className="w-12 h-12 text-pink-300" />
                      ) : (
                        <Gift className="w-16 h-16 text-pink-300" />
                      )}
                    </div>
                  )}

                  {/* Badge de categoria */}
                  <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm bg-white/80 ${coresCategorias[presente.categoria]}`}>
                    {iconesCategorias[presente.categoria]} {presente.categoria}
                  </span>

                  {/* Overlay de reservado */}
                  {presente.reservado && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-white rounded-full p-3 shadow-lg">
                        <Check className="w-8 h-8 text-green-500" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info do Presente */}
                <div className="p-4">
                  <h3 className={`font-semibold text-base leading-tight mb-2 line-clamp-2 ${presente.reservado ? "line-through text-gray-400" : "text-gray-800"
                    }`}>
                    {presente.nome}
                  </h3>

                  {presente.reservado ? (
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-current" /> Reservado por {presente.reservadoPor}
                    </p>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        {presente.preco && (
                          <p className="text-lg font-bold text-teal-600">{presente.preco}</p>
                        )}
                        {presente.link && (
                          <a
                            href={presente.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs text-pink-500 hover:underline font-medium"
                          >
                            Vê Shopee <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <button
                        className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                      >
                        <Gift className="w-4 h-4" />
                        Reservar Presente
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal de Reserva */}
      {dialogAberto && presenteSelecionado && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
            {presenteSelecionado.imagem && !imagemErro[presenteSelecionado.id] && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={presenteSelecionado.imagem || "/placeholder.svg"}
                  alt={presenteSelecionado.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}

            <div className="bg-gradient-to-r from-pink-100 to-rose-100 px-6 py-5 border-b border-pink-200">
              <h2 className="text-xl font-bold text-pink-700 flex items-center gap-2">
                <Gift className="w-5 h-5" /> Reservar Presente
              </h2>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-2">
                Você está reservando:
              </p>
              <p className="text-lg font-bold text-gray-800 mb-1">{presenteSelecionado.nome}</p>
              {presenteSelecionado.preco && (
                <p className="text-teal-600 font-semibold mb-4">{presenteSelecionado.preco}</p>
              )}

              <label className="block text-sm font-medium text-gray-700 mb-2">Seu nome:</label>
              <input
                type="text"
                placeholder="Ex: Titia Maria"
                value={nomeConvidado}
                onChange={e => setNomeConvidado(e.target.value)}
                disabled={processando}
                className="w-full rounded-xl border-2 border-pink-200 px-4 py-3 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                autoFocus
              />
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => {
                  setDialogAberto(false);
                  setNomeConvidado('');
                }}
                disabled={processando}
                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={reservarPresente}
                disabled={!nomeConvidado.trim() || processando}
                className="flex-1 rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {processando ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação - Após Reserva */}
      {telaConfirmacao && reservaConfirmada && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-teal-400 px-5 py-5 text-center">
              <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Check className="w-7 h-7 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-white">Reserva Confirmada!</h2>
              <p className="text-green-100 text-sm">Obrigada, {reservaConfirmada.reservadoPor}!</p>
            </div>

            <div className="p-5">
              <div className="flex gap-3 items-center bg-gray-50 rounded-xl p-3 mb-4">
                {reservaConfirmada.imagem ? (
                  <img
                    src={reservaConfirmada.imagem || "/placeholder.svg"}
                    alt={reservaConfirmada.nome}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-pink-100 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-pink-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{reservaConfirmada.nome}</p>
                  {reservaConfirmada.preco && (
                    <p className="text-teal-600 font-bold text-sm">{reservaConfirmada.preco}</p>
                  )}
                </div>
              </div>

              <p className="text-center text-gray-600 text-sm mb-3">
                Compre em qualquer loja ou na Shopee:
              </p>

              <div className="space-y-2">
                {reservaConfirmada.link ? (
                  <a
                    href={reservaConfirmada.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                  >
                    Comprar na Shopee
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="w-full py-3 px-4 rounded-xl text-gray-400 bg-gray-100 border border-dashed border-gray-300 text-center text-sm">
                    Link da Shopee em breve
                  </div>
                )}

                <button
                  onClick={() => {
                    setTelaConfirmacao(false);
                    setReservaConfirmada(null);
                  }}
                  className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <Gift className="w-4 h-4" />
                  Reservar Mais Presentes
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-3">
                A Sarah Lorraine vai adorar!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Seta para voltar ao topo */}
      {mostrarSubir && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-pink-500 text-white shadow-2xl hover:bg-pink-600 transition-all duration-300 hover:scale-110 active:scale-95 z-40 animate-bounce"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Footer */}
      <footer className="py-12 text-center text-pink-400 border-t border-pink-100">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-4 h-4 fill-current" />
          <span>Feito com amor para Sarah Lorraine</span>
          <Heart className="w-4 h-4 fill-current" />
        </div>
        <p className="text-sm text-pink-300">Aniversário de 3 aninhos</p>
      </footer>
    </div>
  );
}