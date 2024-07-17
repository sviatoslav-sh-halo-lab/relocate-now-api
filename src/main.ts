import express from 'express';
import dotenv from 'dotenv'
import { HttpStatusCode } from 'axios';
import cors from 'cors'
import sppApi from './api/spp-api'
import users from './controllers/users-controller';

dotenv.config();

const app: express.Application = express();

app.use(cors({
  origin: ['https://relocatenowsandbox.spp.io', 'https://pt.relocatenow.io', 'https://relocatenow.spp.io'],
}))

app.use('/users', users);

app.get('/orders', async (req: express.Request, res: express.Response) => {
  const userId = req.query['userId'] as string;
  if (!userId) {
    return res.status(HttpStatusCode.BadRequest).json({message: 'User id is not provided'})
  }
  const data = (await sppApi.getUserOrders(userId)).data;
  await res.json(data);
})

app.listen(process.env.PORT, () => {
  console.log('Server has started on port ' + process.env.PORT);
})