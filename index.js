const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/players/nfl', async (req, res) => {
    try {
        // Fetch data from Sleeper API
        const response = await axios.get('https://api.sleeper.app/v1/players/nfl');
        
        // Extract only the necessary information: player name, id, and position
        const players = Object.values(response.data).map(player => ({
            id: player.player_id,
            name: player.full_name,
            position: player.position
        }));
        
        // Send the filtered data as JSON
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from Sleeper API', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

