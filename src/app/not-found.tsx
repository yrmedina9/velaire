import { SunRays } from "@/components/brand/SunRays";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <SunRays animated className="w-28 text-clay-400" />
      <p className="mt-4 font-display text-8xl text-clay-500">404</p>
      <h1 className="mt-2 font-display text-4xl">Esta vela se apagó…</h1>
      <p className="mt-3 max-w-md text-cacao-700">
        No encontramos la página que buscas, pero tenemos muchos detalles que te pueden enamorar.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/catalogo">Ver catálogo</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Volver al inicio
        </ButtonLink>
      </div>
    </Container>
  );
}
