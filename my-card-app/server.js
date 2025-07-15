const fetch = require('node-fetch'); // Correct for node-fetch v2


const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();
const PORT = 3000;

const TELEGRAM_TOKEN = '7655310388:AAGiauGQ8lEPAm0yPwBBqYZcF1LtS_wb2AI';
const TELEGRAM_CHAT_ID = '5031717876';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', async (req, res) => {
  const formData = req.body;

  console.log('Received form data:', formData);

  const messageText = `
✅ New submission received:

${JSON.stringify(formData, null, 2)}
`;

  try {
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText
      })
    });

    const result = await response.text();
    console.log('Telegram response:', result);

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to send Telegram message' });
    }

    res.json({ message: 'Success: Data sent to Telegram' });
  } catch (error) {
    console.error('Telegram error:', error);
    res.status(500).json({ error: 'Telegram error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server listening at http://localhost:${PORT}`);
});
