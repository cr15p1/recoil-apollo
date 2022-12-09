import {
  ApolloQueryResult,
  DocumentNode,
  FetchResult,
  MutationOptions,
  QueryOptions,
  SubscriptionOptions,
} from "@apollo/client";
import { GraphQLError } from "graphql";
import { AtomEffect, SerializableParam } from "recoil";

export type EnrichedParamOptions = {
  skip: boolean;
};

export type EnrichedParams<TParams extends SerializableParam> = {
  params: TParams;
} & EnrichedParamOptions;

export type AtomEffectFirstParam<TData> = Parameters<AtomEffect<TData>>[0];

export type SetSelf<TData> = AtomEffectFirstParam<TData>["setSelf"];
export type ResetSelf<TData> = AtomEffectFirstParam<TData>["resetSelf"];

export interface GraphQLQueryEffectOptions<
  TResponse = any,
  TData = any,
  TVariables = any
> extends Omit<QueryOptions<TVariables, TResponse>, "variables"> {
  query: DocumentNode;
  /**
   * M
   * @Returns {object}
   */
  variables?: TVariables;
  skip?: () => boolean;
  effect: (data: {
    error?: Error;
    setSelf: SetSelf<TData>;
    response?: ApolloQueryResult<TResponse>;
  }) => void;
}

export interface GraphQLMutationEffectOptions<
  TResponse = any,
  TData = any,
  TVariables = any
> extends Omit<MutationOptions<TResponse, TVariables>, "variables" | "mutate"> {
  mutation: DocumentNode;
  skip?: () => boolean;
  when?: (data: {
    newValue?: TData;
    oldValue?: TData;
    isReset: boolean;
  }) => boolean;
  variables?: (data: { newValue?: TData; oldValue?: TData }) => TVariables;
  effect: (data: {
    error?: Error;
    refetch: () => void;
    setSelf: SetSelf<TData>;
    response?: FetchResult<TResponse>;
  }) => void;
}

export interface GraphQLSubscriptionEffectOptions<
  TResponse = any,
  TData = any,
  TVariables = any
> extends Omit<
    SubscriptionOptions<TVariables, TResponse>,
    "variables" | "query"
  > {
  subscription: DocumentNode;
  variables?: (data: { value?: TData }) => TVariables;
  skip?: () => boolean;
  effect: (data: {
    errors?: readonly GraphQLError[];
    refetch: () => void;
    setSelf: SetSelf<TData>;
    response?: FetchResult<TResponse>;
  }) => void;
}
