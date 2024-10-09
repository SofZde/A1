const choices = ["sten", "sax", "påse"]; // List of possible choices

// Get display elements from the documents
const spelareDisplay = document.getElementById("spelareDisplay");
const datorDisplay = document.getElementById("datorDisplay");
const resultatDisplay = document.getElementById("resultatDisplay");
const resultatW = document.getElementById("resultatW");
const resultatL = document.getElementById("resultatL");
const resultatD = document.getElementById("resultatD");

// Function to set a cookie
function setCookie(cName, cValue, exDays) {
  const d = new Date();
  d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
}

// Function to get a cookie value by name
function getCookie(cName ) {
  const name = cName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim(); // takes away unnecessary spaces
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// gets scores from cookies, if they do not exist the value is set to 0.
let scoreW = parseInt(getCookie("scoreW")) || 0;
let scoreL = parseInt(getCookie("scoreL")) || 0;
let scoreD = parseInt(getCookie("scoreD")) || 0;


// Function to generate a random computer choice from array choices
function getRandomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Function to update the score and save to cookies
function scoreUpdate(resultat) {
  if (resultat === "DU VANN!") {
    scoreW++;
    setCookie("scoreW", scoreW, 30); // Save wins to cookies
  } else if (resultat === "DU FÖRLORADE!") {
    scoreL++;
    setCookie("scoreL", scoreL, 30); // Save losses to cookies
  } else {
    scoreD++;
    setCookie("scoreD", scoreD, 30); // Save draws to cookies
  }
}

// Function to display the result and score
function displayResult(spelareVal="", datorVal="", result="") {
  spelareDisplay.innerHTML = spelareVal ? `SPELARE: ${spelareVal}` : "SPELARE";
  datorDisplay.innerHTML = datorVal? `DATOR: ${datorVal}` : "DATOR";



  resultatDisplay.innerHTML = result;
  resultatW.innerHTML = `Antal vinster: ${scoreW}`;
  resultatL.innerHTML = `Antal förluster: ${scoreL}`;
  resultatD.innerHTML = `Antal oavgjorda: ${scoreD}`;
}

// Function to play the game
function playGame(spelareVal) {
  const datorVal = getRandomChoice();
  let result;

  // Determine the result
  if (spelareVal === datorVal) {
    result = "Oavgjort!";
  } else if (
    (spelareVal === "sten" && datorVal === "sax") ||
    (spelareVal === "sax" && datorVal === "påse") ||
    (spelareVal === "påse" && datorVal === "sten")
  ) {
    result = "DU VANN!";
  } else {
    result = "DU FÖRLORADE!";
  }

  // Update the score based on the result
  scoreUpdate(result);

  // Display the updated result and score
  displayResult(spelareVal, datorVal, result);
}
displayResult();
