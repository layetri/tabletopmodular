## Deliverables CSD2D-1
Deliverables for the course CSD2D. These will be mostly in Dutch.

#### MoSCoW
**Must**: het eindproduct moet een _multiplayer_ geluidservaring bieden. Er moeten meerdere modules aanwezig zijn waar gebruikers uit kunnen kiezen, en deze moeten met elkaar verbonden kunnen worden.

**Should**: het is wenselijk dat het eindproduct een samenhangende UI heeft.

**Could**: het zou fijn zijn als gebruikers aan een kamer mee kunnen doen door een QR-code te scannen of naar een speciale URL te gaan. Daarnaast zou het goed zijn om in plaats van een betaalde WebSockets service (Pusher) zelf een instantie van LaravelEchoServer te hosten (is wel veel gedoe).

**Won't**: voorlopig zal het niet mogelijk zijn om gemaakte patches op te slaan en te laden. Verder zullen er geen presets zijn, en ook het maken van een native app staat niet op de agenda.


#### Vragen
- _Wanneer is een muzikale interactie playful / speels?_<br>
    Een muzikale interactie kan op meerdere manieren speels zijn. In mijn ontwerp heb ik gekozen voor interactie tussen meerdere spelers, omdat dit het best past bij het idee wat de aanleiding was voor het komen tot dit eindproduct.
    
- _Hoe blijft een interactie playful én uitdagend op de lange termijn?_<br>
    Dit kan zijn onvoorspelbare factoren. De onvoorspelbare factoren in deze interactie zijn de andere gebruikers. Door de interactie tussen spelers is het moeilijk te voorspellen hoe de uiteindelijke klank zal klinken.
    
- _Wordt de muziek direct getriggerd / aangepast, of gebeurt dit geleidelijk en minder opvallend?_<br>
    De interactie met het geluid is direct. De gebruiker bestuurt een virtuele synthesizermodule.
    
- _Voor wie is de app bedoeld?_<br>
    De app is bedoeld voor iedereen met een telefoon of tablet. De bedoeling is hierbij dat mensen met een groep samen een instrument kunnen bespelen. Het liefst fysiek in één ruimte, maar in deze tijden is het spel ook prima online te spelen.
    
- _Wanneer is het klinkende resultaat muzikaal interessant (denk hierbij ook aan je doelgroep)?_<br>
    Het is zeker mogelijk om een muzikaal interessant resultaat te bereiken. Voor de meeste mensen in de doelgroep denk ik dat de interactie en de ervaring van het gezamenlijk een klank ontwerpen echter belangrijker en interessanter is dan de daadwerkelijke klank.

#### Het prototype
Het prototype bevat de basis van de interactie zoals ik die in mijn concept bedoeld had. Gebruikers kunnen kiezen uit verschillende modules, en deze online interactief samen bespelen. In mijn prototype heb ik de volgende modules geïmplementeerd: oscillator, filter, feedbackdelay, sequencer. Deze modules kunnen op verschillende manieren met elkaar verbonden worden. Verder kan de gebruiker kiezen om het eindresultaat wel of niet op diens apparaat te beluisteren. Dit is vooral handig in het geval dat fysiek wordt samengespeeld.

Alle modules zijn implementaties van een Module superclass. Dit maakt het makkelijk om in de toekomst nieuwe modules toe te voegen. Daarnaast biedt het ook de mogelijkheid om templates aan te bieden waarmee third-party developers modules kunnen maken.

Een andere functie die ik graag in de toekomst wil voegen is het opslaan en laden van patches en presets. Hierdoor zou het voor gebruikers zonder muzikale achtergrond makkelijker worden om tot een interessant klankresultaat te komen.