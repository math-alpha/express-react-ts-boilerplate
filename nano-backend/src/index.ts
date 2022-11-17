import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { transactionRouter } from './routes/transaction.router';
import Config from './constants';
import job from './scripts/croner';
job // intentional


const app = express();
const port = Config.serverPort;


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("config"));

app.use('/transaction', transactionRouter)

/*app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
)*/

app.listen(port, () => {
    console.log(`Service is running on port ${port}`)
})
