const choices = ["sten", "sax", "påse"]; // List of possible choices

// Function to set a cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Function to get a cookie value by name
function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Initialize scores from cookies or set default to 0
let scoreW = parseInt(getCookie("scoreW")) || 0;
let scoreL = parseInt(getCookie("scoreL")) || 0;
let scoreD = parseInt(getCookie("scoreD")) || 0;

// Get display elements from the DOM
const spelareDisplay = document.getElementById("spelareDisplay");
const datorDisplay = document.getElementById("datorDisplay");
const resultatDisplay = document.getElementById("resultatDisplay");
const resultatW = document.getElementById("resultatW");
const resultatL = document.getElementById("resultatL");
const resultatD = document.getElementById("resultatD");

// Function to generate a random computer choice
function getRandomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Function to update the score and save to cookies
function scoreUpdate(resultat) {
  if (resultat === "DU VANN!") {
    scoreW++;
    setCookie("scoreW", scoreW, 1); // Save wins to cookies
  } else if (resultat === "DU FÖRLORADE!") {
    scoreL++;
    setCookie("scoreL", scoreL, 1); // Save losses to cookies
  } else {
    scoreD++;
    setCookie("scoreD", scoreD, 1); // Save draws to cookies
  }
}

// Function to display the result and score
function displayResult(spelareVal, datorVal, result) {
  spelareDisplay.innerHTML = `Du valde: ${spelareVal}`;
  datorDisplay.innerHTML = `Datorn valde: ${datorVal}`;
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
