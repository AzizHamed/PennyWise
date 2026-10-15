import { useState } from "react";

const LogoutHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
          //  Authorization: `Bearer ${localStorage.getItem("token")}`
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

export default LogoutHook;