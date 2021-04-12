# MOOD Chat app

## Live demo
[Live demo](https://a-realtime-chatapp.herokuapp.com/)

## Inhoud

* [Live demo](#live-demo)
* [Concept](#concept)
* [Installatie](#installatie)
* [Bericht types](#bericht-types)
* [API](#API)
* [Bronnen](#bronnen)
* [Licentie](#licentie)


## Concept

Dit is een real-time chat app die gebouwd is met de [socket.io](https://socket.io/) library.
Met deze chat app, is het mogelijk om gifjes naar elkaar te sturen a.d.h.v. zogenaamde "mood-words". Dit zijn een reeks
aantal woorden (met :prefix) waaruit gekozen kan worden. Dit gaat bijv. zo:

Bericht:

    Vandaag voel ik me super :happy

## Installatie

```javascript
 
  #1. clone de repo
  https://github.com/randy554/real-time-web-2021.git

  #2. Navigeer naar de root van de app
  cd real-time-web-2021

  #3. Installeer de benodigde paketten die in de package.json staan
  npm install

  #4. Start server
  npm run dev

  #5. Bekijk site
  http://localhost:2021

```

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

> `https://api.giphy.com/v1/gifs/random?api_key={API_KEY_HERE}&tag={TAG_HERE}&rating={RATING_HERE}`


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
