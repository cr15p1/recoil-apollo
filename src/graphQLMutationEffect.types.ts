import { DocumentNode, FetchResult, MutationOptions } from "@apollo/client";
import { SetSelf } from "./types";

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
