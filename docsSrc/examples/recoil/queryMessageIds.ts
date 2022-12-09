// queryMessageIds.ts
import { atom } from "recoil";
import { graphQLQueryEffect } from "recoil-apollo";
import TypeDefs from "../TypeDefs";

const messageIdsAtom = atom({
  key: "messageIds",
  effects: [
    graphQLQueryEffect<{ messageIds: string[] }, string[] | undefined>({
      fetchPolicy: "no-cache",
      query: TypeDefs.messageIds,
      effect: ({ setSelf, response }) => {
        setSelf(response?.data.messageIds);
      },
    }),
  ],
});

export default messageIdsAtom;
