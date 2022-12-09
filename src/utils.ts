import { RecoilState } from "recoil";

export const fetchSymbol = Symbol("fetch");

export const castNode = <TData>(node: RecoilState<TData>) => {
  const castedNode = node as unknown as {
    [fetchSymbol]: (() => void)[];
  } & RecoilState<TData>;
  castedNode[fetchSymbol] = castedNode[fetchSymbol] || [];
  return castedNode;
};
