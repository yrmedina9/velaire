import type { Metadata } from "next";
import { CatalogView } from "@/modules/catalog/components/CatalogView";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Bouquets y ramos de flores en vela, cajitas de regalo, recordatorios y velas de Navidad hechos a mano en Neiva. Envíos a toda Colombia.",
};

export default function CatalogPage() {
  return <CatalogView />;
}
