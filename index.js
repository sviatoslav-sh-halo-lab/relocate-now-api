import express from 'express';
import dotenv from 'dotenv'
import axios from 'axios';

dotenv.config();

const app = express();

const userId = 822;

app.get('/orders', async (req, res) => {
  const data = (await axios.get(`${process.env.SPP_API}/orders?filters%5Buser_id%5D%5B%24in%5D%5B%5D=${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.SPP_SECRET}`,
    }
  })).data;
  res.json(data);
})

app.listen(process.env.PORT, () => {
  console.log('Server has started on port ' + process.env.PORT);
})