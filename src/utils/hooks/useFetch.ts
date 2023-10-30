import { useEffect, useState, useCallback } from "react";

interface DataStructure {
  message: string | string[] | Record<string, any>;
  status?: string;
}

const useFetch = (url: string) => {
  const [data, setData] = useState<DataStructure | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Opps...There was an error loading the images!");
      }
      const jsonData: DataStructure = await response.json();

      setData(jsonData);
      setError(null);
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, [url, fetchData]);

  return { data, isLoading, error, fetchData };
};

export default useFetch;
