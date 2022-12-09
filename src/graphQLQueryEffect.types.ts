import { ApolloQueryResult, DocumentNode, QueryOptions } from "@apollo/client";
import { SetSelf } from "./types";

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
