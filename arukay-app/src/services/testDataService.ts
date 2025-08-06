import { getApiUrl } from '../config/environment';

export interface TestDataItem {
  name: string;
  id?: number;
}

export class TestDataService {
  private static instance: TestDataService;

  private constructor() { }

  public static getInstance(): TestDataService {
    if (!TestDataService.instance) {
      TestDataService.instance = new TestDataService();
    }
    return TestDataService.instance;
  }

  async fetchTestData(): Promise<TestDataItem[]> {
    const response = await fetch(getApiUrl('normal_function'));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
}

export const testDataService = TestDataService.getInstance(); 