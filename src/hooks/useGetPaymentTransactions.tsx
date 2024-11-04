import { useEffect, useState } from "react";

type PaymentTransaction = {
  id: number;
  amount: number;
  description: string;
  date: string;
};

const MOCKED_PAYMENT_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 1,
    amount: 10,
    description: "Pago 1",
    date: "2024/11/4",
  },
  {
    id: 2,
    amount: 20,
    description: "Pago 2",
    date: "2024/11/5",
  },
  {
    id: 3,
    amount: 30,
    description: "Pago 3",
    date: "2024/11/6",
  },
];

const getPaymentsTransactions = async () => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      return Math.floor(Math.random() * 11) < 5
        ? resolve(MOCKED_PAYMENT_TRANSACTIONS)
        : reject(new Error("Failed to retrieve transactions."));
    }, 3000);
  });
};

const dateFilter = (
  startDate: string,
  endDate: string
): ((transaction: PaymentTransaction) => boolean) => {
  return (transaction) => {
    if (startDate === '' && endDate === '') {
        return true
    }
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate >= new Date(startDate) &&
      transactionDate <= new Date(endDate)
    );
  };
};

const filterTransactions = (
  transactions: PaymentTransaction[],
  filterFn: (transaction: PaymentTransaction) => boolean
) => {
  return transactions.filter(filterFn);
};

const useGetPaymentTransactions = (startDate: string, endDate: string) => {
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const result = await getPaymentsTransactions();
        const filteredTransactions = filterTransactions(
          result as PaymentTransaction[],
          dateFilter(startDate, endDate)
        );
        setTransactions(filteredTransactions);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
        console.error(e);
      }
    };

    getTransactions();
  }, [startDate, endDate]);

  return { transactions, error, loading };
};

export default useGetPaymentTransactions;
