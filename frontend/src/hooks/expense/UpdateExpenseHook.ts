import { useState } from "react";
import type { Expense } from "../../entities/Expense";

const UpdateExpenseHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);

  const fetchData = async ({
    expenseId,
    expense,
  }: {
    expenseId: string;
    expense: Pick<Expense, "title" | "category" | "amount" | "date">;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/expense", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: expenseId,
          ...expense,
          date: new Date(expense.date).toISOString(),
        }),
        credentials: "include",
      });

      setStatus(res.status);

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Request failed");
      }

      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading, data, error, status };
};

export default UpdateExpenseHook;