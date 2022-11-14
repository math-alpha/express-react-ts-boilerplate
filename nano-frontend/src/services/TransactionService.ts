import apiService from "../http-common";
import ITransactionData from "../types/Transaction";

const getAll = () => {
    return apiService.get<Array<ITransactionData>>("/all");
};

const get = (id: string) => {
    return apiService.get<ITransactionData>(`/${id}`);
};

const transactionService = {
    getAll,
    get,
};

export default transactionService;
