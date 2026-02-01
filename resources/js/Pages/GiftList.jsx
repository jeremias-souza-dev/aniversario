"use client";

import { useState, useEffect } from "react";
import { Gift, Star, Heart, Check, Sparkles, PartyPopper, ExternalLink, Loader2, ImageOff, ArrowUp, ShoppingBag, Plus, Minus, X, Package, Truck } from "lucide-react";
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

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
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [carrinho, setCarrinho] = useState([]);

  const defaultName = auth?.user?.user_relationship?.real_name || auth?.user?.name || "";
  const [nomeConvidado, setNomeConvidado] = useState(defaultName);

  const [processando, setProcessando] = useState(false);
  const [imagemErro, setImagemErro] = useState({});
  const [telaConfirmacao, setTelaConfirmacao] = useState(false);
  const [reservasConfirmadas, setReservasConfirmadas] = useState([]);
  const [mostrarSubir, setMostrarSubir] = useState(false);

  useEffect(() => {
    if (gifts) {
      setPresentes(gifts);
      setLoading(false);
    }

    const handleScroll = () => {
      setMostrarSubir(window.scrollY > 400);
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



  const adicionarAoCarrinho = (presente) => {
    if (presente.reservado || carrinho.find(p => p.id === presente.id)) return;
    setCarrinho(prev => [...prev, presente]);

    // Celebration Effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f43f5e', '#fbbf24', '#14b8a6']
    });

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    const qtd = carrinho.length + 1;
    Toast.fire({
      icon: 'success',
      title: 'Adicionado!',
      text: `A Sarah ficará muito feliz com ${qtd} ${qtd > 1 ? 'presentes' : 'presente'} de ${nomeConvidado || 'você'}! 🎈`,
      color: '#db2777',
      background: '#fff1f2'
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(prev => prev.filter(p => p.id !== id));
  };

  const estaNoCarrinho = (id) => carrinho.some(p => p.id === id);

  const finalizarReservas = async () => {
    if (!nomeConvidado.trim() || carrinho.length === 0 || processando) return;

    const result = await Swal.fire({
      title: 'Confirmar Reservas?',
      html: `Você está reservando <strong>${carrinho.length} presente(s)</strong>. Deseja continuar?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, reservar tudo!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ec4899',
    });

    if (!result.isConfirmed) return;

    setProcessando(true);

    const csrfMeta = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfMeta ? csrfMeta.getAttribute('content') : "";

    try {
      const reservasRealizadas = [];

      for (const presente of carrinho) {
        const res = await fetch('/presentes/reservar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfToken
          },
          body: JSON.stringify({
            id: presente.id,
            nome: nomeConvidado
          }),
        });

        if (res.ok) {
          reservasRealizadas.push(presente);
          setPresentes(prev => prev.map(p =>
            p.id === presente.id
              ? { ...p, reservado: true, reservadoPor: nomeConvidado }
              : p
          ));
        }
      }

      if (reservasRealizadas.length > 0) {
        setReservasConfirmadas(reservasRealizadas.map(p => ({
          ...p,
          reservadoPor: nomeConvidado
        })));
        setCarrinho([]);
        setCarrinhoAberto(false);
        setTelaConfirmacao(true);
      } else {
        throw new Error('Nenhuma reserva foi realizada.');
      }

    } catch (err) {
      Swal.fire('Ops!', err.message, 'error');
    } finally {
      setProcessando(false);
    }
  };

  const presentesFiltrados = filtro === "Todos"
    ? presentes
    : presentes.filter(p => p.categoria === filtro);

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

      {/* Carrinho Flutuante */}
      <button
        onClick={() => setCarrinhoAberto(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
      >
        <ShoppingBag className="w-6 h-6" />
        {carrinho.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-400 text-pink-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
            {carrinho.length}
          </span>
        )}
      </button>

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

          <p className="text-xl text-pink-600 font-semibold mb-8">Carrinho de Reservas</p>

          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border-2 border-pink-100">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-teal-500" />
                <span className="text-2xl font-bold text-teal-500">{loading ? '...' : disponíveis}</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">Disponíveis</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border-2 border-pink-100">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-pink-500" />
                <span className="text-2xl font-bold text-pink-500">{loading ? '...' : reservados}</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">Reservados</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border-2 border-amber-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                <span className="text-2xl font-bold text-amber-500">{carrinho.length}</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">No Carrinho</p>
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
                  src={auth.user.avatar || "/placeholder.svg"}
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
            <p className="text-sm text-pink-500/80">Monte seu carrinho de reservas</p>
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

      {/* Lista de Presentes - Estilo E-commerce */}
      <main className="max-w-6xl mx-auto px-4 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
            <p className="text-pink-600 font-medium">Carregando produtos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {presentesFiltrados.map(presente => {
              const noCarrinho = estaNoCarrinho(presente.id);

              return (
                <div
                  key={presente.id}
                  className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 ${presente.reservado
                    ? "opacity-60 grayscale"
                    : noCarrinho
                      ? "ring-2 ring-amber-400 shadow-lg shadow-amber-100"
                      : "hover:shadow-xl hover:-translate-y-1"
                    }`}
                >
                  {/* Badge de Status */}
                  {presente.reservado && (
                    <div className="absolute top-2 right-2 z-10 bg-gray-800/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Reservado
                    </div>
                  )}
                  {noCarrinho && !presente.reservado && (
                    <div className="absolute top-2 right-2 z-10 bg-amber-400 text-amber-900 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-semibold">
                      <ShoppingBag className="w-3 h-3" /> No Carrinho
                    </div>
                  )}

                  {/* Imagem */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-amber-50">
                    {presente.imagem && !imagemErro[presente.id] ? (
                      <img
                        src={presente.imagem || "/placeholder.svg"}
                        alt={presente.nome}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => handleImageError(presente.id)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {imagemErro[presente.id] ? (
                          <ImageOff className="w-10 h-10 text-pink-200" />
                        ) : (
                          <Gift className="w-12 h-12 text-pink-200" />
                        )}
                      </div>
                    )}

                    {/* Categoria Badge */}
                    <span className={`absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border backdrop-blur-sm bg-white/90 ${coresCategorias[presente.categoria]}`}>
                      {iconesCategorias[presente.categoria]} {presente.categoria}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className={`font-medium text-sm leading-tight mb-1 line-clamp-2 min-h-[2.5rem] ${presente.reservado ? "line-through text-gray-400" : "text-gray-800"
                      }`}>
                      {presente.nome}
                    </h3>

                    {presente.reservado ? (
                      <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-2">
                        <Heart className="w-3 h-3 fill-current" /> por {presente.reservadoPor}
                      </p>
                    ) : (
                      <>
                        <div className="mb-2">
                          {presente.preco && (
                            <p className="text-base font-bold text-teal-600">{presente.preco}</p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {/* Botão de Adicionar/Remover */}
                          {noCarrinho ? (
                            <>
                              <button
                                onClick={() => removerDoCarrinho(presente.id)}
                                className="flex-1 py-2 px-3 rounded-xl font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 transition-all duration-200 flex items-center justify-center gap-1.5 text-xs border border-amber-300"
                              >
                                <Minus className="w-3.5 h-3.5" />
                                Remover
                              </button>
                              <button
                                onClick={() => setCarrinhoAberto(true)}
                                className="w-10 flex items-center justify-center rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-700 border border-teal-200 transition-colors"
                                title="Ver Carrinho"
                              >
                                <ShoppingBag className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => adicionarAoCarrinho(presente)}
                              className="flex-1 py-2 px-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 text-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Adicionar
                            </button>
                          )}

                          {presente.link && (
                            <a
                              href={presente.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-10 flex items-center justify-center rounded-xl bg-orange-100 hover:bg-orange-200 border border-orange-200 transition-colors"
                              title="Ver na Shopee"
                            >
                              <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/icon_favicon_1_32.9cd61b2e90c0f104.png" alt="Shopee" className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Drawer do Carrinho */}
      {carrinhoAberto && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCarrinhoAberto(false)} />

          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header do Carrinho */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6" />
                  <div>
                    <h2 className="text-lg font-bold">Carrinho de Reservas</h2>
                    <p className="text-pink-100 text-sm">{carrinho.length} item(s) selecionado(s)</p>
                  </div>
                </div>
                <button
                  onClick={() => setCarrinhoAberto(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lista de Itens */}
            <div className="flex-1 overflow-y-auto p-4">
              {carrinho.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
                  <p className="font-medium">Seu carrinho está vazio</p>
                  <p className="text-sm">Adicione presentes para reservar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {carrinho.map(item => (
                    <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-pink-100 flex-shrink-0">
                        {item.imagem && !imagemErro[item.id] ? (
                          <img src={item.imagem || "/placeholder.svg"} alt={item.nome} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Gift className="w-6 h-6 text-pink-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-800 line-clamp-2">{item.nome}</h4>
                        <p className="text-teal-600 font-bold text-sm mt-1">{item.preco}</p>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium mt-1 ${coresCategorias[item.categoria]}`}>
                          {iconesCategorias[item.categoria]} {item.categoria}
                        </span>
                      </div>
                      <button
                        onClick={() => removerDoCarrinho(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer do Carrinho */}
            {carrinho.length > 0 && (
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                {/* Passos visuais */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-pink-500">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-xs font-medium">Selecionar</span>
                  </div>
                  <div className="w-8 h-0.5 bg-pink-200" />
                  <div className="flex items-center gap-1.5 text-pink-500">
                    {/* Placeholder for CreditCard icon */}
                    <span className="w-4 h-4 bg-gray-300 rounded-full" />
                    <span className="text-xs font-medium">Confirmar</span>
                  </div>
                  <div className="w-8 h-0.5 bg-pink-200" />
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Truck className="w-4 h-4" />
                    <span className="text-xs font-medium">Comprar</span>
                  </div>
                </div>

                {/* Campo Nome */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Seu nome para a reserva:</label>
                  <input
                    type="text"
                    placeholder="Ex: Titia Maria"
                    value={nomeConvidado}
                    onChange={e => setNomeConvidado(e.target.value)}
                    disabled={processando}
                    className="w-full rounded-xl border-2 border-pink-200 px-4 py-2.5 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
                  />
                </div>

                {/* Resumo */}
                <div className="bg-white rounded-xl p-3 mb-3 border border-gray-100">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Itens reservados:</span>
                    <span className="font-semibold text-gray-800">{carrinho.length} presente(s)</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">
                    * Você poderá comprar em qualquer loja após confirmar a reserva
                  </p>
                </div>

                {/* Botão Finalizar */}
                <button
                  onClick={finalizarReservas}
                  disabled={!nomeConvidado.trim() || processando}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {processando ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Confirmar Reservas
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      {telaConfirmacao && reservasConfirmadas.length > 0 && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setTelaConfirmacao(false);
              setReservasConfirmadas([]);
            }
          }}
        >
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-400 to-teal-400 px-6 py-6 text-center flex-shrink-0">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">Reservas Confirmadas!</h2>
              <p className="text-green-100 text-sm mt-1">Obrigada, {reservasConfirmadas[0]?.reservadoPor}!</p>
            </div>

            {/* Lista de Reservas */}
            <div className="flex-1 overflow-y-auto p-5">
              <p className="text-gray-600 text-sm mb-3 text-center">Você reservou {reservasConfirmadas.length} presente(s):</p>

              <div className="space-y-2">
                {reservasConfirmadas.map(item => (
                  <div key={item.id} className="flex gap-3 items-center bg-gray-50 rounded-xl p-3 border border-gray-100">
                    {item.imagem ? (
                      <img src={item.imagem || "/placeholder.svg"} alt={item.nome} className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
                        <Gift className="w-5 h-5 text-pink-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{item.nome}</p>
                      {item.preco && <p className="text-teal-600 font-bold text-xs">{item.preco}</p>}
                    </div>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-center text-gray-500 text-xs mt-4">
                Compre em qualquer loja ou clique no ícone para ver na Shopee
              </p>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100 flex-shrink-0">
              <button
                onClick={() => {
                  setTelaConfirmacao(false);
                  setReservasConfirmadas([]);
                }}
                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4" />
                Reservar Mais Presentes
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                A Sarah Lorraine vai adorar!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Seta para voltar ao topo */}
      {mostrarSubir && !carrinhoAberto && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-28 right-6 p-3 rounded-full bg-white text-pink-500 shadow-lg hover:shadow-xl hover:bg-pink-50 transition-all duration-300 z-30 border border-pink-100 animate-bounce"
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
