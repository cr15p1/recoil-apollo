import { DocumentNode, FetchResult, SubscriptionOptions } from "@apollo/client";
import { GraphQLError } from "graphql";
import { SetSelf } from "./types";

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
