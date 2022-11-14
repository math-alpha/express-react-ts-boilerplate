import * as Sequelize from 'sequelize'
import { sequelize } from '../store/db'

export interface TransactionAddModel {
    id: string
    value: number
    timestamp: number
    sender: string
    receiver: string
    confirmed: boolean
}

export interface TransactionModel extends Sequelize.Model<TransactionModel, TransactionAddModel> {
    id: string
    value: number
    timestamp: number
    sender: string
    receiver: string
    confirmed: boolean
}

export const Transaction = sequelize.define<TransactionModel, TransactionAddModel>('transaction', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    value: Sequelize.NUMBER,
    timestamp: Sequelize.NUMBER,
    sender: Sequelize.STRING,
    receiver: Sequelize.STRING,
    confirmed: Sequelize.BOOLEAN,
});