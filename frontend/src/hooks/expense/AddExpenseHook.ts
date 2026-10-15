import { useState } from "react";
import type { Expense } from "../../entities/Expense";

const AddExpenseHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);

  const fetchData = async ({expense } : {expense: Expense}) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(expense),
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

export default AddExpenseHook;