import { AtomEffect, StoreID } from "recoil";

export type AtomEffectParam = Parameters<AtomEffect<any>>[0];

const mockRecoilAtomEffectParam = (
  override?: Partial<AtomEffectParam>
): AtomEffectParam => ({
  getInfo_UNSTABLE: jest.fn(),
  getLoadable: jest.fn(),
  getPromise: jest.fn(),
  node: {} as any,
  onSet: jest.fn(),
  resetSelf: jest.fn(),
  setSelf: jest.fn(),
  storeID: "" as unknown as StoreID,
  trigger: "get",
  parentStoreID_UNSTABLE: "" as unknown as StoreID,
  ...override,
});

export default mockRecoilAtomEffectParam;
