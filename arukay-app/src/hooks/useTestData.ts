import { useState, useCallback, useEffect } from 'react';
import { testDataService } from '../services/testDataService';
import type { TestDataItem } from '../services/testDataService';

export interface TestDataState {
  data: TestDataItem[];
  loading: boolean;
  error: string | null;
}

export interface UseTestDataReturn {
  state: TestDataState;
  fetchData: () => Promise<void>;
  retry: () => void;
}

export const useTestData = (): UseTestDataReturn => {
  const [state, setState] = useState<TestDataState>({
    data: [],
    loading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const data = await testDataService.fetchTestData();

      setState((prev) => ({ ...prev, data, loading: false }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error desconocido',
        loading: false,
      }));
    }
  }, []);

  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (isMounted) {
        await fetchData();
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  return {
    state,
    fetchData,
    retry,
  };
}; 