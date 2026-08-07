import { Suspense } from "react";
import CatalogClient from "./CatalogClient";

export const metadata = {
  title: "Catalog, MindfulReading",
};

export default function CatalogPage() {
  return (
    <Suspense fallback={null}>
      <CatalogClient />
    </Suspense>
  );
}
