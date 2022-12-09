/* eslint-disable consistent-return */

import type { AtomEffect } from "recoil";

import RecoilApollo from "./RecoilApollo";
import { GraphQLQueryEffectOptions } from "./types";
import { castNode, fetchSymbol } from "./utils";

const graphQLQueryEffect =
  <TResponse = any, TData = any, TVariables = any>({
    variables,
    query,
    skip,
    effect,
    ...rest
  }: GraphQLQueryEffectOptions<
    TResponse,
    TData,
    TVariables
  >): AtomEffect<TData> =>
  ({ setSelf, onSet, node }) => {
    if (skip && skip()) {
      return;
    }
    const castedNode = castNode(node);
    const fetch = () => {
      RecoilApollo.client
        .then((client) => {
          client
            .query<TResponse, TVariables>({
              query,
              variables,
              ...rest,
            })
            .then((response) => {
              effect({ response, setSelf });
            })
            .catch((error) => {
              effect({ error, setSelf });
            });
        })
        .catch((error) => {
          throw error;
        });
    };

    castedNode[fetchSymbol].push(fetch);

    fetch();

    onSet((_, __, isReset) => {
      if (isReset) {
        fetch();
      }
    });

    return () => {
      if (!castedNode[fetchSymbol]) {
        return;
      }
      const index = castedNode[fetchSymbol].findIndex(fetch);
      if (index !== -1) {
        castedNode[fetchSymbol].splice(index, 1);
      }
    };
  };

export default graphQLQueryEffect;
