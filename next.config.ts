import type { NextConfig } from "next";

// Las imágenes para redes leen fuentes y fotos del disco. Se generan en el
// build, pero así también están disponibles si se renderizan en el servidor.
const ogAssets = ["./src/assets/fonts/**/*", "./public/images/products/**/*"];
const ogRoutes = ["/", "/producto/*/", "/catalogo/*/"].flatMap((base) => [
  `${base}opengraph-image*`,
  `${base}twitter-image*`,
]);

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  outputFileTracingIncludes: Object.fromEntries(ogRoutes.map((route) => [route, ogAssets])),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
