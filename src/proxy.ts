import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_COOKIE, sessionValide } from "@/lib/admin-auth";

/**
 * GARDE-BARRIÈRE DE L'ESPACE D'ADMINISTRATION
 *
 * Exécuté avant le rendu de toute page `/admin`. Une page d'administration
 * n'est donc jamais produite — même partiellement — pour un visiteur sans
 * session valide : la vérification a lieu avant, pas dans le composant.
 *
 * (En Next.js 16 ce fichier s'appelle `proxy.ts` ; c'est l'ancien
 * `middleware.ts`, renommé.)
 */

const PAGE_CONNEXION = "/admin/connexion";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const connecte = await sessionValide(request.cookies.get(ADMIN_COOKIE)?.value);
  const surLaPageDeConnexion = pathname === PAGE_CONNEXION;

  if (connecte && surLaPageDeConnexion) {
    // Déjà identifié : inutile de redemander le code.
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!connecte && !surLaPageDeConnexion) {
    const redirection = new URL(PAGE_CONNEXION, request.url);
    // Mémorise la page demandée pour y revenir après la saisie du code.
    if (pathname !== "/admin") redirection.searchParams.set("suite", `${pathname}${search}`);
    return NextResponse.redirect(redirection);
  }

  const reponse = NextResponse.next();
  // Ceinture et bretelles : l'espace admin ne doit apparaître dans aucun index.
  reponse.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return reponse;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
