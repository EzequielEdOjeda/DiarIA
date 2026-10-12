require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.static('public'));

app.get('/api/config', (req, res) => {
  res.json({
    SHEET_CSV_URL: process.env.SHEET_CSV_URL,
    FIREBASE_URL: process.env.FIREBASE_URL,
    NEWSDATA_API_KEY: process.env.NEWSDATA_API_KEY
  });
});

app.listen(3000, () => console.log('http://localhost:3000'));