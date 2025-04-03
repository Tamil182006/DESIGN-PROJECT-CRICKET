let count = 0;
let oversLimit; // Store the maximum overs limit
let totalScore = 0;
let wickets = 0;
let overs = 0;
let balls = 0;
let batsmanOnStrike = "Batsman 1";
let batsmanNonStrike = "Batsman 2";

function playerName(team) {
    let plnum = document.getElementById(`playernum-${team}`);
    let container = document.getElementById(`plname${team === 'team1' ? '1' : '2'}`);
    let plvalue = parseInt(plnum.value);

    if (isNaN(plvalue) || plvalue <= 0) {
        alert("Please enter a valid number of players.");
        return;
    }

    // Hide the input field and button after submission
    plnum.style.display = "none";
    let existingButton = container.querySelector("button");
    if (existingButton) existingButton.style.display = "none";

    let nameInputs = [];
    for (let i = 0; i < plvalue; i++) {
        let plinput = document.createElement("input");
        plinput.classList.add("player-name-input");
        plinput.placeholder = `Enter Player ${i + 1} Name`;
        plinput.classList.add("player-input");
        container.appendChild(plinput);
        nameInputs.push(plinput);
        container.appendChild(document.createElement("br"));
    }

    let submitBtn = document.createElement("button");
    submitBtn.textContent = "SUBMIT";
    submitBtn.classList.add("btn1", "submit-btn");
    submitBtn.style.margin = "10px";
    container.appendChild(submitBtn);

    submitBtn.addEventListener("click", function () {
        let playerNames = nameInputs.map(input => input.value.trim()).filter(name => name !== "");

        if (playerNames.length === plvalue) {
            if (team === 'team1') {
                document.getElementById("batsmanOnStrike").innerText = playerNames[0]; 
                document.getElementById("batsmanNonStrike").innerText = playerNames[1] || "Batsman 2"; 
            }

            // Hide input fields after submitting names
            container.style.display = "none"; 
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
        // Check overs limit
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
        // Check overs limit
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
