import { Op } from 'sequelize'
import { Get, Route } from "tsoa";

import { Transaction, TransactionModel } from '../models/transaction'


@Route('transaction')
export class TransactionService {

    private static _transaction
    static get transaction() {
        return TransactionService._transaction
    }

    @Get("/create")
    create({ value, sender, receiver }: TransactionModel) {
        const timestamp = Date.now();
        return Transaction
            .create({ id: `${sender}_${receiver}_${timestamp}`, value, sender, receiver, timestamp })
            .then(t => this.getTransactionById(t!.id));
    }

    @Get("/all")
    getAll() {
        return Transaction.findAll()
    }

    getOne(id: string) {
        return Transaction.findOne({ where: { id } }).then(t => {
            return { t }
        })
    }

    getTransactionsByDateRange({ startDate, endDate }: { startDate: string, endDate: string }) {
        return Transaction.findAll({
            where: {
                timestamp: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
    }

    @Get('update')
    updateTransaction({ id, value, sender, receiver, confirmed }: TransactionModel) {
        return Transaction.update({ value, sender, receiver, confirmed }, { where: { id } })
            .then(() => this.getTransactionById(id));
    }

    getTransactionById(id: string) {
        return Transaction.findByPk(id);
    }

}
