import { useEffect, useRef, useState } from "react";

export const usePullToRefresh = (
  timeout: number,
  callBackFunction: () => void
) => {
  const [refreshing, setRefreshing] = useState(false);

  const refFunction = useRef<any>(null);

  const onPullToRefresh = async () => {
    setRefreshing(true);

    await new Promise((resolve) => setTimeout(resolve, timeout));

    refFunction.current();
    setRefreshing(false);
  };

  useEffect(() => {
    refFunction.current = callBackFunction;

    return () => {
      refFunction.current = null;
    };
  }, [callBackFunction]);

  return {
    refreshing,
    onPullToRefresh,
  };
};
