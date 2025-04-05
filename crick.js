let count = 0;
let oversLimit; // Store the maximum overs limit
let totalScore = 0;
let wickets = 0;
let overs = 0;
let balls = 0;
let batsmanOnStrike = "Batsman 1";
let batsmanNonStrike = "Batsman 2";

function playerName(team) {
    // Get the number input field based on team
    let plnum = document.getElementById(`playernum-${team}`);
    // Get the container where player input fields will be appended
    let container = document.getElementById(`plname${team === 'team1' ? '1' : '2'}`);
    let plvalue = parseInt(plnum.value); // Parse number of players

    if (isNaN(plvalue) || plvalue <= 0) {
        alert("Please enter a valid number of players.");
        return;
    }

    // Hide the number input and original submit button
    plnum.style.display = "none";
    let existingButton = container.querySelector("button");
    if (existingButton) existingButton.style.display = "none";

    let nameInputs = [];

    // Dynamically create input fields for each player
    for (let i = 0; i < plvalue; i++) {
        let plinput = document.createElement("input");
        plinput.classList.add("player-name-input", "player-input");
        plinput.placeholder = `Enter Player ${i + 1} Name`;
        container.appendChild(plinput);
        nameInputs.push(plinput);
        container.appendChild(document.createElement("br"));
    }

    // Create the FINAL SUBMIT button
    let submitBtn = document.createElement("button");
    submitBtn.textContent = "FINAL SUBMIT";
    submitBtn.classList.add("btn1", "submit-btn");
    submitBtn.style.margin = "10px";
    container.appendChild(submitBtn);

    // FINAL SUBMIT button logic
    submitBtn.addEventListener("click", function () {
        let playerNames = nameInputs.map(input => input.value.trim()).filter(name => name !== "");

        if (playerNames.length === plvalue) {
            if (team === 'team1') {
                document.getElementById("batsmanOnStrike").innerText = playerNames[0];
                document.getElementById("batsmanNonStrike").innerText = playerNames[1] || "Batsman 2";
                document.getElementById("a").style.display = "none"; // Hides team 1 section
            } else if (team === 'team2') {
                document.getElementById("a1").style.display = "none"; // Hides team 2 section
            }
        } else {
            alert("Please enter names for all players.");
        }
    });
}
// Get overs input from user and set the limit
let input1 = document.getElementById("inp");
if (input1) {
    input1.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            oversLimit = parseInt(input1.value); // Convert input to number
            document.getElementById("ov").style.display = "none";
            input1.style.display = "none";
            document.getElementById("total-overs").textContent = `(${oversLimit})`;
        }
    });
}

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
    if (wickets < 10 && overs < oversLimit) {
        totalScore += runs;
        balls++;

        if (balls >= 6) {
            overs++;
            balls = 0;
        }

        // Rotate strike for odd runs
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
    if (wickets < 10 && overs < oversLimit) {
        wickets++;
        balls++;

        if (balls >= 6) {
            overs++;
            balls = 0;
        }

        if (wickets < 10) {
            batsmanOnStrike = `Batsman ${wickets + 1}`;
        } else {
            alert("All out!");
        }
    }

    updateScoreboard();
}

// Add an event listener to the "Wicket Falls" button
document.getElementById("wicketButton").addEventListener("click", wicketFall);
