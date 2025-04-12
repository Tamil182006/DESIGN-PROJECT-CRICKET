let count = 0;
let oversLimit;
let totalScore = 0;
let wickets = 0;
let overs = 0;
let balls = 0;

let batsmanOnStrike = "Batsman 1";
let batsmanNonStrike = "Batsman 2";
let currentBowler = "N/A";

let team1Players = [];
let team2Players = [];
let tossWinner = "";
let battingTeam = "";
let bowlingTeam = "";
let currentBatIndex = 2;

let playerStats = {};
let firstInningsStats = {};
let firstInningsScore = 0;
let currentInnings = 1;

function playerName(team) {
  let plnum = document.getElementById(`playernum-${team}`);
  let container = document.getElementById(
    `plname${team === "team1" ? "1" : "2"}`
  );
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

  submitBtn.addEventListener("click", function () {
    let playerNames = nameInputs
      .map((input) => input.value.trim())
      .filter((name) => name !== "");
    let teamNameInput = document.getElementById(`${team}-name`);
    let teamname = teamNameInput ? teamNameInput.value.trim() : "";

    if (!teamname || playerNames.length !== plvalue) {
      alert("Please enter the team name and all player names.");
      return;
    }

    fetch("http://localhost:3000/add-team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team, teamName: teamname, players: playerNames }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(" Server response:", data);
      })
      .catch((err) => {
        console.error(" Error sending to server:", err);
      });

    if (team === "team1") {
      team1Players = playerNames;
      document.getElementById("a").style.display = "none";
    } else {
      team2Players = playerNames;
      document.getElementById("a1").style.display = "none";
    }

    if (team1Players.length > 0 && team2Players.length > 0) {
      startToss();
    }
  });
}

function startToss() {
  const tossSection = document.getElementById("tossSection");
  tossWinner = Math.random() < 0.5 ? "team1" : "team2";
  const winnerName =
    tossWinner === "team1"
      ? document.getElementById("team1-name").value
      : document.getElementById("team2-name").value;
  document.getElementById(
    "tossResult"
  ).innerText = `${winnerName} won the toss!`;

  tossSection.style.display = "block";
  document.getElementById("chooseBat").onclick = () => handleTossChoice("bat");
  document.getElementById("chooseBowl").onclick = () =>
    handleTossChoice("bowl");
}

function handleTossChoice(choice) {
  if (choice === "bat") {
    battingTeam = tossWinner;
    bowlingTeam = tossWinner === "team1" ? "team2" : "team1";
  } else {
    bowlingTeam = tossWinner;
    battingTeam = tossWinner === "team1" ? "team2" : "team1";
  }

  const batPlayers = battingTeam === "team1" ? team1Players : team2Players;
  batsmanOnStrike = batPlayers[0];
  batsmanNonStrike = batPlayers[1];
  currentBatIndex = 2;

  playerStats[batsmanOnStrike] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
  playerStats[batsmanNonStrike] = { runs: 0, balls: 0, fours: 0, sixes: 0 };

  document.getElementById("batsmanOnStrike").innerText = batsmanOnStrike;
  document.getElementById("batsmanNonStrike").innerText = batsmanNonStrike;

  showBowlerDropdown();
  document.getElementById("tossSection").style.display = "none";
}

function handleTossChoice(choice) {
  if (choice === "bat") {
    battingTeam = tossWinner;
    bowlingTeam = tossWinner === "team1" ? "team2" : "team1";
  } else {
    bowlingTeam = tossWinner;
    battingTeam = tossWinner === "team1" ? "team2" : "team1";
  }

  const oversInput = document.getElementById("inp");
  const enteredOvers = parseInt(oversInput.value);

  if (isNaN(enteredOvers) || enteredOvers <= 0) {
    alert("Please enter a valid number of overs before starting the match!");
    return;
  }

  oversLimit = enteredOvers;
  oversInput.disabled = true;
  document.getElementById("ov").style.display = "none";
  document.getElementById("total-overs").textContent = `(${oversLimit})`;

  const batPlayers = battingTeam === "team1" ? team1Players : team2Players;
  batsmanOnStrike = batPlayers[0];
  batsmanNonStrike = batPlayers[1];
  currentBatIndex = 2;

  playerStats[batsmanOnStrike] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
  playerStats[batsmanNonStrike] = { runs: 0, balls: 0, fours: 0, sixes: 0 };

  document.getElementById("batsmanOnStrike").innerText = batsmanOnStrike;
  document.getElementById("batsmanNonStrike").innerText = batsmanNonStrike;

  showBowlerDropdown();
  document.getElementById("tossSection").style.display = "none";
}

function showBowlerDropdown() {
  const bowlerArea = document.getElementById("bowlerArea");
  const bowlerSelect = document.getElementById("bowlerSelect");

  bowlerArea.style.display = "block";
  bowlerSelect.innerHTML = "";

  const bowlPlayers = bowlingTeam === "team1" ? team1Players : team2Players;
  const lastFive = bowlPlayers.slice(-5);

  lastFive.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    bowlerSelect.appendChild(option);
  });

  bowlerSelect.addEventListener("change", () => {
    currentBowler = bowlerSelect.value;
    document.getElementById("currentBowler").innerText = currentBowler;
  });

  currentBowler = lastFive[0];
  bowlerSelect.value = currentBowler;
  document.getElementById("currentBowler").innerText = currentBowler;
}

