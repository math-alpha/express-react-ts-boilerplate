import React, { useState, useEffect, ChangeEvent } from "react";

import TransactionDataService from "../services/TransactionService";
import ITransactionData from "../types/Transaction";

import { io } from "socket.io-client";

const socket = io("ws://localhost:8888", {
    withCredentials: true,
    extraHeaders: {
      "socket-validation-header": "null"
    }
});


const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Array<ITransactionData>>([]);
  const [visibleTransactions, setVisibleTransactions] = useState<Array<ITransactionData>>([]);
  const [currentTransaction, setCurrentTransaction] =
    useState<ITransactionData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveTransactions();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);

    const filteredTransactions = transactions.filter((transaction) => {
      return (
        transaction.id.toLowerCase().includes(searchTitle.toLowerCase()) ||
        transaction.value
          .toString()
          .toLowerCase()
          .includes(searchTitle.toLowerCase())
      );
    });

    setVisibleTransactions(filteredTransactions);
  };

  const retrieveTransactions = () => {
    TransactionDataService.getAll()
      .then((response: any) => {
        setTransactions(response.data);
        if (searchTitle === "") {
            setVisibleTransactions(response.data);
        }
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const setActiveTransaction = (
    transaction: ITransactionData,
    index: number
  ) => {
    setCurrentTransaction(transaction);
    setCurrentIndex(index);
  };

  socket.off("dbChange").on("dbChange", (args: any) => {
    retrieveTransactions();
  });

  return (
    <div className="list row">
      <div className="col-md-8 col-lg-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for transaction"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
        </div>
      </div>
      <div className="col-md-8">
        <h4>Transactions List</h4>

        <ul className="list-group">
          {visibleTransactions.length ?
            (
                visibleTransactions.map((transaction, index) => (
                    <li
                        className={
                        "list-group-item " + (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveTransaction(transaction, index)}
                        key={index}
                    >
                        {transaction.id}
                    </li>
                ))
            ) : (
                <div className="flex-center">Nothing found</div>
            )
          }
        </ul>
      </div>
      <div className="col-md-4">
        {currentTransaction ? (
          <div>
            <h4>Transaction Details</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentTransaction.id}
            </div>
            <div>
              <label>
                <strong>Value:</strong>
              </label>{" "}
              {currentTransaction.value}
            </div>
            <div>
              <label>
                <strong>Sender:</strong>
              </label>{" "}
              {currentTransaction.sender}
            </div>
            <div>
              <label>
                <strong>Receiver:</strong>
              </label>{" "}
              {currentTransaction.receiver}
            </div>
            <div>
              <label>
                <strong>Timestamp:</strong>
              </label>{" "}
              {currentTransaction.timestamp}
            </div>
            <div>
              <label>
                <strong>Confirmed:</strong>
              </label>{" "}
              {currentTransaction.confirmed ? "True" : "False"}
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Transaction to see details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;

