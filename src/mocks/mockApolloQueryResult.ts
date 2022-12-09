import { ApolloQueryResult } from "@apollo/client";

const mockApolloQueryResult = (
  override?: Partial<ApolloQueryResult<unknown>>
): ApolloQueryResult<unknown> => ({
  data: "foo",
  loading: false,
  networkStatus: 0,
  ...override,
});

export default mockApolloQueryResult;
