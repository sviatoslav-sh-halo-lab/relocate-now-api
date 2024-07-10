import express from 'express';
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const user_id = 822;

app.get('/orders', (req, res) => {

})

app.listen(port, () => {
  console.log('Server has started on port ' + process.env.PORT);
})