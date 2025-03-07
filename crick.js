let totalScore = 0;
let wickets = 0;
let overs = 0;
let balls = 0;
let batsmanOnStrike = "Batsman 1";
let batsmanNonStrike = "Batsman 2";

// Update the display
function updateScoreboard() {
  document.getElementById("totalScore").innerText = totalScore;
  document.getElementById("wickets").innerText = wickets;
  document.getElementById("overs").innerText = overs;
  document.getElementById("balls").innerText = balls;
  document.getElementById("batsmanOnStrike").innerText = batsmanOnStrike;
  document.getElementById("batsmanNonStrike").innerText = batsmanNonStrike;
}

// Function to handle scoring runs
function scoreRun(runs) {
  if (wickets < 10){
    totalScore += runs;
    balls++;
  }
  

  if (balls >= 6) {
    overs++;
    balls = 0;
  }

  // Rotate strike for odd runs
  if( wickets < 10){
     if (runs % 2 !== 0) {
    let temp = batsmanOnStrike;
    batsmanOnStrike = batsmanNonStrike;
    batsmanNonStrike = temp;
  }

  }
 
  updateScoreboard();
}

// Function to handle wicket fall
function wicketFall() {
  if ( wickets < 10){
     wickets++;
     balls++;

  }
  else [
    alert("all out")
  ]
 
  if (balls >= 6) {
    overs++;
    balls = 0;
  }
  
  // After a wicket, we assume the next batsman comes in automatically
  batsmanOnStrike = `Batsman ${wickets + 1}`;
  updateScoreboard();
} 

// Add an event listener to the "Wicket Falls" button
document.getElementById("wicketButton").addEventListener("click", wicketFall);

document.getElementById("plname").addEventListener("click", function plname1(){
  document.createElement("input");
  document.appendChild()
})

