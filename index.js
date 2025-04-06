const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rtrtamil123',
  database: 'teamplayername'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ MySQL connected!');
  }
});

app.post('/add-team', (req, res) => {
  console.log('📥 POST /add-team hit');
  const { team, teamName, players } = req.body;
  console.log('Received data:', req.body);

  db.query("INSERT INTO teams (team_name,team_identifier) VALUES (?, ?)",
    [teamName, team],
    (err, result) => {
      if (err) {
        console.error('❌ Error inserting team:', err);
        return res.status(500).json({ error: err.message });
      }

      const teamId = result.insertId;
      const playerValues = players.map(player_name => [player_name, teamId]);

      db.query("INSERT INTO players (player_name, team_id) VALUES ?", [playerValues],
        (err2, result2) => {
          if (err2) {
            console.error('❌ Error inserting players:', err2);
            return res.status(500).json({ error: err2.message });
          }

          res.json({ message: 'Team and players inserted successfully!' });
        }
      );
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
