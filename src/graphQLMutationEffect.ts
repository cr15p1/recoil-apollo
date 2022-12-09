import { AtomEffect, DefaultValue } from "recoil";
import { GraphQLMutationEffectOptions } from "./graphQLMutationEffect.types";
import RecoilApollo from "./RecoilApollo";
import { castNode, fetchSymbol } from "./utils";

export const graphQLMutationEffect =
  <TResponse = any, TData = any, TVariables = any>({
    mutation,
    skip,
    when,
    variables,
    effect,
    ...rest
  }: GraphQLMutationEffectOptions<
    TResponse,
    TData,
    TVariables
  >): AtomEffect<TData> =>
  ({ onSet, setSelf, node }) => {
    if (skip && skip()) {
      return;
    }
    onSet((newValue, oldValue, isReset) => {
      if (
        newValue instanceof DefaultValue ||
        oldValue instanceof DefaultValue ||
        isReset
      ) {
        return;
      }

      if ((when && when({ newValue, oldValue, isReset })) || !when) {
        const refetch = () => {
          const castedNode = castNode(node);
          const fetches = castedNode[fetchSymbol];
          if (!fetches) {
            return;
          }
          fetches.forEach((fetch) => {
            if (typeof fetch === "function") fetch();
          });
        };
        RecoilApollo.client
          .then((client) => {
            client
              .mutate<TResponse, TVariables>({
                mutation,
                variables: variables
                  ? variables({ newValue, oldValue })
                  : undefined,
                ...rest,
              })
              .then((response) => {
                effect({
                  response,
                  refetch,
                  setSelf,
                });
              })
              .catch((error) => {
                effect({
                  error,
                  refetch,
                  setSelf,
                });
              });
          })
          .catch((error) => {
            throw error;
          });
      }
    });
  };

export default graphQLMutationEffect;
