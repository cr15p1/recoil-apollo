// createMessage.ts
import { atomFamily } from "recoil";
import { graphQLMutationEffect } from "recoil-apollo";
import TypeDefs from "../TypeDefs";
import { Message } from "../types";

const createMessageAtomFamily = atomFamily<Message, string>({
  key: "messageIds",
  effects: () => [
    /**
     * To be able to refetch in `graphQLMutationEffect()`,
     * a `graphQLQueryEffect()` must first be created in the same recoil state.
     */
    graphQLMutationEffect<any, Message>({
      mutation: TypeDefs.createMessage,
      variables: ({ newValue }) => ({ message: newValue }),
      when: ({ newValue }) => Boolean(newValue && newValue._id === undefined),
      effect: ({ refetch }) => {
        refetch();
      },
    }),
  ],
});

export default createMessageAtomFamily;
