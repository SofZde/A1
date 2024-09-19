const val = ["sten", "sax", "påse"]; //min lista med arrays (olika val)
let scoreW = 0; let scoreL = 0;let scoreD = 0; // To print scoreboard

//get display elements :

const spelareDisplay = document.getElementById("spelareDisplay");
const datorDisplay = document.getElementById("datorDisplay");
const resultatDisplay = document.getElementById("resultatDisplay");
const resultatW = document.getElementById("resultatW");
const resultatL = document.getElementById("resultatL");
const resultatD = document.getElementById("resultatD");

// skapa funktion för random indexplats i val (datorns val)
function getRandomVal()
{
  return val[Math.floor(Math.random() * val.length)]; // val.lenght = antal indexplatser i listan.

}
// skapa en funktion för att uppdatera resultatet(score) efter varje runda.
function scoreUpdate(resultat)
{
  if(resultat === "DU VANN!")
  {
    ++scoreW;
  }
  else if(resultat === "DU FÖRLORADE!")
  {
    ++scoreL;
  }
  else
  {
    ++scoreD;
  }

}


// skapa en funktion som displayar val, resultat och score.
function displayResultat(spelareVal, datorVal, resultat)
{
  spelareDisplay.textContent = `SPELARE: ${spelareVal}`; // spelarens val = button oncklick
  datorDisplay.textContent = `DATOR: ${datorVal}`; // datornVal = get random value from list : Val
  resultatDisplay.textContent = resultat; // skapa villkor
  resultatW.textContent = `VINSTER: ${scoreW}`;
  resultatL.textContent = `FÖRLUSTER: ${scoreL}`;
  resultatD.textContent = `OAVGJORT: ${scoreD}`;


}
// skapa funktion för att spela spelet: hämta spelarens val och datorns val.
function spela(spelareVal)
{
const datorVal = getRandomVal();
let resultat ="";

const outcomes =
{
  "sten" : {"sax": "DU VANN!" , "påse" : "DU FÖRLORADE!"},
  "sax": { "påse": "DU VANN!", "sten": "DU FÖRLORADE!" },
  "påse": { "sten": "DU VANN!", "sax": "DU FÖRLORADE!" }
};
if (spelareVal=== datorVal)
{
  resultat = "OAVGJORT";
}
else
{
 resultat = outcomes [spelareVal] [datorVal];
}

  scoreUpdate(resultat);
displayResultat(spelareVal, datorVal, resultat);

}