const input1 = document.getElementById("inp");
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

function updateScoreboard() {
  document.getElementById("totalScore").innerText = totalScore;
  document.getElementById("wickets").innerText = wickets;
  document.getElementById("overs").innerText = overs;
  document.getElementById("balls").innerText = balls;
  document.getElementById("batsmanOnStrike").innerText = batsmanOnStrike;
  document.getElementById("batsmanNonStrike").innerText = batsmanNonStrike;
}

function scoreRun(runs) {
  if (wickets >= 10 || overs >= oversLimit) return;

  totalScore += runs;
  balls++;

  let striker = playerStats[batsmanOnStrike];
  if (!striker)
    striker = playerStats[batsmanOnStrike] = {
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
    };

  striker.runs += runs;
  striker.balls++;
  if (runs === 4) striker.fours++;
  if (runs === 6) striker.sixes++;

  if (runs % 2 !== 0) {
    [batsmanOnStrike, batsmanNonStrike] = [batsmanNonStrike, batsmanOnStrike];
  }

  if (balls >= 6) {
    overs++;
    balls = 0;
    [batsmanOnStrike, batsmanNonStrike] = [batsmanNonStrike, batsmanOnStrike];
  }

  updateScoreboard();

  if (overs >= oversLimit || wickets === 10) {
    handleInningsEnd();
  }
}

function wicketFall() {
  if (wickets >= 10 || overs >= oversLimit) return;

  wickets++;
  balls++;

  if (balls >= 6) {
    overs++;
    balls = 0;
  }

  const batPlayers = battingTeam === "team1" ? team1Players : team2Players;
  if (currentBatIndex < batPlayers.length) {
    batsmanOnStrike = batPlayers[currentBatIndex++];
    playerStats[batsmanOnStrike] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
  } else {
    alert("All out!");
  }

  updateScoreboard();

  if (overs >= oversLimit || wickets === 10) {
    handleInningsEnd();
  }
}

function handleInningsEnd() {
  if (currentInnings === 1) {
    firstInningsStats = { ...playerStats };
    firstInningsScore = totalScore;
    currentInnings = 2;

    [battingTeam, bowlingTeam] = [bowlingTeam, battingTeam];
    playerStats = {};
    totalScore = 0;
    wickets = 0;
    overs = 0;
    balls = 0;
    currentBatIndex = 2;

    const batPlayers = battingTeam === "team1" ? team1Players : team2Players;
    batsmanOnStrike = batPlayers[0];
    batsmanNonStrike = batPlayers[1];

    playerStats[batsmanOnStrike] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
    playerStats[batsmanNonStrike] = { runs: 0, balls: 0, fours: 0, sixes: 0 };

    updateScoreboard();
    showBowlerDropdown();
    alert("Innings over! Second innings begins now.");
  } else {
    showFinalScorecard();
  }
}

function wideBall() {
  totalScore += 1;
  updateScoreboard();
}

function noBall() {
  totalScore += 1;
  updateScoreboard();
}

document.getElementById("wicketButton").addEventListener("click", wicketFall);

function showFinalScorecard() {
  const scorecardDiv = document.getElementById("finalScorecard");
  scorecardDiv.innerHTML = `
  <h3>Final Scorecard</h3>
  <div class="scorecard-controls">
    <button id="showTeam1">Show Team 1</button>
    <button id="showTeam2">Show Team 2</button>
  </div>
  <div class="scorecard-table">
    <div id="team1Scorecard"></div>
    <div id="team2Scorecard" style="display:none;"></div>
  </div>
`;

  renderTeamScorecard(
    "team1",
    team1Players,
    "team1Scorecard",
    firstInningsStats
  );
  renderTeamScorecard("team2", team2Players, "team2Scorecard", playerStats);

  document.getElementById("showTeam1").onclick = () => {
    document.getElementById("team1Scorecard").style.display = "block";
    document.getElementById("team2Scorecard").style.display = "none";
  };
  document.getElementById("showTeam2").onclick = () => {
    document.getElementById("team1Scorecard").style.display = "none";
    document.getElementById("team2Scorecard").style.display = "block";
  };

  scorecardDiv.style.display = "block";
}

function renderTeamScorecard(team, players, containerId, statsSource) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>Player</th>
      <th>Runs</th>
      <th>Balls</th>
      <th>4s</th>
      <th>6s</th>
    </tr>
  `;

  players.forEach((player) => {
    const stats = statsSource[player] || {
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
    };
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${player}</td>
      <td>${stats.runs}</td>
      <td>${stats.balls}</td>
      <td>${stats.fours}</td>
      <td>${stats.sixes}</td>
    `;
    table.appendChild(row);
  });

  container.appendChild(table);
}
