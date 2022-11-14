import { Op } from 'sequelize'
import { Transaction, TransactionModel } from '../models/transaction'


export class TransactionService {

    private static _transaction
    static get transaction() {
        return TransactionService._transaction
    }

    create({ value, sender, receiver }: TransactionModel) {
        const timestamp = Date.now();
        return Transaction
            .create({ id: `${sender}_${receiver}_${timestamp}`, value, sender, receiver, timestamp })
            .then(t => this.getTransactionById(t!.id));
    }

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

    updateTransaction({ id, value, sender, receiver, confirmed }: TransactionModel) {
        return Transaction.update({ value, sender, receiver, confirmed }, { where: { id } })
            .then(() => this.getTransactionById(id));
    }

    getTransactionById(id: string) {
        return Transaction.findByPk(id);
    }

}