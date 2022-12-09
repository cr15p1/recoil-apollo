import { gql } from "@apollo/client";
import { GraphQLSubscriptionEffectOptions } from "../types";

const mockGraphQLSubscriptionEffectOptions = (
  overrides?: Partial<GraphQLSubscriptionEffectOptions>
): GraphQLSubscriptionEffectOptions => ({
  subscription: gql`
    subscription doFoo {
      doFoo
    }
  `,
  effect: () => {},
  ...overrides,
});

export default mockGraphQLSubscriptionEffectOptions;
