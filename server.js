const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

const YOUTUBE_API_KEY = 'AIzaSyCoRsUKwnDFxcsquN-r21XHvF6HDpSf2h4';

app.use(cors());
app.use(express.json());

app.get('/search-volume', async (req, res) => {
  const keyword = req.query.keyword;

  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&key=${YOUTUBE_API_KEY}`);
    const data = response.data;

    // Calculate search volume based on the total results
    const searchVolume = data.pageInfo.totalResults || 0;

    res.json({ search_volume: searchVolume });
  } catch (error) {
    console.error('Error fetching search volume:', error);
    res.status(500).json({ error: 'Error fetching search volume' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
