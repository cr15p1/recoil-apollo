import { atomFamily, AtomFamilyOptions, SerializableParam } from "recoil";
import { EnrichedParams } from "./types";

const graphQLAtomFamily = <TData, TParams extends SerializableParam>(
  options: AtomFamilyOptions<TData, EnrichedParams<TParams>>
) => atomFamily(options);

export default graphQLAtomFamily;
