# Mickey Design website met chat

Klanten loggen in met Discord en chatten op de site met jou. Jij beantwoordt de chats op `/admin.html`.

## Online zetten
1. Upload alle bestanden naar een GitHub-repository.
2. Importeer de repository op vercel.com en deploy.

## Database (voor de chat)
1. Open je project in Vercel, ga naar het tabblad Storage (of Marketplace) en kies Upstash Redis.
2. Maak een gratis database aan en koppel hem aan het project. Vercel voegt `KV_REST_API_URL` en `KV_REST_API_TOKEN` zelf toe.

## Discord
1. discord.com/developers/applications > New Application. Kopieer bij OAuth2 de Client ID en de Client Secret.
2. Voeg bij OAuth2 > Redirects toe: `https://JOUW-SITE.vercel.app/api/callback`.
3. Zet in Discord Instellingen > Geavanceerd > Ontwikkelaarsmodus aan. Klik met rechts op jezelf en kies Gebruikers-ID kopiëren. Dat is `OWNER_DISCORD_ID`. Alleen dit account mag de chats beheren.
4. Optioneel: maak een webhook in een kanaal (Kanaalinstellingen > Integraties > Webhooks). Je krijgt dan een Discord-melding bij elk nieuw bericht. Dat is `DISCORD_WEBHOOK_URL`.

## Variabelen in Vercel (Settings > Environment Variables)
DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, OWNER_DISCORD_ID, SESSION_SECRET (zelf verzonnen lange tekst), SITE_URL (zonder slash aan het einde) en eventueel DISCORD_WEBHOOK_URL. Deploy daarna opnieuw.

## Chats beantwoorden
Ga naar `jouw-site.vercel.app/admin.html`, log in met Discord en kies links een gesprek. De pagina ververst zichzelf elke paar seconden.

## Thumbnails en creators aanpassen
Zet je afbeelding in `images/` en voeg in `index.html` een regel toe in het blok `<script type="application/json" id="data">`:
`{"src":"images/mijn-thumbnail.jpg","title":"Titel","cat":"Fortnite"}`
Creators: `{"name":"Naam","sub":"120K abonnees","src":"images/naam.jpg"}` onder `"creators"`. Zolang die lijst leeg is, is het creators-kopje verborgen.
