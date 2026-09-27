import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deepa Coffee & Studio — Digital Menu & Order Preview",
  description:
    "Menu digital interaktif Deepa Coffee & Studio Temanggung. Pesan langsung dari meja ke WhatsApp kasir tanpa antre.",
  openGraph: {
    title: "Deepa Coffee & Studio — Digital Menu & Order Preview",
    description:
      "Menu digital interaktif Deepa Coffee & Studio Temanggung. Dari biji kopi pilihan hingga studio foto kreatif.",
    type: "website",
  },
};

export default function DeepaDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#0d0f11] text-[#f4f4f5] antialiased selection:bg-[#d97706]/30">{children}</div>;
}
