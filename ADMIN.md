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
| Événements | Le bandeau « à noter » de l'accueil et de la page Rejoindre |
| Équipes | Nom, âges, entraîneur, présentation, photo et créneaux résumés de chaque fiche |
| Encadrement | Entraîneurs par catégorie et contact de la filière jeunes |
| Bureau & staff | Les bénévoles présentés sur la page « Le club » |
| Boutique | Le catalogue et les prix affichés avant HelloAsso |
| Questions fréquentes | L'accordéon de l'accueil |
| Partenaires | Le bandeau défilant des logos |
| Salles & lieux | Les gymnases et le pôle beach |
| Contact & liens | Adresse e-mail, réseaux sociaux, pages HelloAsso, guide du licencié |

### Bon à savoir

- **Les événements passés disparaissent tout seuls.** Le site affiche le
  prochain rendez-vous dont la date n'est pas écoulée : inutile de supprimer
  le forum de septembre en octobre.
- **Chaque rubrique peut revenir en arrière.** Le bouton « Réinitialiser », en
  bas de chaque écran, remet la rubrique dans l'état livré avec le site.
- **Rien n'est perdu par accident.** Le navigateur prévient si l'on quitte la
  page avec des modifications non enregistrées.
- **Les photos** doivent d'abord être déposées dans le projet (dossiers
  `public/media/…`) ; l'admin propose ensuite la liste des fichiers existants.
  Ajouter une photo reste une opération technique.
- **Changer le nom d'une équipe ne change pas l'adresse de sa page.** C'est
  volontaire : les liens déjà partagés continuent de fonctionner. Le champ
  « Adresse de la page » permet de forcer le changement, en connaissance de
  cause.

---

## Pour la maintenance

### Mise en service sur Vercel

Le disque d'une fonction Vercel est en lecture seule : les modifications sont
donc écrites dans **Vercel Blob**. Une fois, à la mise en ligne :

1. Tableau de bord Vercel → projet `lacanauoceanhand` → **Storage**
2. **Create Database → Blob**, puis **Connect** vers le projet
3. Redéployer

La variable `BLOB_READ_WRITE_TOKEN` est ajoutée automatiquement à tous les
environnements. Tant qu'elle est absente, `/admin` reste consultable en ligne
mais affiche « Enregistrement indisponible » et explique quoi faire.

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

- **`src/lib/admin-sections.ts`** décrit les onze écrans : une rubrique, ses
  blocs, ses champs. **Ajouter un champ modifiable = ajouter une ligne ici.**
  Les formulaires, l'enregistrement et la validation suivent tout seuls.
- **`src/app/admin/actions.ts`** contient les seules écritures. Chaque action
  revérifie la session, valide les données, et n'autorise une rubrique à
  écrire que ses propres clés.
- **`src/proxy.ts`** (l'ancien `middleware.ts`, renommé en Next.js 16) garde la
  porte : une page `/admin` n'est jamais rendue sans session valide.

### Ce que le stockage contient

Uniquement ce qui a été modifié. Une rubrique jamais touchée n'apparaît pas
dans le fichier et suit les valeurs de `src/data/site.ts`. Conséquences utiles :

- ajouter une rubrique au code ne casse pas un contenu déjà enregistré ;
- « Réinitialiser » revient à retirer la clé du fichier ;
- une panne de lecture du stockage fait simplement retomber le site sur les
  valeurs du code, jamais sur une page vide.

### Performance et référencement

Les pages publiques restent **générées statiquement** : `getSiteContent()` est
mis en cache et n'est lu qu'à la (re)génération, pas à chaque visite. Un
enregistrement invalide l'étiquette de cache et déclenche la régénération.
`npm run build` doit continuer d'afficher `○ (Static)` sur les pages du site.

`/llms.txt` — la fiche du club lue par les IA génératives — est **généré** à
partir du même contenu (`src/app/llms.txt/route.ts`). Il annonçait auparavant
des tarifs recopiés à la main : ils auraient été périmés dès la première
modification.
