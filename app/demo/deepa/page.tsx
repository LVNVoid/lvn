"use client";

import React, { useState, useMemo } from "react";
import {
  Coffee,
  Camera,
  Sparkles,
  MapPin,
  Star,
  ShoppingBag,
  Plus,
  Minus,
  X,
  MessageCircle,
  Clock,
  Search,
  Check,
  Send,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  category: "signature" | "espresso" | "refreshers" | "bites" | "meals" | "studio";
  price: number;
  description: string;
  badge?: "BEST SELLER" | "FAVORITE" | "SPECIAL" | "STUDIO BUNDLE";
  isPopular?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  // Signature Coffee
  {
    id: "sig-1",
    name: "Deepa Aren Signature",
    category: "signature",
    price: 22000,
    description: "Espresso robusta-arabica Temanggung, gula aren organik, fresh milk creamy.",
    badge: "BEST SELLER",
    isPopular: true,
  },
  {
    id: "sig-2",
    name: "Cinnamon Cloud Latte",
    category: "signature",
    price: 26000,
    description: "Espresso halus dengan busa susu vanila lembut dan taburan kayu manis aromatik.",
    badge: "FAVORITE",
    isPopular: true,
  },
  {
    id: "sig-3",
    name: "Butterscotch Cold Brew",
    category: "signature",
    price: 28000,
    description: "Kopi seduh dingin 16 jam dengan sentuhan sirup mentega karamel manis gurih.",
    badge: "SPECIAL",
    isPopular: true,
  },

  // Espresso Based
  {
    id: "esp-1",
    name: "Americano (Hot / Ice)",
    category: "espresso",
    price: 18000,
    description: "Double shot espresso biji lokal Temanggung dengan air mineral murni.",
  },
  {
    id: "esp-2",
    name: "Caffe Latte",
    category: "espresso",
    price: 24000,
    description: "Espresso seimbang dipadu dengan steamed milk sutra bertekstur microfoam.",
  },
  {
    id: "esp-3",
    name: "Caramel Macchiato",
    category: "espresso",
    price: 28000,
    description: "Lapisan susu vanilla kental, espresso bold, dan drizzle saus karamel.",
  },

  // Non-Coffee & Refreshers
  {
    id: "ref-1",
    name: "Matcha Berry Cloud",
    category: "refreshers",
    price: 27000,
    description: "Pure Uji Matcha autentik berpadu puree stroberi segar dan susu oat lembut.",
    badge: "FAVORITE",
    isPopular: true,
  },
  {
    id: "ref-2",
    name: "Yuzu Honey Sparkling",
    category: "refreshers",
    price: 24000,
    description: "Bulir jeruk yuzu Jepang, madu murni hutan, dan soda dingin menyegarkan.",
  },
  {
    id: "ref-3",
    name: "Artisan Chocolate Cream",
    category: "refreshers",
    price: 25000,
    description: "Cokelat pekat Jawa Tengah dengan sirup hazelnut dan fresh milk dingin.",
  },

  // Pastry & Light Bites
  {
    id: "bit-1",
    name: "Almond Butter Croissant",
    category: "bites",
    price: 24000,
    description: "Croissant renyah berlapis dengan taburan kacang almond panggang gurih.",
    badge: "BEST SELLER",
    isPopular: true,
  },
  {
    id: "bit-2",
    name: "Truffle Parmesan Fries",
    category: "bites",
    price: 22000,
    description: "Kentang goreng renyah dengan minyak truffle aromatik dan keju parmesan.",
  },
  {
    id: "bit-3",
    name: "Churro Bites with Dip",
    category: "bites",
    price: 20000,
    description: "Camilan churros hangat tabur kayu manis dengan saus cokelat leleh.",
  },

  // Main Meals
  {
    id: "mea-1",
    name: "Ricebowl Dori Sambal Matah",
    category: "meals",
    price: 32000,
    description: "Ikan dori fillet krispi, nasi pulen hangat, telur mata sapi, dan sambal matah Bali segar.",
    badge: "FAVORITE",
    isPopular: true,
  },
  {
    id: "mea-2",
    name: "Chicken Katsu Curry Rice",
    category: "meals",
    price: 34000,
    description: "Ayam fillet katsu tebal dengan saus kari Jepang kental dan sayuran wortel kentang.",
  },

  // Studio Photo Packages
  {
    id: "stu-1",
    name: "Self Photo Studio (15 Mins)",
    category: "studio",
    price: 65000,
    description: "Sesi foto mandiri 15 menit dengan remote nirkabel, properti studio lengkap, + 2 cetak foto 4R.",
    badge: "STUDIO BUNDLE",
    isPopular: true,
  },
  {
    id: "stu-2",
    name: "Graduation / Group Session",
    category: "studio",
    price: 120000,
    description: "Sesi foto grup hingga 6 orang, durasi 30 menit, seluruh softfile dikirim via Google Drive + 4 cetak.",
    badge: "STUDIO BUNDLE",
  },
];

