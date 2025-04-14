const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (request, response) => {
    const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=818000`;

  try {
      const res = await fetch(url);
      const data = await res.json();
      const temp = data.currentWeather.temperature;
      response.json(temp)

  } catch (err) {
      console.log(err)
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



