# QuickTriv

## Live demo
under construction...

## Inhoud

* [Live demo](#live-demo)
* [Concept](#concept)
* [Installatie](#installatie)
* [Bericht types](#bericht-types)
* [API](#API)
* [Bronnen](#bronnen)
* [Licentie](#licentie)


## Concept

| **HANDSTER** | **QUICK EYES!** | ## FOOTY-WHO? |
| :--- | :--- | :--- |
| [![20210413-030702.jpg](https://i.postimg.cc/Y0VL8Y4M/20210413-030702.jpg)](https://postimg.cc/sGY2gB9N) | [![20210412-224038.jpg](https://i.postimg.cc/dQSCqP5p/20210412-224038.jpg)](https://postimg.cc/dDr3BXPj) | [![20210412-224021.jpg](https://i.postimg.cc/7hbTgmZK/20210412-224021.jpg)](https://postimg.cc/sGdXzPSW)  |


##  HANDSTER

Spelers krijgen een woord te zien, de uitdaging is om dit woord correct en zo snel mogelijk over te typen. De speler die als eerst het  woord correct typt verdient een punt. Na x aantal woorden wordt er een winnaar gekozen op basis van de meest aantal punten.



## QUICK EYES!

Spelers krijgen per ronde 9 afbeeldingen te zien. Van de 9 afbeeldingen zijn een aantal afbeeldingen van een bepaalde thema, zoals voetbal. De spelers moeten van deze thema alle afbeeldingen zo snel mogelijk eruit weten te filteren. De speler wie daar het snelst mee is wint de ronde en verdient een punt. Na x aantal rondes wordt er een winnar gekozen op basis van de meest aantal punten.



## FOOTY-WHO?

Per ronde krijgt iedere speler een afbeelding met wat gegevens van een voetbalspeler te zien. De overige spelers moeten aan de hand van de omschrijving van de **geselecteerde speler** kunnen raden wie de speler is. Mocht dit niet lukken met de omschrijvingen van de geselecteerde speler binnen een bepaalde tijdbestek, dan wordt er een multiple choice aan antwoorden getoond. De persoon die deze als eerste selecteert wint de ronde. Na x aantal rondes wordt er een winnar gekozen op basis van de meest aantal punten.


### QuickTriv

Ik wist aanvankelijk van mijn brainstormsessie dat ik snelheid als element wilde hebben in mijn concepten. Dit is met mijn drie ideeën denk ik aardig gelukt. Het was achteraf best lastig om een keuze te maken. Ik heb mijn concepten uiteindelijk tijdens de standup aan de rest van groep voorgelegd, om een voorkeur aan te geven. De voorkeur ging voornamelijk naar het concept `HANDSTER`. Hier waren de meeste enthousiast over. Ook heb ik hier tips voor verdere iteraties meegekregen. Nader inzien vind ik dit zelf een goede keuze en zie ik mogelijkheden hierop te door te itereren. 

Na het selecteren van mijn Handster concept, ben ik verder gaan zoeken naar interessante API's. Ik ben hier een aantal API's tegen gekomen voor zowel zinnen als woorden. Langzamerhand begon ik de bijbehorende data toch wel te simpel te vinden. Ik bedacht me toen dat teamgenoot Roy een tip had gegeven om eventueel een quiz API aan het concept toe te voegen. Ik had eerder met een quiz API gewerkt en deze data voelde als een betere aanvulling op mijn concept. Hierbij moest ik wel mijn  huidige **HANDSTER** concept aanpassen. 


#### Final concept

Mijn uiteindelijke concept wordt hiermee QuickTriv. Een mulit-player real-time quiz spel. Twee spelers krijgen vijf random vragen die zij kunnen beantwoorden d.m.v. multiple choice. De persoon die als eerst het correcte antwoord geeft wint de ronde en verdient daarbij een punt. Bij een foutief antwoord gaat het punt naar de andere speler. Er worden vijf rondes gespeeld om tot een winnaar te komen.


| **LOGIN weergave** | **SPEL weergave** | ***RESULTAAT weergave** |
| :--- | :--- | :--- |
| [![image.png](https://i.postimg.cc/RF4YKKMY/image.png)](https://postimg.cc/Mc3t8cf0) | [![20210413-114349.jpg](https://i.postimg.cc/2yHJwM1L/20210413-114349.jpg)](https://postimg.cc/8f6tkyBT) | [![20210413-114516.jpg](https://i.postimg.cc/ydy2JkBP/20210413-114516.jpg)](https://postimg.cc/gXrgQcxX)  |
|Op deze pagina kan een speler zich aanmelden voor een sessie door een **username & room number** op te geven| Op deze pagina worden de vragen en bijbehorende antwoorden getoond. De Leaderboard (rechts) toont de deelnemende spelers met de bijbehorende punten. Aan de linkerkant kun je de huidige ronde zien. En aan de onderkant van de pagina heb je de antwoordknoppen | De resultaten pagina weergeeft de winnaar van het spel weer. |



## Installatie

 
> #1. clone de repo
    
    https://github.com/randy554/real-time-web-2021.git

> #2. Navigeer naar de root van de app 

    cd real-time-web-2021

> #3. Installeer de benodigde paketten die in de package.json staan
     
    npm install

    #4. Start server
    npm run dev

    #5. Bekijk site
    http://localhost:2021


## Bericht types

#### Client
* `chat message` verstuur een normale bericht naar andere mensen in de chat.
* `no input` verstuur een melding naar de server dat je een lege formulier hebt gesubmit.

#### Server
* `server message` verstuur bericht naar alle andere mensen in de chat dat een persoon de chat heeft verlaten. 


## Data life cycle

![image](https://user-images.githubusercontent.com/57792277/114358413-2f2db100-9b73-11eb-9b6d-45ba85d21cf0.png)

## API

Om aan gifjes te kunnen komen maak ik gebruik van de [GIPHY API](https://developers.giphy.com/docs/api#quick-start-guide). Na het aanmaken van een gratis developer account, ontvang je een `KEY` om met de **GIPHY API** aan de slag te kunnen. Via de [Random Endpoint](https://developers.giphy.com/docs/api/endpoint/#random) kun je één random gif ontvangen d.m.v. een `tag`. Dit zijn inclusief de tag, de benodigdheden om een call te doen naar de **Random API Endpoint**:

```javascript
`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY_HERE}&tag=${TAG_HERE}&rating=${RATING_HERE}`
```

* API_KEY_HERE

De sleutel die je ontvangen hebt bij het maken van je developer account.

* TAG_HERE

De tag is het onderwerp waarover jij een geretalteerde gif wil ontvangen.

* RATING_HERE

Door middel van deze parameter kun je filteren op de type content die je wilt ontvangen. Met parameter `G` bijv. ga je voor de meest veilige content op gipy. Zie [hier](https://developers.giphy.com/docs/optional-settings/#rating) de andere content levels op giphy.



## Bronnen

 * [ExpressJS](https://expressjs.com/)
 * [Socket.io](https://socket.io/get-started/chat/)
 * [Socket.io cheatsheet](https://socket.io/docs/emit-cheatsheet/)



## Licentie

Creative Commons Attribution-ShareAlike 4.0 International Link