const CATEGORIES = [
  { id: "all", label: "Semua", icon: Sparkles },
  { id: "signature", label: "Signature Kopi", icon: Coffee },
  { id: "espresso", label: "Espresso", icon: Coffee },
  { id: "refreshers", label: "Non-Kopi", icon: Sparkles },
  { id: "bites", label: "Snacks", icon: ShoppingBag },
  { id: "meals", label: "Makanan Berat", icon: ShoppingBag },
  { id: "studio", label: "Paket Studio", icon: Camera },
];

export default function DeepaMenuDemoPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTable, setSelectedTable] = useState<string>("Meja 03");
  const [cart, setCart] = useState<Record<string, { item: MenuItem; qty: number; note: string }>>({});
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState<boolean>(false);

  const WA_NUMBER = "6281525700005"; // Deepa Coffee Studio official WhatsApp
  const GMAPS_URL = "https://www.google.com/maps/place/DEEPA+COFFE+AND+STUDIOS/@-7.3072811,110.1743199,17z";

  // Filter menu
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory = activeCategory === "all" || item.category === activeCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Cart operations
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const current = prev[item.id];
      if (current) {
        return {
          ...prev,
          [item.id]: { ...current, qty: current.qty + 1 },
        };
      }
      return {
        ...prev,
        [item.id]: { item, qty: 1, note: "" },
      };
    });
  };

  const updateQty = (itemId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[itemId];
      if (!current) return prev;
      const newQty = current.qty + delta;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return {
        ...prev,
        [itemId]: { ...current, qty: newQty },
      };
    });
  };

  const updateItemNote = (itemId: string, note: string) => {
    setCart((prev) => {
      const current = prev[itemId];
      if (!current) return prev;
      return {
        ...prev,
        [itemId]: { ...current, note },
      };
    });
  };

  const totalItemsCount = useMemo(() => {
    return Object.values(cart).reduce((sum, entry) => sum + entry.qty, 0);
  }, [cart]);

  const subtotalPrice = useMemo(() => {
    return Object.values(cart).reduce(
      (sum, entry) => sum + entry.item.price * entry.qty,
      0
    );
  }, [cart]);

  const formatRp = (num: number) => {
    return `Rp ${new Intl.NumberFormat("id-ID").format(num)}`;
  };

  // Generate WhatsApp Order Message
  const handleSendToWhatsApp = () => {
    const lines = [
      `Halo Kasir *Deepa Coffee & Studio*! 👋`,
      `Saya ingin memesan dari *${selectedTable}*:`,
      "",
    ];

    Object.values(cart).forEach((entry, idx) => {
      const itemTotal = formatRp(entry.item.price * entry.qty);
      const noteStr = entry.note ? ` _(${entry.note})_` : "";
      lines.push(`${idx + 1}. *${entry.qty}x ${entry.item.name}* — ${itemTotal}${noteStr}`);
    });

    lines.push("");
    lines.push(`*Total Tagihan: ${formatRp(subtotalPrice)}*`);
    lines.push("");
    lines.push(`Mohon dikonfirmasi & diproses ya kak, terima kasih! ✨`);

    const message = encodeURIComponent(lines.join("\n"));
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${message}`;

    window.open(waUrl, "_blank");
    setShowOrderSuccess(true);
    setTimeout(() => setShowOrderSuccess(false), 5000);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen pb-28 relative bg-[#0e1114]">
      {/* Top Banner & Cafe Identity */}
      <header className="relative bg-gradient-to-b from-[#181d22] to-[#0e1114] border-b border-[#272f38] px-4 pt-6 pb-4">
        {/* Concept Tag & Operating Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-[#202730] border border-[#2f3844] text-[#d4af37]">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            COFFEE &amp; CREATIVE STUDIO
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Buka • 10:00 - 23:00
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="mb-3">
          <h1 className="text-2xl font-black tracking-tight text-[#f4f4f5]">
            DEEPA <span className="text-[#d4af37]">COFFEE</span> &amp; STUDIO
          </h1>
          <p className="text-xs text-[#9ca3af] italic mt-0.5">
            &ldquo;From bean to cup — crafted with heart.&rdquo;
          </p>
        </div>

        {/* Address & Quick Links */}
        <div className="flex flex-col gap-1 text-xs text-[#9ca3af] mb-4">
          <div className="flex items-center gap-1.5 text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span className="truncate">Jl. Perintis Kemerdekaan No.17, Temanggung</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-[#9ca3af] shrink-0" />
            <span>Dine-In • Takeaway • Studio Photo</span>
          </div>
        </div>

        {/* Action Pills Bar (Maps, Review, WA) */}
        <div className="grid grid-cols-3 gap-2">
          <a
            href={GMAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-[#1c2229] border border-[#2c3642] hover:border-[#d4af37]/60 text-[#f4f4f5] text-[11px] font-medium transition-all active:scale-95"
          >
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Rute Maps</span>
          </a>

          <a
            href={GMAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-[#1c2229] border border-[#2c3642] hover:border-[#d4af37]/60 text-[#f4f4f5] text-[11px] font-medium transition-all active:scale-95"
          >
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Bintang 5</span>
          </a>

          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-[#1c2229] border border-[#2c3642] hover:border-[#d4af37]/60 text-[#f4f4f5] text-[11px] font-medium transition-all active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Sticky Table Selector & Search Bar */}
      <div className="sticky top-0 z-30 bg-[#0e1114]/95 backdrop-blur-md border-b border-[#222933] px-4 py-2.5 space-y-2">
        <div className="flex items-center justify-between gap-2">
          {/* Table Selector */}
          <div className="flex items-center gap-1.5 bg-[#181e26] border border-[#2b3542] rounded-xl px-2.5 py-1.5 flex-1">
            <span className="text-[10px] uppercase font-bold text-[#9ca3af] tracking-wider">
              Posisi:
            </span>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="bg-transparent text-xs font-bold text-[#d4af37] focus:outline-none cursor-pointer flex-1"
            >
              <option value="Meja 01" className="bg-[#181e26] text-white">Meja 01 (Indoor AC)</option>
              <option value="Meja 02" className="bg-[#181e26] text-white">Meja 02 (Indoor AC)</option>
              <option value="Meja 03" className="bg-[#181e26] text-white">Meja 03 (Sofa Bar)</option>
              <option value="Meja 04" className="bg-[#181e26] text-white">Meja 04 (Outdoor)</option>
              <option value="Meja 05" className="bg-[#181e26] text-white">Meja 05 (Outdoor)</option>
              <option value="Meja 06" className="bg-[#181e26] text-white">Meja 06 (Lantai 2)</option>
              <option value="Takeaway" className="bg-[#181e26] text-white">Bungkus / Takeaway</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9ca3af] pointer-events-none" />
          </div>

          {/* Quick Notice */}
          <span className="text-[10px] text-[#9ca3af] font-medium shrink-0">
            Pesan langsung tanpa antre
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Cari kopi, matcha, croissant, studio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-8 text-xs bg-[#161a20] border border-[#272f3a] rounded-xl text-[#f4f4f5] placeholder-[#6b7280] focus:border-[#d4af37] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Category Switcher */}
      <div className="sticky top-[95px] z-20 bg-[#0e1114] border-b border-[#202731] px-4 py-2 overflow-x-auto scrollbar-none flex items-center gap-1.5">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all select-none ${
                isActive
                  ? "bg-[#d4af37] text-[#0e1114] shadow-md shadow-[#d4af37]/20"
                  : "bg-[#161b22] text-[#9ca3af] border border-[#252e3a] hover:text-[#f4f4f5]"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Menu List */}
      <main className="p-4 space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-[#9ca3af]">
            <Coffee className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">Menu tidak ditemukan</p>
            <p className="text-xs mt-1">Coba cari dengan kata kunci lain.</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const inCartQty = cart[item.id]?.qty || 0;

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#141920] border border-[#242c38] hover:border-[#384456] transition-all flex items-start justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  {/* Badge */}
                  {item.badge && (
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider mb-1.5 ${
                        item.badge === "BEST SELLER"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                          : item.badge === "STUDIO BUNDLE"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  <h3 className="font-extrabold text-sm text-[#f4f4f5] leading-tight">
                    {item.name}
                  </h3>

                  <p className="text-[11px] text-[#9ca3af] leading-relaxed mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-2.5 font-mono font-black text-sm text-[#d4af37] tabular-nums">
                    {formatRp(item.price)}
                  </div>
                </div>

                {/* Counter / Add Button */}
                <div className="shrink-0 mt-2">
                  {inCartQty > 0 ? (
                    <div className="flex items-center gap-1.5 bg-[#1f2631] border border-[#d4af37]/40 rounded-xl p-1 shadow-sm">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-6 h-6 rounded-lg bg-[#27313f] text-[#f4f4f5] flex items-center justify-center hover:bg-[#344254] active:scale-95"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center font-bold text-xs text-[#d4af37] tabular-nums">
                        {inCartQty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-6 h-6 rounded-lg bg-[#d4af37] text-[#0e1114] flex items-center justify-center font-bold active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1.5 rounded-xl bg-[#1c222b] border border-[#2d3746] hover:border-[#d4af37] text-xs font-bold text-[#f4f4f5] flex items-center gap-1 transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Tambah</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* Floating Bottom Cart Bar */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-3 left-4 right-4 z-40 max-w-md mx-auto">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-amber-400 to-[#d4af37] text-[#0e1114] shadow-[0_8px_30px_rgba(212,175,55,0.4)] flex items-center justify-between font-black transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#0e1114] text-[#d4af37] flex items-center justify-center text-xs font-black">
                {totalItemsCount}
              </div>
              <div className="text-left">
                <span className="text-xs block leading-tight text-[#0e1114]/80">
                  {selectedTable} • Keranjang
                </span>
                <span className="text-sm font-black tabular-nums">
                  {formatRp(subtotalPrice)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs uppercase tracking-wider font-extrabold">
              <span>Lihat Pesanan</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </div>
          </button>
        </div>
      )}

      {/* Cart & Checkout Modal / Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end max-w-md mx-auto animate-fade-in">
          <div className="bg-[#141920] border-t border-[#29323f] rounded-t-3xl p-5 max-h-[85vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#232a35] mb-3">
              <div>
                <h2 className="text-base font-extrabold text-[#f4f4f5]">
                  Daftar Pesanan ({selectedTable})
                </h2>
                <p className="text-[11px] text-[#9ca3af]">
                  Periksa item sebelum kirim ke kasir via WhatsApp
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-[#1e2530] text-[#9ca3af] hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1">
              {Object.values(cart).map(({ item, qty, note }) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-[#1b222b] border border-[#2b3543] space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#f4f4f5]">
                        {item.name}
                      </h4>
                      <span className="text-[11px] font-mono font-bold text-[#d4af37] tabular-nums">
                        {formatRp(item.price * qty)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#12161c] border border-[#2b3543] rounded-lg p-0.5">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-5 h-5 rounded bg-[#1e2530] text-white flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-4 text-center font-bold text-xs text-[#d4af37] tabular-nums">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-5 h-5 rounded bg-[#d4af37] text-black flex items-center justify-center text-xs font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Note Input */}
                  <input
                    type="text"
                    placeholder="Catatan (cth: Less sugar, es terpisah)..."
                    value={note}
                    onChange={(e) => updateItemNote(item.id, e.target.value)}
                    className="w-full text-[11px] bg-[#12161c] border border-[#262f3a] rounded-lg px-2.5 py-1 text-white placeholder-[#6b7280] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              ))}
            </div>

            {/* Total Calculation */}
            <div className="pt-3 border-t border-[#232a35] mt-3 space-y-1.5">
              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>Total Item</span>
                <span className="font-bold text-[#f4f4f5]">{totalItemsCount} porsi</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#f4f4f5]">
                <span>Total Pembayaran</span>
                <span className="font-mono text-[#d4af37] tabular-nums text-base">
                  {formatRp(subtotalPrice)}
                </span>
              </div>
            </div>

            {/* WhatsApp Send Button */}
            <button
              onClick={() => {
                handleSendToWhatsApp();
                setIsCartOpen(false);
              }}
              className="mt-4 w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Kirim Pesanan ke WhatsApp Kasir</span>
            </button>
          </div>
        </div>
      )}

      {/* Success Notification Banner */}
      {showOrderSuccess && (
        <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto p-3 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-100 flex items-center gap-2 shadow-2xl text-xs font-bold animate-bounce-short">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>WhatsApp terbuka! Silakan kirim pesan ke kasir Deepa.</span>
        </div>
      )}

      {/* Agency / Developer Watermark */}
      <footer className="mt-8 text-center text-[10px] text-[#6b7280] space-y-1 border-t border-[#1c222b] pt-4 px-4">
        <p className="font-semibold text-[#9ca3af]">
          DEEPA COFFEE &amp; STUDIO • TEMANGGUNG
        </p>
        <p>
          Preview Konsep Web App Menu Digital oleh{" "}
          <a
            href="https://elvien.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d4af37] underline font-bold hover:text-amber-300"
          >
            Elvien (Web Developer)
          </a>
        </p>
        <p className="text-[9px] text-[#4b5563]">
          Ingin sistem menu QR &amp; aplikasi web kafe kustom? Hubungi 0812-xxxx-xxxx
        </p>
      </footer>
    </div>
  );
}
