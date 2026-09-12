# L'espace d'administration — `/admin`

Le club modifie lui-même les tarifs, les créneaux, les événements et le reste
du contenu du site, sans toucher au code ni redéployer.

---

## Pour le club : comment ça marche

1. Aller sur **https://lacanauocehand.fr/admin**
2. Saisir le code d'accès : `LacanauOcehand123`
3. Choisir une rubrique, modifier, cliquer sur **Enregistrer**

Le site public se met à jour tout seul dans les secondes qui suivent.
La session dure 12 heures ; passé ce délai, le code est redemandé.

### Ce qui est modifiable

| Rubrique | Ce qu'elle change sur le site |
| --- | --- |
| Tarifs & licences | Tableau des prix, aides, arguments « pourquoi nous rejoindre », catégories d'âge |
| Créneaux d'entraînement | Le planning de la semaine (page Équipes) |
| Actualités & événements | Le bandeau « à noter » de l'accueil et de la page Rejoindre |
| Équipes | Nom, âges, entraîneur, présentation, photo et créneaux résumés de chaque fiche |
| Encadrement | Entraîneurs par catégorie et contact de la filière jeunes |
| Bureau & staff | Les bénévoles présentés sur la page « Le club » |
| Boutique | Le catalogue et les prix affichés avant HelloAsso |
| Questions fréquentes | L'accordéon de l'accueil |
| Partenaires | Le bandeau défilant des logos |
| Salles & lieux | Les gymnases et le pôle beach |
| Photos du site | Les grandes photos des pages : accueil, bandeaux d'en-tête, galeries, frise de l'histoire, logo |
| Contact & liens | Adresse e-mail, réseaux sociaux, pages HelloAsso, guide du licencié |

### Publier une actualité

Rubrique **Actualités & événements**. Une seule annonce est affichée à la
fois : **la première de la liste qui est encore d'actualité**. La pastille
verte « Affichée sur le site », dans l'admin, indique laquelle — pour en
mettre une autre en avant, il suffit de la remonter avec les flèches.

**Les dates sont facultatives**, et c'est le point important :

- **sans date** — « les inscriptions sont ouvertes », « la saison reprend » :
  l'annonce reste affichée jusqu'à ce que le club la retire ou en publie une
  autre au-dessus ;
- **avec une date de fin** — un forum, un tournoi : le site retire l'annonce
  tout seul le lendemain. Inutile de penser à supprimer le bandeau du forum.

Seul le titre est obligatoire. Les lignes non remplies (horaire, lieu, bouton)
ne s'affichent tout simplement pas.

### Changer une photo

Tous les champs photo fonctionnent de la même façon : **« Choisir une photo »**
ouvre la médiathèque. On y retrouve toutes les photos du site, et le bouton
**« Importer une photo »** permet d'en ajouter une depuis son ordinateur ou
son téléphone (JPG, PNG, WEBP, AVIF, GIF).

La photo est automatiquement réduite avant l'envoi : une photo de téléphone de
6 Mo part en quelques centaines de kilo-octets, sans différence visible, et le
site reste rapide. Elle rejoint ensuite la médiathèque et est réutilisable
partout ailleurs.

Les photos qui appartiennent à une fiche (équipe, bénévole, salle, partenaire)
se changent depuis la fiche elle-même. Les grandes photos des pages — accueil,
bandeaux d'en-tête, galeries, frise de l'histoire, logo — sont regroupées dans
la rubrique **Photos du site**.

### Bon à savoir
- **Chaque rubrique peut revenir en arrière.** Le bouton « Réinitialiser », en
  bas de chaque écran, remet la rubrique dans l'état livré avec le site.
- **Rien n'est perdu par accident.** Le navigateur prévient si l'on quitte la
  page avec des modifications non enregistrées.
- **Une photo importée par erreur se supprime** depuis la médiathèque (la
  petite corbeille sur la vignette). Les photos livrées avec le site, elles,
  restent toujours disponibles.
- **Changer le nom d'une équipe ne change pas l'adresse de sa page.** C'est
  volontaire : les liens déjà partagés continuent de fonctionner. Le champ
  « Adresse de la page » permet de forcer le changement, en connaissance de
  cause.

---

## Pour la maintenance

### Mise en service sur Vercel

Le disque d'une fonction Vercel est en lecture seule : les modifications sont
donc écrites dans **Vercel Blob**. Une fois, à la mise en ligne :

**En ligne de commande** (le plus court) :

```bash
vercel blob create-store lacanau-ocehand-contenu --access public --environment production --yes
```

**Ou depuis le tableau de bord** : projet `lacanauoceanhand` → **Storage** →
**Create Database → Blob** → **Connect** vers le projet, en cochant la seule
production.

Puis **redéployer** pour que la variable soit prise en compte.

Trois choix à connaître :

- **accès public** : le site lit le fichier par l'URL publique du CDN, sans
  appel authentifié. C'est ce qui permet aux pages publiques de rester
  statiques.
- **production uniquement** : sans cette restriction, une préproduction
  écrirait dans le contenu du site en ligne. On teste en local, où l'admin
  écrit dans un fichier séparé.
- **région par défaut** : le fichier fait quelques kilo-octets et passe par
  le cache ; la région d'origine n'a aucun effet perceptible.

