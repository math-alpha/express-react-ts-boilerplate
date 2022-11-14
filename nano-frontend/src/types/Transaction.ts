interface ITransactionData {
    id: string;
    value: number;
    sender: string;
    receiver: string;
    timestamp: number;
    confirmed: boolean;
    createdAt: number;
    updatedAt: number;
}

export default ITransactionData;
