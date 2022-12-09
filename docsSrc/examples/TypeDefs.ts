import { gql } from "@apollo/client";

class TypeDefs {
  public static messageIds = gql`
    query messageIds {
      messageIds
    }
  `;

  public static message = gql`
    query message($_id: ObjectId) {
      message(_id: $_id) {
        _id
        content
      }
    }
  `;

  public static createMessage = gql`
    mutation createMessage($message: Message!) {
      createMessage(message: $message) {
        _id
      }
    }
  `;

  public static onNewMessages = gql`
    subscription onNewMessages {
      onNewMessages
    }
  `;
}

export default TypeDefs;
