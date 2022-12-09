import React from "react";
import type { FC } from "react";
import { ApolloClient } from "@apollo/client";
import PropTypes from "prop-types";

export type ApolloClientOrPromise =
  | ApolloClient<any>
  | Promise<ApolloClient<any>>;

export interface RecoilApolloProps {
  children?: React.ReactNode;
  client: ApolloClientOrPromise;
}

const RecoilApollo = (() => {
  const RecoilApolloComponent = (({ client, children }) => {
    if ("then" in client) {
      RecoilApolloComponent.client = client;
    } else {
      RecoilApolloComponent.client = Promise.resolve(client);
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }) as FC<RecoilApolloProps> & { client: Promise<ApolloClient<any>> };

  let client: ApolloClientOrPromise | undefined;
  Object.defineProperty(RecoilApolloComponent, "client", {
    get: async (): Promise<ApolloClient<any>> => {
      if (!client) {
        throw new Error("Please use first the <RecoilApollo/> Component");
      }
      return client;
    },
    set: (newClient: ApolloClientOrPromise) => {
      client = newClient;
    },
  });
  return RecoilApolloComponent;
})();

RecoilApollo.defaultProps = { children: null };

RecoilApollo.propTypes = {
  client: PropTypes.oneOfType([
    PropTypes.shape({
      then: PropTypes.func.isRequired,
      catch: PropTypes.func.isRequired,
      finally: PropTypes.func.isRequired,
      [Symbol.toStringTag]: PropTypes.string.isRequired,
    }),
    PropTypes.instanceOf(ApolloClient),
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node.isRequired,
  ]),
};

export default RecoilApollo;
