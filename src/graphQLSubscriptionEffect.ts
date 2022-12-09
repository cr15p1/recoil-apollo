/* eslint-disable consistent-return */
import { AtomEffect } from "recoil";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Subscription } from "zen-observable-ts";
import RecoilApollo from "./RecoilApollo";
import { GraphQLSubscriptionEffectOptions } from "./types";
import { castNode, fetchSymbol } from "./utils";

const graphQLSubscriptionEffect =
  <TResponse = any, TData = any, TVariables = any>({
    subscription,
    variables,
    skip,
    effect,
    ...rest
  }: GraphQLSubscriptionEffectOptions<
    TResponse,
    TData,
    TVariables
  >): AtomEffect<TData> =>
  ({ setSelf, onSet, node }) => {
    if (skip && skip()) {
      return;
    }
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

    let currentSubscribe: Subscription | undefined;
    const unsubscribe = () => {
      if (currentSubscribe) {
        currentSubscribe.unsubscribe();
      }
    };

    const subscribe = (value?: TData) => {
      unsubscribe();
      RecoilApollo.client
        .then((client) => {
          currentSubscribe = client
            .subscribe<TResponse, TVariables>({
              query: subscription,
              variables: variables ? variables({ value }) : undefined,
              ...rest,
            })
            .subscribe((response) => {
              if (response.errors) {
                effect({ refetch, errors: response.errors, setSelf });
              }
              effect({ response, refetch, setSelf });
            });
        })
        .catch((error) => {
          throw error;
        });
    };

    subscribe();

    onSet((newValue) => {
      subscribe(newValue);
    });
    return () => unsubscribe();
  };

export default graphQLSubscriptionEffect;
