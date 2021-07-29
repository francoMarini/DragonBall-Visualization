# Dragonball-StoryVisualization
Progetto finale di Visualizzazione delle Informazioni, svolto da **Franco Marini** e **Andrea Marrocco**, studenti del corso di Laurea Magistrale in Ingegneria Informatica presso l'Università di Roma Tre.


## Specifica del progetto
*Per la realizzazione di questo progetto abbiamo scelto come dominio applicativo il famoso manga di **Dragon Ball**: la serie animata trasmessa in Italia a partire dai primi anni del 2000, ha segnato l’infanzia dei ragazzi della nostra generazione.*

<img src="https://github.com/AndreaEv18/Dragonball-StoryVisualization/blob/main/DB%20Family.jpg" width="800" />

Amanti del manga, prima di iniziare ad implementare il progetto, abbiamo pensato a quali potevano essere le informazioni più interessanti da prendere in considerazione per avere un quadro generale sulla storia.

Innanzitutto abbiamo pensato di mettere a disposizione dell’utente una ricerca basata sul personaggio: ciascun character che compare nel manga, indifferentemente se protagonista, personaggio secondario o evoluzione, viene modellato come un nodo all’interno di un grafo.

Dunque, a partire da ciascun personaggio è possibile:

* Osservare i rapporti con gli altri personaggi, attraverso i link che partono dal nodo corrispondente.
In particolari abbiamo deciso di raffigurare 5 diverse tipologie di relazioni: *trasformazioni, alleanze, familiari, combattimenti e creazioni*.

*	Stabilire se appartiene ad una particolare categoria.
Abbiamo suddiviso i personaggi in: *androidi, namecciani, saiyans, draghi e fusioni*. \
Un personaggio potrebbe anche non appartenere a nessuno di queste categorie, in tal caso il nodo corrispondente verrà circondato da un contorno grigio.
Mentre nel caso in cui appartenesse ad una categoria specifica, sarà caratterizzato da un contorno con il colore tipico.

* Stabilire in quale Saga compare per la prima volta: posizionandoci su un particolare nodo, a fianco verrà mostrata una scritta che mostra questa informazione.
Le saghe che compongono la storia sono 4, in ordine cronologico abbiamo: *Saiyan Saga , Frieza Saga, Cell Games Saga, Majin Buu Saga*.


L’utente posizionandosi sopra al nodo con il cursore, può osservare tutte le informazioni precedentemente elencate. Ma non è tutto.

Infatti abbiamo anche fornito la possibilità di scegliere quali tipologie di relazioni mostrare e quali no, attraverso un’apposita legenda situata a destra del grafo.
Ogni volta che viene aggiunta o rimossa un particolare tipo di collegamento, il grafo verrà ricalcolato: in questo modo nel caso in cui si avranno meno relazioni da rappresentare, il grafo risulterà più chiaro e sarà più semplice identificare l’informazione di cui abbiamo bisogno.

Inoltre, grazie all’utilizzo di alcuni bottoni, l’utente può osservare per ciascuna categoria quali sono i personaggi che ne appartengono: mantenendo premuto il bottone infatti, verranno messi in evidenza solo i nodi relativi alla classe corrispondente.




## Sviluppo in locale
Per visualizzare correttamente il progetto, è necessario creare un server locale sulla directory di lavoro. \
Una volta posizionati nella cartella corrente, eseguire da terminale il seguente comando:
```
python3 -m http.server PORTA
```
Dopodiché è necessario aprire il browser e digitare:
```
http://localhost:PORTA
```
sostituendo *'PORTA'* con il numero della porta che si vuole utilizzare.


## Versione utilizzata
La versione di **d3.js** utilizzata è la *v3*.

## Browser testati
Il progetto è stato testato e viene visualizzato correttamente sui seguenti browser:
- **Google Chrome**, Versione 91.0.4472.77 (Build ufficiale) (a 64 bit)
- **Microsoft Edge**, Versione 91.0.864.41 (Build ufficiale) (64 bit)

## Anteprima
<img src="https://i.ibb.co/WBDF1QJ/anteprima3.jpg" width="900" />
