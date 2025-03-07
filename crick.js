let count = 0;

function playerName() {
  if (count >= 11) return; // Stop at 11 players

  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = `Enter Player ${count + 1} Name`;
  input.style.margin = "10px";
  input.classList.add("player-input");

  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && count < 10) {
      playerName();
    }
  });

  document.getElementById("plname1").appendChild(input);
  count++;

  if (count === 11) {
    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.classList.add("btn", "submit-btn"); // Add both classes
    submitBtn.style.margin = "10px";
    document.getElementById("plname1").appendChild(submitBtn);
}

// **Event delegation: Detect click on submit button**
document.getElementById("plname1").addEventListener("click", function(event) {
  if (event.target.classList.contains("submit-btn")) {  
    document.getElementById("plname1").style.display = "none"; 
  }

});
}


 
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

//Adding input



