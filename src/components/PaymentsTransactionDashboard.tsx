import React, { useState } from "react";
import useGetPaymentTransactions from "../hooks/useGetPaymentTransactions";

const PaymentsTransacactionDashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { transactions, loading, error } = useGetPaymentTransactions(
    startDate,
    endDate
  );

  const onStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };
  const onEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <h1>Payments Transaction Dashboard</h1>
      <div>
        <input name="startDate" type="date" onChange={onStartDateChange} />
        <input name="endDate" type="date" onChange={onEndDateChange} />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {transactions.map((transaction) => {
            return (
              <li key={transaction.id}>
                <div>
                  <p>ID: {transaction.id}</p>
                  <p>Date: {transaction.date}</p>
                  <p>Description: {transaction.description}</p>
                  <p>Amount: {transaction.amount}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PaymentsTransacactionDashboard;
