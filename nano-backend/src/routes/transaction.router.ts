import { Router } from 'express';
import { Server } from "socket.io";

import { TransactionService } from '../services/transaction.service'
import { TransactionModel } from '../models/transaction'
import Config from '../constants';

export const transactionRouter = Router()
const transactionService = new TransactionService()


const io = new Server(Config.socketPort, {
    cors: {
        origin: Config.clientURL,
        methods: ["GET"],
        allowedHeaders: ["socket-validation-header"],
        credentials: true
      }
});


transactionRouter.post('/create', (req, res) => {
    const transaction = transactionService.create(req.body as TransactionModel)
    io.emit(Config.dbChangeEvent, transaction);
    return transaction.then(transaction => res.json(transaction))
});

transactionRouter.get('/all', (req, res) => {
    const transactions = transactionService.getAll()
    return transactions.then(transaction => res.json(transaction))
});

transactionRouter.get('/:id', (req, res) => {

    const transaction = transactionService.getOne(req.params.id)
    return transaction.then(transaction => res.json(transaction))

});

transactionRouter.get('/date-range/:startDate/:endDate', (req, res) => {
    const transactions = transactionService.getTransactionsByDateRange({ startDate: req.params.startDate, endDate: req.params.endDate })
    return transactions.then(transaction => res.json(transaction))
});

transactionRouter.put('/update', (req, res) => {
    const transaction = transactionService.updateTransaction(req.body as TransactionModel)
    io.emit(Config.dbChangeEvent, transaction);
    return transaction.then(transaction => res.json(transaction))
});
