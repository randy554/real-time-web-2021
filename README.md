# QuickTriv

Home
[![image.png](https://i.postimg.cc/jd2Hwh92/image.png)](https://postimg.cc/1fxnbDy1)
Play

[![image.png](https://i.postimg.cc/cLPR4c07/image.png)](https://postimg.cc/pmYhsz9y)

## Omschrijving

Dit is een leuke online quiz app die je samen met een vriend of collega kunt spelen. Beantwoord per ronde random vragen over verschillende onderwerpen zoals sport, politiek of geografie. Wees je tegenspeler voor, kies de juiste antwoord en win! Lees [hier](#final-concept-quicktriv) meer over het concept en spelregels.

## Live demo

[Live](https://quicktriv.herokuapp.com/)

## Inhoud

- [Live demo](#live-demo)
- [Concept](#concept)
- [Installatie](#installatie)
- [Data life cycle](#data-life-cycle)
- [Real-time events](#real-time-events)
- [NPM packages](#npm-packages)
- [API](#API)
- [Bronnen](#bronnen)
- [Licentie](#licentie)

## Concepten

| **HANDSTER**                                                                                             | **QUICK EYES!**                                                                                          | **FOOTY-WHO?**                                                                                           |
| :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| [![20210413-030702.jpg](https://i.postimg.cc/j53pjQ3H/20210413-030702.jpg)](https://postimg.cc/LYfCCfp5) | [![20210412-224038.jpg](https://i.postimg.cc/GpK0W1kS/20210412-224038.jpg)](https://postimg.cc/jWDkfm3z) | [![20210412-224021.jpg](https://i.postimg.cc/fLb4ZgCW/20210412-224021.jpg)](https://postimg.cc/jWB34cBB) |

## HANDSTER

Spelers krijgen een woord te zien, de uitdaging is om dit woord correct en zo snel mogelijk over te typen. De speler die als eerst het woord correct typt verdient een punt. Na x aantal woorden wordt er een winnaar gekozen op basis van de meest aantal punten.

## QUICK EYES!

Spelers krijgen per ronde 9 afbeeldingen te zien. Van de 9 afbeeldingen zijn een aantal afbeeldingen van een bepaalde thema, zoals voetbal. De spelers moeten van deze thema alle afbeeldingen zo snel mogelijk eruit weten te filteren. De speler wie daar het snelst mee is wint de ronde en verdient een punt. Na x aantal rondes wordt er een winnar gekozen op basis van de meest aantal punten.

## FOOTY-WHO?

Per ronde krijgt iedere speler een afbeelding met wat gegevens van een voetbalspeler te zien. De overige spelers moeten aan de hand van de omschrijving van de **geselecteerde speler** kunnen raden wie de speler is. Mocht dit niet lukken met de omschrijvingen van de geselecteerde speler binnen een bepaalde tijdbestek, dan wordt er een multiple choice aan antwoorden getoond. De persoon die deze als eerste selecteert wint de ronde. Na x aantal rondes wordt er een winnar gekozen op basis van de meest aantal punten.

<details>
       <summary>Proces</summary>

Ik wist aanvankelijk van mijn brainstormsessie dat ik snelheid als element wilde hebben in mijn concepten. Dit is met mijn drie ideeën denk ik aardig gelukt. Het was achteraf best lastig om een keuze te maken. Ik heb mijn concepten uiteindelijk tijdens de standup aan de rest van groep voorgelegd, om een voorkeur aan te geven. De voorkeur ging voornamelijk naar het concept `HANDSTER`. Hier waren de meeste enthousiast over. Ook heb ik hier tips voor verdere iteraties meegekregen. Nader inzien vind ik dit zelf een goede keuze en zie ik mogelijkheden hierop te door te itereren.

Na het selecteren van mijn Handster concept, ben ik verder gaan zoeken naar interessante API's. Ik ben hier een aantal API's tegen gekomen voor zowel zinnen als woorden. Langzamerhand begon ik de bijbehorende data toch wel te simpel te vinden. Ik bedacht me toen dat teamgenoot Roy een tip had gegeven om eventueel een quiz API aan het concept toe te voegen. Ik had eerder met een quiz API gewerkt en deze data voelde als een betere aanvulling op mijn concept. Hierbij moest ik wel mijn huidige **HANDSTER** concept aanpassen.

</details>

## Final concept: QuickTriv

Mijn uiteindelijke concept wordt hiermee QuickTriv. Een mulit-player real-time quiz spel. Twee spelers krijgen vijf random vragen die zij kunnen beantwoorden d.m.v. multiple choice. De persoon die als eerst het correcte antwoord geeft wint de ronde en verdient daarbij een punt. Bij een foutief antwoord gaat het punt naar de andere speler. Er worden vijf rondes gespeeld om tot een winnaar te komen.

| **Login weergave**                                                                                            | **Spel weergave**                                                                                                                                                                                                                                                 | **\*Resultaat weergave**                                                                                 |
| :------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| [![image.png](https://i.postimg.cc/RF4YKKMY/image.png)](https://postimg.cc/Mc3t8cf0)                          | [![20210413-114349.jpg](https://i.postimg.cc/2yHJwM1L/20210413-114349.jpg)](https://postimg.cc/8f6tkyBT)                                                                                                                                                          | [![20210413-114516.jpg](https://i.postimg.cc/ydy2JkBP/20210413-114516.jpg)](https://postimg.cc/gXrgQcxX) |
| Op deze pagina kan een speler zich aanmelden voor een sessie door een **username & room number** op te geven. | Op deze pagina worden de vragen en bijbehorende antwoorden getoond. De Leaderboard (rechts) toont de deelnemende spelers met de bijbehorende punten. Aan de linkerkant kun je de huidige ronde zien. En aan de onderkant van de pagina heb je de antwoordknoppen. | De resultaten pagina weergeeft de winnaar van het spel weer.                                             |

## Installatie

**#1. clone de repo**

    https://github.com/randy554/real-time-web-2021.git

**#2. Navigeer naar de root van de app**

    cd real-time-web-2021

**#3. Installeer de benodigde paketten die in de package.json staan**

    npm install

**#4. Start server**

    npm run dev

**#5. Bekijk site**

    http://localhost:2021

## Data life cycle

<details>
           
[![dlcv1.png](https://i.postimg.cc/SxdK9hp6/dlcv1.png)](https://postimg.cc/nXsZ8Nrr)
<summary>DLC v1</summary>   
</details>

<details>
       
[![Real-time-web-Quick-Triv-Diagram4.png](https://i.postimg.cc/BQCX0KD4/Real-time-web-Quick-Triv-Diagram4.png)](https://postimg.cc/F779b1DB)
<summary>DLC v2</summary>
</details>

Final DLC

[![Final-DLC.png](https://i.postimg.cc/4yL3RVbF/Final-DLC.png)](https://postimg.cc/xNmQKkZK)

## Real-time events


* `join room` Controleert of er nog ruimte is voor een speler in de room, voegt speler aan room DB toe.
* `socket.join` Een speler wordt toegevoegd aan room.
* `enter room` Redirect speler naar pagina als er ruimte is zo niet geeft bericht door aan gebruiker.
* `quiz content` Pakt juist data voor speler en verstuurt deze naar de client. Kent ook de juiste punt toe aan speler.
* `send answer` Verstruurt antwoordkeuze van speler.
* `quiz result` Maakt opsomming van het eindresultaat van spel en verstuurt deze naar de spelers.
* `end game` Speler geeft aan dat zij het spel verlaten. Hiermee wordt vervolgends hun data in de db geleegd.

## Eigen cheat sheet

In het begin van het vak had ik voor mijzelf een eigen cheat sheet gemaakt. Hierdoor heb ik de meest voorkomende events sneller onder de knie kunnen krijgen. 

```javascript
/* ------ My socket.io cheat sheet ------ */

// ******* SERVER SIDE ******* //

/* io.on('connection')
 |------------------------------------------------------
 | Establishes a socket connection with clients. 
 | 'connection' arg is a reserved keyword.
 |------------------------------------------------------
*/

/* io.emit('exampleKeyWord')
 |------------------------------------------------------
 | Sends a socket message to all connected clients
 | 
 |------------------------------------------------------
*/

/* socket.on('disconnect')
 |------------------------------------------------------
 | Listens to clients leaving/loosing connection to
 | the socket.
 |'disconnect' arg is a reserved keyword.
 |------------------------------------------------------
*/

/* socket.on('exampleKeyWord')
 |------------------------------------------------------
 | Listens to socket events with e.g. the 
 | 'exampleKeyWord' arg.
 |------------------------------------------------------
*/

/* socket.emit('exampleKeyWord')
 |------------------------------------------------------
 | Sends a socket message to a specific connected  
 | client.
 |------------------------------------------------------
*/

/* socket.broadcast.emit('exampleEvent', 'Hello all!')
 |------------------------------------------------------
 | Sends a socket message to a all clients listening on  
 | the 'exampleEvent' event, except the sender.
 |------------------------------------------------------
*/

/* socket.join('exampleRoom')
 |------------------------------------------------------
 | Join a client to the 'exampleRoom' room.  
 | 
 |------------------------------------------------------
*/

/* socket.to('exampleRoom').emit('Hello people in room')
 |------------------------------------------------------
 | Say hello to all the clients in the 'exampleRoom'  
 | room.
 |------------------------------------------------------
*/
```

## Session

Voor mijn app ik voor het eerst gebruik gemaakt van sessions in Node. Dit heb ik door middel van de express-session en memorystor packages kunnen doen.
Ik had deze namelijk nodig voor het onthouden van de gebruiker na het redirecten naar een andere pagina.

[![session.png](https://i.postimg.cc/nhHjBBns/session.png)](https://postimg.cc/jLFSrWwK)

Bij een request wordt er gekeken in de middelware of er een wijziging is in de session object, als dat
het geval is dan wordt de huidige session_id die is gegenereerd bij het doen van de request,
opgeslagen in de geheugen (memorystore) en wordt er een cookie gemaakt bij de client.

## NPM packages


Dit project maakt gebruik van de volgende packages:

- Express
- Socket.io
- Express-session
- Memorystore
- Html-entities
- Ejs
- Dotenv
- Node-fetch



## API

De app maakt gebruik van de [Trivia API](https://opentdb.com/api_config.php). De response data is <strong>JSON</strong>. Er kan gebruik worden gemaakt van een SESSION TOKEN. Deze zorgt ervoor dat gedurende de sessie alleen maar unieke vragen worden terug gestuurd. De sessie doet 6 uur. Verder kan de API zonder key worden gebruikt. Er is in de documentatie helaas niks te
vinden over limiet van API gebruik.

De API biedt de mogelijkheid om tussen de 1 en 50 Trivia vragen te terug te krijgen. Deze vragen kunnen gaan over verschillende categoriën zoals politiek & geschiedenis. Verder kun je de moeilijkheidsgraad van de vragen aanpassen op easy, medium en hard. Ook kan er gekozen worden om multiple choice antwoorden of boolean antwoorden te ontvangen.

```javascript
`https://opentdb.com/api.php?amount=5&type=multiple`;
```

**Response data:**

[![trivia-API.png](https://i.postimg.cc/wjWF43jj/trivia-API.png)](https://postimg.cc/nXDvCFmy)

## Bronnen

- [ExpressJS](https://expressjs.com/)
- [Socket.io](https://socket.io/get-started/chat/)
- [Socket.io cheatsheet](https://socket.io/docs/emit-cheatsheet/)

## Licentie

Creative Commons Attribution-ShareAlike 4.0 International Link
