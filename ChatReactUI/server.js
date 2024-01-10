const express = require('express');
const axios = require('axios');
const app = express();

app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
 if (req.method === 'OPTIONS') {
   return res.sendStatus(200);
 }
 next();
});

app.all('/chat', async (req, res) => {
 try {
  console.log('Received Request',req.body);
   const response = await axios.post('https://us-central1-diseasedet.cloudfunctions.net/chat', req.body, {
     headers: {
       'Content-Type': 'application/json',
     },
   });
   res.status(response.status).send(response.data);
 } catch (error) {
   res.status(500).send(error.message);
 }
});

app.listen(3000, () => {
 console.log('Proxy server listening on port 3000');
});
