let count = 0;
let oversLimit;
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

    plnum.style.display = "none";
    let existingButton = container.querySelector("button");
    if (existingButton) existingButton.style.display = "none";

    let nameInputs = [];

    for (let i = 0; i < plvalue; i++) {
        let plinput = document.createElement("input");
        plinput.classList.add("player-name-input", "player-input");
        plinput.placeholder = `Enter Player ${i + 1} Name`;
        container.appendChild(plinput);
        nameInputs.push(plinput);
        container.appendChild(document.createElement("br"));
    }

    let submitBtn = document.createElement("button");
    submitBtn.textContent = "FINAL SUBMIT";
    submitBtn.classList.add("btn1", "submit-btn");
    submitBtn.style.margin = "10px";
    container.appendChild(submitBtn);

    // ✅ FINAL SUBMIT button logic
    submitBtn.addEventListener("click", function () {
        let playerNames = nameInputs.map(input => input.value.trim()).filter(name => name !== "");
        let teamNameInput = document.getElementById(`${team}-name`);
        let teamname = teamNameInput ? teamNameInput.value.trim() : "";

        if (!teamname || playerNames.length !== plvalue) {
            alert("Please enter the team name and all player names.");
            return;
        }

        // ✅ Send data to backend
        fetch("http://localhost:3000/add-team", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team: team,            // 'team1' or 'team2'
                teamName: teamname,    // 'rcb', 'csk', etc.
                players: playerNames,  // ['virat', 'abd']
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log("✅ Server response:", data);
        })
        .catch(err => {
            console.error("❌ Error sending to server:", err);
        });

        // ✅ UI updates after submission
        if (team === 'team1') {
            document.getElementById("batsmanOnStrike").innerText = playerNames[0];
            document.getElementById("batsmanNonStrike").innerText = playerNames[1] || "Batsman 2";
            document.getElementById("a").style.display = "none";
        } else if (team === 'team2') {
            document.getElementById("a1").style.display = "none";
        }
    });
}

// ✅ Get overs input from user and set the limit
let input1 = document.getElementById("inp");
if (input1) {
    input1.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            oversLimit = parseInt(input1.value);
            document.getElementById("ov").style.display = "none";
            input1.style.display = "none";
            document.getElementById("total-overs").textContent = `(${oversLimit})`;
        }
    });
}

// ✅ Update the scoreboard
function updateScoreboard() {
    document.getElementById("totalScore").innerText = totalScore;
    document.getElementById("wickets").innerText = wickets;
    document.getElementById("overs").innerText = overs;
    document.getElementById("balls").innerText = balls;
    document.getElementById("batsmanOnStrike").innerText = batsmanOnStrike;
    document.getElementById("batsmanNonStrike").innerText = batsmanNonStrike;
}

// ✅ Run scorer logic
function scoreRun(runs) {
    if (wickets < 10 && overs < oversLimit) {
        totalScore += runs;
        balls++;

        if (balls >= 6) {
            overs++;
            balls = 0;
        }

        if (runs % 2 !== 0) {
            [batsmanOnStrike, batsmanNonStrike] = [batsmanNonStrike, batsmanOnStrike];
        }
    }

    updateScoreboard();
}

// ✅ Handle wicket
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

document.getElementById("wicketButton").addEventListener("click", wicketFall);
