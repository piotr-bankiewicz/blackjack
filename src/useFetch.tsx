import axios from "axios";
import { useState } from "react";

const useFetch = <T,>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performRequest = (url: string) => {
    setLoading(true);
    axios
      .get(url, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept" } })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  return [data, loading, error, performRequest] as const;
};

export default useFetch;
