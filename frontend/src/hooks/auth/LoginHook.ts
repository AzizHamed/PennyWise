import { useState } from "react";

const LoginHook = ({email, password} : {email:string, password:string}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);

  const fetchData = async () => {
    console.log("Fetching data with email:", email);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("https://pennywise-backend-00zw.onrender.com/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({email, password}),
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

export default LoginHook;