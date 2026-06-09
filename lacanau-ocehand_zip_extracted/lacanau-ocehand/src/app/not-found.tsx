import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="section-index text-[clamp(5rem,18vw,11rem)] leading-none text-ocean">
        404
      </span>
      <h1 className="headline mt-2 text-[clamp(1.8rem,5vw,2.8rem)] text-ink">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-soft">
        Cette page n'existe pas ou a été déplacée. Revenez à l'accueil pour
        retrouver le handball à Lacanau.
      </p>
      <Link href="/" className="mt-8">
        <Button variant="primary" size="lg">
          <ArrowLeft size={18} /> Retour à l'accueil
        </Button>
      </Link>
    </section>
  );
}
