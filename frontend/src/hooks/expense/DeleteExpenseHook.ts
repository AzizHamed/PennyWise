import { useState } from "react";

const DeleteExpenseHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);

  const fetchData = async ({ expenseId }: { expenseId: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:3000/expense/${expenseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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

export default DeleteExpenseHook;