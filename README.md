# MOOD Chat app

## Live demo
[Live demo](https://a-realtime-chatapp.herokuapp.com/)

## Inhoud

* [Live demo](#live-demo)
* [Concept](#concept)
* [Installatie](#installatie)
* [Bericht types](#bericht-types)
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


## Bronnen

 * [ExpressJS](https://expressjs.com/)
 * [Socket.io](https://socket.io/get-started/chat/)
 * [Socket.io cheatsheet](https://socket.io/docs/emit-cheatsheet/)



## Licentie

Creative Commons Attribution-ShareAlike 4.0 International Link
