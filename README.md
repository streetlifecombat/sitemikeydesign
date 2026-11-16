# Mickey Design website

## Online zetten
1. Maak een GitHub-repository en upload alle bestanden uit deze map.
2. Ga naar vercel.com, kies "Add New > Project" en importeer de repository. Laat alle instellingen staan.
3. Zet bij Settings > Environment Variables de waarden uit `.env.example` (zie hieronder) en deploy opnieuw.

## Discord instellen
1. Ga naar discord.com/developers/applications en kies "New Application".
2. Bij OAuth2 kopieer je de Client ID en Client Secret.
3. Voeg bij OAuth2 > Redirects toe: `https://JOUW-SITE.vercel.app/api/callback` (exact zoals SITE_URL, zonder slash aan het einde).
4. Maak in je Discord-server een kanaal voor bestellingen: Kanaalinstellingen > Integraties > Webhooks > Nieuwe webhook > URL kopiëren. Dat is DISCORD_WEBHOOK_URL.
5. SESSION_SECRET is een lange willekeurige tekst die jij verzint.

Bestellingen verschijnen als bericht in dat kanaal, met de Discord-naam van de klant. Je praat verder met de klant via Discord.

## Thumbnails en creators aanpassen
Zet je afbeelding in `images/` en voeg in `index.html` een regel toe in het blok `<script type="application/json" id="data">`:
`{"src":"images/mijn-thumbnail.jpg","title":"Titel","cat":"Fortnite"}`
Creators komen in dezelfde lijst onder `"creators"`: `{"name":"Naam","sub":"120K abonnees","src":"images/naam.jpg"}`. Zolang die lijst leeg is, is het creators-kopje verborgen.
