import { gql } from "@apollo/client";
import { GraphQLQueryEffectOptions } from "../types";

const mockGraphQLQueryEffectOptions = (
  override?: Partial<GraphQLQueryEffectOptions>
): GraphQLQueryEffectOptions => ({
  query: gql`
    query {
      test
    }
  `,
  effect: jest.fn(),
  ...override,
});

export default mockGraphQLQueryEffectOptions;
