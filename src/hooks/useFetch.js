import { useState } from "react";
import { useEffect } from "react";
import makeRequest from "../makeRequest";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await makeRequest.get(url );
        setData(res.data.data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);
  return { data, error, loading };
};

export default useFetch;