La variable `BLOB_READ_WRITE_TOKEN` est ajoutée automatiquement. Tant qu'elle
est absente, `/admin` reste consultable en ligne mais affiche
« Enregistrement indisponible » et explique quoi faire.

En développement (`npm run dev`), aucune configuration n'est nécessaire : les
modifications vont dans `.data/site-content.json`, ignoré par git.

### Changer le code d'accès

Définir `ADMIN_CODE` dans les variables d'environnement Vercel. Définir aussi
`ADMIN_SESSION_SECRET` (une longue chaîne aléatoire) évite de déconnecter tout
le monde à chaque changement de code — sans elle, la clé de signature des
sessions est dérivée du code lui-même.

### Comment c'est construit

```
src/data/site.ts             les valeurs d'origine, livrées avec le code
        │
        ▼
src/lib/content-schema.ts    le type SiteContent, les valeurs par défaut,
        │                    et la validation de tout ce qui vient du formulaire
        ▼
src/lib/content-store.ts     lecture / écriture (Vercel Blob ou fichier local)
        │
        ▼
src/lib/content.ts           getSiteContent() — mis en cache, invalidé à
        │                    l'enregistrement
        ▼
les pages du site            await getSiteContent()
```

- **`src/lib/admin-sections.ts`** décrit les douze écrans : une rubrique, ses
  blocs, ses champs. **Ajouter un champ modifiable = ajouter une ligne ici.**
  Les formulaires, l'enregistrement et la validation suivent tout seuls.
- **`src/data/images.ts`** liste les photos « en dur » des pages, avec leur
  libellé et leur valeur d'origine. **Rendre une photo modifiable = y ajouter
  une ligne**, puis lire `contenu.images.<clé>` là où elle s'affiche ; l'écran
  « Photos du site » se construit tout seul à partir de cette liste.
- **`src/lib/media-store.ts`** dépose les photos importées (Vercel Blob en
  ligne, `public/media/importees/` en développement) et lit la médiathèque.
  `src/lib/photos.ts` porte les limites, partagées avec le navigateur qui
  réduit la photo avant l'envoi.
- **`src/app/admin/actions.ts`** contient les seules écritures. Chaque action
  revérifie la session, valide les données, et n'autorise une rubrique à
  écrire que ses propres clés.
- **`src/proxy.ts`** (l'ancien `middleware.ts`, renommé en Next.js 16) garde la
  porte : une page `/admin` n'est jamais rendue sans session valide.

### Photos importées et limites d'envoi

Une photo importée part dans le **même Blob store** que le contenu, sous le
préfixe `photos/`, et le site la sert par son adresse publique. Deux garde-fous
tiennent ensemble et ne doivent pas être desserrés séparément :

- `next.config.ts` relève `serverActions.bodySizeLimit` à 4 Mo (1 Mo par
  défaut) et autorise le sous-domaine du Blob dans `images.remotePatterns` —
  sans quoi `next/image` répondrait 400 sur chaque photo importée ;
- `src/lib/photos.ts` redimensionne dans le navigateur (2400 px, WebP) avant
  l'envoi, et plafonne à 3,5 Mo. La marge sous les 4,5 Mo acceptés par
  l'hébergeur pour une requête est volontaire.

Le SVG est refusé à l'import : c'est un document qui peut contenir du script,
et il serait servi depuis le domaine du site.

### Ce que le stockage contient

Uniquement ce qui a été modifié. Une rubrique jamais touchée n'apparaît pas
dans le fichier et suit les valeurs de `src/data/site.ts`. Conséquences utiles :

- ajouter une rubrique au code ne casse pas un contenu déjà enregistré ;
- « Réinitialiser » revient à retirer la clé du fichier ;
- une panne de lecture du stockage fait simplement retomber le site sur les
  valeurs du code, jamais sur une page vide.

### Performance et référencement

Le cache ne contient **que les modifications lues dans le stockage**, jamais le
contenu fusionné. La nuance est structurelle : le cache de données survit aux
déploiements, et y ranger le contenu complet figerait la forme qu'avait
`SiteContent` ce jour-là — une clé ajoutée ensuite au code reviendrait
`undefined` sur toutes les pages. La fusion avec les valeurs du code a donc
lieu à chaque rendu (cf. `src/lib/content.ts`), et `mergeContent` fusionne les
clés-objets champ par champ pour la même raison.

Les pages publiques restent **générées statiquement** : `getSiteContent()` est
mis en cache et n'est lu qu'à la (re)génération, pas à chaque visite. Un
enregistrement invalide l'étiquette de cache et déclenche la régénération.
`npm run build` doit continuer d'afficher `○ (Static)` sur les pages du site.

Les pages `/admin`, elles, sont volontairement **dynamiques** (`ƒ` au build).
Elles ne sont vues que par quelques personnes derrière un code : les figer au
build n'apporterait rien et ferait afficher un état de stockage périmé — par
exemple « enregistrement indisponible » alors qu'un Blob store vient d'être
relié.

`/llms.txt` — la fiche du club lue par les IA génératives — est **généré** à
partir du même contenu (`src/app/llms.txt/route.ts`). Il annonçait auparavant
des tarifs recopiés à la main : ils auraient été périmés dès la première
modification.
