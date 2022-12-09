/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloClient } from "@apollo/client";
import graphQLMutationEffect from "./graphQLMutationEffect";
import mockApolloQueryResult from "./mocks/mockApolloQueryResult";
import mockGraphQLMutationEffectOptions from "./mocks/mockGraphQLMutationEffectOptions";
import RecoilApollo from "./RecoilApollo";

import mockRecoilAtomEffectParam from "./mocks/mockRecoilAtomEffectParam";

jest.mock("@apollo/client");
jest.mock("./RecoilApollo");

describe("graphqlMutationEffect()", () => {
  const MockedApolloClient = ApolloClient as jest.MockedClass<
    new () => ApolloClient<any>
  >;
  let mockedApolloClient: jest.MockedObjectDeep<ApolloClient<any>>;

  beforeEach(() => {
    mockedApolloClient = new MockedApolloClient() as jest.MockedObjectDeep<
      ApolloClient<any>
    >;
    RecoilApollo.client = Promise.resolve(mockedApolloClient);
  });

  it("should trigger the mutation when the recoil value is set", (done) => {
    mockedApolloClient.mutate.mockResolvedValue(mockApolloQueryResult());
    const mutationEffect = graphQLMutationEffect(
      mockGraphQLMutationEffectOptions({ mutation: "foo" as any })
    );

    mutationEffect(
      mockRecoilAtomEffectParam({
        onSet: (cb) => cb("foo", "bar", false),
      })
    );

    setTimeout(() => {
      expect(mockedApolloClient.mutate.mock.calls[0][0]).toEqual({
        mutation: "foo",
        variables: undefined,
      });
      done();
    });
  });

  it("should trigger the mutation when when() returns true", (done) => {
    mockedApolloClient.mutate.mockResolvedValue(mockApolloQueryResult());
    const mutationEffect = graphQLMutationEffect(
      mockGraphQLMutationEffectOptions({
        when: () => true,
      })
    );

    mutationEffect(
      mockRecoilAtomEffectParam({
        onSet: (cb) => cb("foo", "bar", false),
      })
    );

    setTimeout(() => {
      expect(mockedApolloClient.mutate).toHaveBeenCalled();
      done();
    });
  });

  it("should call the effect after a mutation", (done) => {
    mockedApolloClient.mutate.mockResolvedValue(mockApolloQueryResult());
    const effectSpy = jest.fn();
    const mutationEffect = graphQLMutationEffect(
      mockGraphQLMutationEffectOptions({
        when: () => true,
        effect: effectSpy,
      })
    );

    mutationEffect(
      mockRecoilAtomEffectParam({
        onSet: (cb) => cb("foo", "bar", false),
      })
    );

    setTimeout(() => {
      expect(effectSpy).toHaveBeenCalled();
      done();
    });
  });

  it("should not trigger the mutation when when() returns false", () => {
    mockedApolloClient.mutate.mockResolvedValue(mockApolloQueryResult());
    const mutationEffect = graphQLMutationEffect(
      mockGraphQLMutationEffectOptions({
        mutation: "foo" as any,
        when: () => false,
      })
    );

    mutationEffect(
      mockRecoilAtomEffectParam({
        onSet: (cb) => cb("foo", "bar", false),
      })
    );

    expect(mockedApolloClient.mutate).not.toHaveBeenCalled();
  });

  it("should trigger the mutation when when() returns true", (done) => {
    mockedApolloClient.mutate.mockResolvedValue(mockApolloQueryResult());
    const mutationEffect = graphQLMutationEffect(
      mockGraphQLMutationEffectOptions({
        mutation: "foo" as any,
        when: () => true,
      })
    );

    mutationEffect(
      mockRecoilAtomEffectParam({
        onSet: (cb) => cb("foo", "bar", false),
      })
    );

    setTimeout(() => {
      expect(mockedApolloClient.mutate).toHaveBeenCalledTimes(1);
      expect(mockedApolloClient.mutate).toHaveBeenCalledWith({
        mutation: "foo",
        variables: undefined,
      });
      done();
    });
  });
});
