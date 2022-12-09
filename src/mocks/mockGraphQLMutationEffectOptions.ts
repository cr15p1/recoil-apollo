import { gql } from "@apollo/client";
import { GraphQLMutationEffectOptions } from "../types";

const mockGraphQLMutationEffectOptions = (
  override?: Partial<GraphQLMutationEffectOptions>
): GraphQLMutationEffectOptions => ({
  mutation: gql`
    mutation CreateReviewForEpisode($val: String!) {
      addString(val: String)
    }
  `,
  effect: () => {},
  ...override,
});

export default mockGraphQLMutationEffectOptions;
