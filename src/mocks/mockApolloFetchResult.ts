import { FetchResult } from "@apollo/client";

const mockApolloFetchResult = (
  overrides?: Partial<FetchResult>
): FetchResult => ({ ...overrides });

export default mockApolloFetchResult;
