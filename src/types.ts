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
