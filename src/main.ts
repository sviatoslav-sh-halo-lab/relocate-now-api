import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import users from './controllers/users-controller';
import orders from './controllers/orders-controller';

dotenv.config();

const app: express.Application = express();

app.use(cors({
  origin: ['https://relocatenowsandbox.spp.io', 'https://pt.relocatenow.io', 'https://relocatenow.spp.io'],
}))

app.use('/users', users);
app.use('/orders', orders)

app.listen(process.env.PORT, () => {
  console.log('Server has started on port ' + process.env.PORT);
})