"use client"


import { useState } from "react"
import { Gift, Check, Heart, Sparkles, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const initialGifts = [
  { id: 1, name: "Boneca Baby Alive", description: "Boneca que come e bebe", category: "Brinquedos", reserved: false },
  { id: 2, name: "Casinha de Bonecas", description: "Casinha com móveis e acessórios", category: "Brinquedos", reserved: false },
  { id: 3, name: "Conjunto de Massinhas", description: "Play-Doh com formas divertidas", category: "Brinquedos", reserved: false },
  { id: 4, name: "Livros Infantis", description: "Coleção de histórias ilustradas", category: "Educativos", reserved: false },
  { id: 5, name: "Blocos de Montar", description: "Lego Duplo colorido", category: "Educativos", reserved: false },
  { id: 6, name: "Bicicleta Rosa", description: "Com rodinhas laterais", category: "Brinquedos", reserved: false },
  { id: 7, name: "Kit de Pintura", description: "Tintas, pincéis e aventais", category: "Arte", reserved: false },
  { id: 8, name: "Fantasia de Princesa", description: "Vestido com coroa e varinha", category: "Fantasias", reserved: false },
  { id: 9, name: "Pelúcia Unicórnio", description: "Grande e fofinho", category: "Pelúcias", reserved: false },
  { id: 10, name: "Quebra-Cabeça", description: "50 peças com animais", category: "Educativos", reserved: false },
  { id: 11, name: "Mini Cozinha", description: "Com acessórios de cozinha", category: "Brinquedos", reserved: false },
  { id: 12, name: "Patinete", description: "Com 3 rodas e luzes", category: "Brinquedos", reserved: false },
]

const categoryColors = {
  "Brinquedos": "bg-primary/20 text-primary",
  "Educativos": "bg-accent/30 text-accent-foreground",
  "Arte": "bg-secondary text-secondary-foreground",
  "Fantasias": "bg-chart-4/20 text-chart-4",
  "Pelúcias": "bg-chart-5/20 text-chart-5",
}

const categoryIcons = {
  "Brinquedos": "🎀",
  "Educativos": "📚",
  "Arte": "🎨",
  "Fantasias": "👸",
  "Pelúcias": "🧸",
}


export function GiftList() {
  const [gifts, setGifts] = useState(initialGifts)
  const [selectedGift, setSelectedGift] = useState(null)
  const [guestName, setGuestName] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState("Todos")

  const categories = ["Todos", ...Array.from(new Set(initialGifts.map(g => g.category)))]

  const filteredGifts = filter === "Todos" 
    ? gifts 
    : gifts.filter(g => g.category === filter)

  const handleReserve = () => {
    if (!selectedGift || !guestName.trim()) return
    setGifts(prev => prev.map(gift => 
      gift.id === selectedGift.id 
        ? { ...gift, reserved: true, reservedBy: guestName }
        : gift
    ))
    setShowModal(false)
    setSelectedGift(null)
    setGuestName("")
  }

  const reservedCount = gifts.filter(g => g.reserved).length

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-card px-6 py-3 shadow-md">
          <Gift className="h-5 w-5 text-primary" />
          <span className="font-medium text-card-foreground">
            {gifts.length - reservedCount} disponíveis
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-card px-6 py-3 shadow-md">
          <Heart className="h-5 w-5 text-chart-5" />
          <span className="font-medium text-card-foreground">
            {reservedCount} reservados
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => setFilter(category)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              filter === category
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-card text-card-foreground hover:bg-primary/10"
            )}
          >
            {category !== "Todos" && categoryIcons[category]} {category}
          </button>
        ))}
      </div>

      {/* Gift Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGifts.map((gift, index) => (
          <div
            key={gift.id}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-card p-5 shadow-md transition-all duration-300",
              gift.reserved 
                ? "opacity-70" 
                : "hover:shadow-xl hover:scale-[1.02] cursor-pointer"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => {
              if (!gift.reserved) {
                setSelectedGift(gift)
                setShowModal(true)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !gift.reserved) {
                setSelectedGift(gift)
                setShowModal(true)
              }
            }}
            role="button"
            tabIndex={gift.reserved ? -1 : 0}
          >
            {/* Decorative elements */}
            <div className="absolute -right-2 -top-2 text-4xl opacity-20 transition-transform group-hover:scale-110">
              {categoryIcons[gift.category]}
            </div>
            
            {/* Category Badge */}
            <span className={cn(
              "inline-block rounded-full px-3 py-1 text-xs font-medium",
              categoryColors[gift.category]
            )}>
              {gift.category}
            </span>

            {/* Content */}
            <h3 className="mt-3 text-lg font-semibold text-card-foreground">
              {gift.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {gift.description}
            </p>

            {/* Status */}
            {gift.reserved ? (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-accent" />
                <span>Reservado por {gift.reservedBy}</span>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-2 text-sm text-primary">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">Clique para reservar</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedGift && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
          onClick={() => setShowModal(false)}
          onKeyDown={(e) => e.key === 'Escape' && setShowModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="w-full max-w-md rounded-3xl bg-card p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">
                Reservar Presente
              </h3>
              <p className="mt-2 text-muted-foreground">
                {selectedGift.name}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="guestName" className="block text-sm font-medium text-card-foreground mb-2">
                  Seu nome
                </label>
                <input
                  id="guestName"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Digite seu nome..."
                  className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border-2 border-border px-4 py-3 font-medium text-card-foreground transition-colors hover:bg-muted"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleReserve}
                  disabled={!guestName.trim()}
                  className="flex-1 rounded-xl bg-primary px-4 py-3 font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
