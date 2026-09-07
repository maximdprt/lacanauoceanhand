import { trainingDays } from "@/data/site";
import { getSiteContent } from "@/lib/content";
import { prochainEvenement } from "@/lib/evenements";
import { siteConfig } from "@/lib/site";
import type { TrainingSlot } from "@/types";

/**
 * llms.txt — la fiche du club à destination des IA génératives
 * (ChatGPT, Perplexity, Gemini, Claude…), au format proposé par
 * llmstxt.org.
 *
 * Ce fichier était auparavant écrit à la main dans `public/`. Il recopiait
 * les tarifs et les créneaux : à la première modification faite depuis
 * l'espace d'administration, il aurait annoncé des prix périmés aux moteurs
 * de réponse — exactement l'endroit où une erreur se propage le plus vite.
 * Il est donc généré à partir de la même source que les pages du site.
 *
 * Le texte de présentation, lui, reste écrit ici : c'est de la rédaction,
 * pas de la donnée.
 */

export const dynamic = "force-static";

const url = (chemin: string) => `${siteConfig.url}${chemin}`;

/** « 140 € », sans décimale inutile. */
const euros = (montant: number) =>
  `${montant.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €`;

/** Regroupe les créneaux par lieu, comme les lit un humain. */
function creneauxParLieu(slots: TrainingSlot[]): string[] {
  const lieux = new Map<string, TrainingSlot[]>();

  for (const slot of slots) {
    const lieu =
      slot.city === "Lacanau" ? `À Lacanau, ${slot.venue}` : `À ${slot.city}`;
    lieux.set(lieu, [...(lieux.get(lieu) ?? []), slot]);
  }

  return [...lieux].map(([lieu, creneaux]) => {
    const parJour = trainingDays
      .map((jour) => {
        const duJour = creneaux.filter((c) => c.day === jour);
        if (duJour.length === 0) return null;
        const detail = duJour.map((c) => `${c.time} ${c.group}`).join(", ");
        return `${jour.toLowerCase()} ${detail}`;
      })
      .filter(Boolean);
    return `${lieu} : ${parJour.join(" ; ")}.`;
  });
}

export async function GET() {
  const c = await getSiteContent();
  const evenement = prochainEvenement(c.events);

  const corps = `# Lacanau Océhand — Club de handball à Lacanau (Gironde)

> Club de handball français basé à Lacanau (33680, Gironde, Nouvelle-Aquitaine), champion de France 2024 (Coupe de France départementale) et champion de France 2026 de beach handball. Handball en salle et beach handball, du baby hand (dès 5 ans) aux seniors, filles et garçons, dans une ambiance familiale et bénévole.

## Faits clés
- Nom : Lacanau Océhand (aussi « Océhand », « club de handball de Lacanau »).
- Fondé le 4 juin 2017 par Thierry Mayeur.
- Champion de France 2024 : Coupe de France départementale, finale gagnée 30-29 face à Sainte-Gemmes-sur-Loire, à l'Accor Arena (Bercy, Paris).
- Triple champion de Gironde (2022, 2023, 2024).
- Champion de France 2026 de beach handball.
- Environ 150 licenciés, ${c.teams.length} équipes.
- Disciplines : handball en salle et beach handball.
- Lieux : ${c.salles.map((s) => `${s.name} (${s.address})`).join(" ; ")}.
- Contact : ${c.links.clubEmail} — Instagram @lacanauocehand, Facebook lacanau.OceHand.

## Pages principales
- [Accueil](${url("/")}) : présentation du club, prochains matchs, comment rejoindre.
- [Nos équipes](${url("/equipes")}) : toutes les équipes (seniors, jeunes U11 à U18, beach, école de gardien, école d'arbitrage) avec photos, créneaux d'entraînement et entraîneurs. Ancres : #creneaux (planning complet de la semaine), #encadrement (entraîneurs par catégorie).
- [Beach handball](${url("/beach")}) : la section beach, la boutique du club et le tournoi Lacanau Beach Handball Xperience.
- [Le club](${url("/le-club")}) : histoire, salles, staff et façons de soutenir le club.
- [Rejoindre le club](${url("/rejoindre")}) : tarifs des licences (#tarifs) et inscription comme joueur, bénévole, entraîneur ou partenaire.
- [Contact](${url("/contact")}) : coordonnées et formulaire.

## S'inscrire
Remplir le formulaire de la page « Rejoindre » (joueur, bénévole, entraîneur ou partenaire). Les licenciés de la saison précédente reçoivent un email de renouvellement de la fédération. La licence inclut l'équipement (maillot, short, chaussettes). Premier entraînement découverte offert.

## Tarifs des licences (saison ${c.licenceSeason})
Règlement possible en plusieurs mensualités.
${c.licenceFees
  .map(
    (f) =>
      `- ${f.category}${f.birthYears ? ` (nés ${f.birthYears})` : ""} : ${euros(f.price)}`,
  )
  .join("\n")}
Aides et conditions : ${c.licenceNotes.map((n) => `${n.title} — ${n.detail}`).join(" ")}

## Créneaux d'entraînement (saison ${c.licenceSeason})
${creneauxParLieu(c.trainingSlots).join("\n")}
Responsable de la filière jeunes : ${c.youthLead.name}, ${c.youthLead.phone}.

## Catégories d'âge
${c.ageCategories.map((a) => `- ${a.label} (${a.age}) : ${a.note}.`).join("\n")}

## Boutique, dons et billetterie (HelloAsso)
- [Profil de l'association](${c.links.helloAssoProfile})
- [Boutique « Beach Hand »](${c.links.helloAssoBoutique}) : ${c.shopItems
    .map((i) => `${i.name} ${euros(i.price)}`)
    .join(", ")}. ${c.shopShipping}
- [Faire un don](${c.links.helloAssoDon}) : montant libre.
- [Devenir mécène du LBHX](${c.links.helloAssoMecenat}) : montant libre.
- [Tournoi partenaires LBHX](${c.links.helloAssoTournoi}) : gratuit, sur inscription des équipes.

## Rendez-vous
${
  evenement
    ? `- ${evenement.title} : ${evenement.dateLabel}, ${evenement.timeLabel}, ${evenement.venue} à ${evenement.city}. ${evenement.description}`
    : "- Aucun rendez-vous public annoncé pour le moment."
}

## Documents
- [Guide du licencié (PDF)](${url(c.links.guideLicencie)}) : tarifs, créneaux et encadrement de la saison.
`;

  return new Response(corps, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
