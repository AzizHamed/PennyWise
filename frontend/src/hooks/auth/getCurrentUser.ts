import { useState } from "react";

const getCurrentUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);

  const fetchData = async () => {
    console.log("Fetching current user data");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("https://pennywise-backend-00zw.onrender.com/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // body: JSON.stringify({}),
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
      // localStorage.removeItem("token");
    }
  };

  return { fetchData, isLoading, data, error, status };
};

export default getCurrentUser;