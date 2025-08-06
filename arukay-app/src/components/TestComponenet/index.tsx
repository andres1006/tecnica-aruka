import React from "react";
import { useTestData } from "../../hooks/useTestData";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { DataList } from "./DataList";

const TestComponent: React.FC = () => {
  const { state, retry } = useTestData();

  if (state.loading) {
    return <LoadingSpinner />;
  }

  if (state.error) {
    return <ErrorMessage error={state.error} onRetry={retry} />;
  }

  return <DataList data={state.data} />;
};

export default TestComponent;
