# Lacanau Océhand — Site officiel

Site refondu du club de handball de Lacanau. Architecture propre, responsive,
optimisée pour le référencement (mot-clé **« Lacanau handball »**) et pensée pour
être facile à maintenir.

**Stack :** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react

---

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de production :

```bash
npm run build
npm run start
```

> Node.js 18.18+ requis. Le projet se déploie tel quel sur **Vercel** (import du repo,
> aucune configuration nécessaire).

---

## Structure

```
src/
├─ app/                    # Pages (une route = un dossier)
│  ├─ page.tsx             # Accueil
│  ├─ le-club/             # Histoire, palmarès, salles, encadrement
│  ├─ equipes/             # Toutes les équipes (onglets par catégorie)
│  ├─ saison/              # Matchs, entraînements, tarifs
│  ├─ evenements/          # Actualités
│  ├─ rejoindre/           # 3 formulaires (joueur / bénévole / partenaire)
│  ├─ contact/             # Coordonnées + carte + formulaire
│  ├─ layout.tsx           # En-tête, pied de page, SEO, données structurées
│  ├─ globals.css          # Design system (couleurs, typographie, motifs)
│  ├─ robots.ts            # robots.txt généré
│  └─ sitemap.ts           # sitemap.xml généré
├─ components/
│  ├─ layout/              # Header, footer, transition de page
│  ├─ sections/            # Blocs de page (hero, FAQ, équipes, formulaires…)
│  ├─ common/              # Reveal (animations), titres de section, conteneur
│  ├─ ui/                  # Boutons, champs, inputs…
│  └─ icons/               # Icônes réseaux sociaux (SVG)
├─ data/site.ts            # ⭐ TOUT le contenu du site (à modifier ici)
├─ lib/                    # Config SEO, utilitaires, animations
└─ types/                  # Types TypeScript

public/
├─ media/                  # Photos du club (équipes, club, staff)
├─ federation/             # Logos FFHB / Ligue / Comité
└─ placeholders/           # Logo du club + logos partenaires
```

**👉 Pour changer un texte, un horaire, un résultat, une équipe ou un tarif :
tout se trouve dans `src/data/site.ts`.** Pas besoin de toucher au code des pages.

---

## SEO mis en place

- Cible principale : **« Lacanau handball »** (présent dans les titres H1, les
  balises `<title>`, les descriptions et la FAQ).
- Une **balise title + meta description unique** par page (textes courts, ~150 caractères).
- **Section FAQ** avec données structurées `FAQPage` (éligible aux résultats enrichis Google).
- Données structurées `SportsOrganization` (nom, sport, lieu, réseaux) dans le layout.
- `sitemap.xml` et `robots.txt` générés automatiquement.
- URL canoniques, balises Open Graph et Twitter Card.

⚠️ **À faire avant la mise en ligne :** dans `src/lib/site.ts`, remplacez
`https://lacanau-ocehand.fr` par l'URL réelle du site (utilisée pour le sitemap,
les URL canoniques et les données structurées).

---

## ⚠️ À compléter / vérifier par le club

1. **Vidéos** — aucune vidéo n'a pu être récupérée (les vidéos YouTube d'origine
   sont en privé). Le site est donc 100 % photo. Pour ajouter une vidéo plus tard,
   on peut intégrer un bloc dédié sur l'accueil ou la page club.
2. **Tarifs** — les montants des licences sont affichés « Sur demande » faute de
   données. À renseigner dans `licensePricing` (`src/data/site.ts`).
3. **Calendrier des matchs** — les prochains matchs sont des espaces réservés
   (« À programmer »). À mettre à jour dans `upcomingMatches`. Les résultats de la
   Coupe de France 2024 (`latestResults`) sont eux réels et exacts.
4. **Horaires d'entraînement** — indicatifs, à confirmer avec les entraîneurs.
5. **Formulaires** — ils affichent un message de confirmation côté navigateur mais
   **n'envoient pas encore d'e-mail**. Pour les rendre fonctionnels sans serveur,
   le plus simple est de connecter un service comme **Formspree**, **Web3Forms**
   ou **Resend** (quelques minutes). Indiquez-le moi et je vous branche ça.
6. **Logo / e-mail** — le logo utilisé est celui du repo (`public/placeholders/logo-main.png`)
   et l'adresse de contact est `contact@lacanau-ocehand.fr` : à remplacer si besoin.

---

## Personnalisation rapide

- **Couleurs & typographie :** `src/app/globals.css` (variables CSS en haut du fichier).
- **Polices :** Archivo (titres) + Hanken Grotesk (texte), chargées dans `src/app/layout.tsx`.
- **Navigation :** `navItems` dans `src/data/site.ts`.
