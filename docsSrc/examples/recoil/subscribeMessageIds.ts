// subscribeMessageIds.ts
import { atom } from "recoil";
import { graphQLSubscriptionEffect } from "recoil-apollo";
import TypeDefs from "../TypeDefs";

const messageIdsAtom = atom({
  key: "messageIds",
  effects: [
    /**
     * To be able to refetch in `graphQLSubscriptionEffect()`,
     * a `graphQLQueryEffect()` must first be created in the same recoil state.
     */
    graphQLSubscriptionEffect({
      fetchPolicy: "no-cache",
      subscription: TypeDefs.onNewMessages,
      effect: ({ refetch }) => {
        refetch();
      },
    }),
  ],
});

export default messageIdsAtom;
