// backend/server.mjs
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// API Endpoint to handle filter data
app.post('/fetch-bills', async (req, res) => {
  try {
    console.log("api=================")
    const filtersData = { "query" :req.body};
    console.log('Received filters data:', filtersData);

    // Make a network call to the external API
    const response = await fetch('https://supplynote.in/dashboard/api/bikkgane/tally-xml', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filtersData),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
    }

    // Parse the response as JSON
    const responseData = await response.json();
    console.log('Response from external API:', responseData);

    // Send the response from the external API to the client
    res.json(responseData);
  } catch (error) {
    console.error('Error occurred while processing filters:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
