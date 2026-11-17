import type { Metadata } from "next";
import { CatalogView } from "@/modules/catalog/components/CatalogView";

export const metadata: Metadata = {
  title: "Catálogo de ramos de flores en vela y regalos en Neiva",
  description:
    "Ramos de flores aromatizados, bouquets de rosas en vela, cajitas de regalo, recordatorios y velas de Navidad hechos a mano en Neiva, Huila. Envíos a toda Colombia.",
  alternates: { canonical: "/catalogo" },
};

export default function CatalogPage() {
  return <CatalogView />;
}
