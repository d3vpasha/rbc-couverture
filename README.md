# RBC Couverture — site vitrine

Site vitrine one-page pour **RBC COUVERTURE** (Christophe Dubal, couvreur zingueur).
HTML/CSS/JS statique, aucune dépendance, aucun build.

## Lancer en local

```
python3 -m http.server 8000
```
puis http://localhost:8000

## Structure

```
index.html                 page unique (toutes les sections)
assets/css/style.css       feuille de style unique
assets/js/main.js          menu, FAQ, scroll, formulaire mailto
assets/img/logo.svg        logo recréé au vecteur d'après l'enseigne
assets/img/favicon.svg     favicon
assets/img/og-cover.svg    visuel de partage (à exporter en PNG, voir plus bas)
robots.txt / sitemap.xml   SEO
client_rbc_couverture.jpg  photo source de l'enseigne
```

## Infos vérifiées (relevées sur l'enseigne)

| Champ | Valeur |
|---|---|
| Raison sociale | RBC COUVERTURE |
| Gérant | DUBAL Christophe |
| Téléphone | 06 66 13 97 12 |
| E-mail actuel | dubal.rbccouverture@gmail.com |

## À valider avec le client avant mise en ligne

Toutes les zones concernées sont soulignées en orange dans le rendu (classe `.ph`)
et listées dans le commentaire `TODO` en tête de `index.html` :

1. Ville, département, liste des communes couvertes, rayon d'intervention
2. Adresse postale (JSON-LD + mentions légales)
3. SIRET, forme juridique, assurance décennale
4. Année de création / expérience
5. Horaires
6. Photos de chantiers (6 emplacements, format 4:3)
7. **Avis clients** : les blocs sont vides et marqués. Ne jamais publier de faux avis —
   les remplir avec de vrais avis Google, ou supprimer la section.
8. Certifications (RGE, Qualibat) — absentes par défaut, à n'ajouter que si détenues
9. Domaine définitif → remplacer `https://rbc-couverture.fr` dans `index.html` (canonical + OG
   + JSON-LD) et `sitemap.xml` / `robots.txt`
10. E-mail pro → remplacer `dubal.rbccouverture@gmail.com` dans `index.html` et la constante
    `DESTINATAIRE` en tête de `assets/js/main.js`

## Recherche / remplacement rapide

```
grep -rn "\[VILLE\]"                    .   # ville
grep -rn "rbc-couverture.fr"            .   # domaine
grep -rn "dubal.rbccouverture@gmail.com" .  # e-mail
grep -rn "TODO"                          .  # tout le reste
```

## Image de partage social

`assets/img/og-cover.svg` doit être exporté en PNG 1200×630 avant mise en ligne
(Facebook, LinkedIn et WhatsApp ne lisent pas le SVG) :

```
rsvg-convert -w 1200 -h 630 assets/img/og-cover.svg -o assets/img/og-cover.png
# ou : inkscape assets/img/og-cover.svg -w 1200 -h 630 -o assets/img/og-cover.png
```

La balise `og:image` pointe déjà vers `og-cover.png`.

## Déploiement

Site 100 % statique : glisser-déposer du dossier sur Netlify, Cloudflare Pages ou
un hébergement mutualisé OVH. Prévoir HTTPS et une redirection `www` → apex.
