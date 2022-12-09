/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react/jsx-props-no-spreading */
import { ApolloClient } from "@apollo/client";
import graphQLQueryEffect from "./graphQLQueryEffect";
import mockApolloQueryResult from "./mocks/mockApolloQueryResult";
import mockGraphQLQueryEffectOptions from "./mocks/mockGraphQLQueryEffectOptions";
import mockRecoilAtomEffectParam from "./mocks/mockRecoilAtomEffectParam";
import RecoilApollo from "./RecoilApollo";

jest.mock("@apollo/client");
jest.mock("./RecoilApollo");

describe("graphQLQueryEffect()", () => {
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

  it("should resolve the setSelf promise once when the value from the setSelf effect is a callback", (done) => {
    mockedApolloClient.query.mockResolvedValue(mockApolloQueryResult());

    const queryEffect = graphQLQueryEffect(
      mockGraphQLQueryEffectOptions({
        effect: ({ setSelf }) => {
          setSelf("foo");
        },
      })
    );
    const spy = jest.fn();
    queryEffect(mockRecoilAtomEffectParam({ setSelf: spy }));

    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith("foo");
      done();
    });
  });

  it("should skip all statements when skip is defined and returns true", (done) => {
    const skipSpy = jest.fn().mockReturnValue(true);

    const queryEffect = graphQLQueryEffect(
      mockGraphQLQueryEffectOptions({
        skip: skipSpy,
      })
    );
    queryEffect(mockRecoilAtomEffectParam());

    expect(skipSpy).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(mockedApolloClient.query).not.toHaveBeenCalled();
      done();
    });
  });

  it("should resolve the setSelf promise once when the value from the setSelf effect is a promise", (done) => {
    mockedApolloClient.query.mockResolvedValue(mockApolloQueryResult());

    const spy = jest.fn();

    const queryEffect = graphQLQueryEffect(
      mockGraphQLQueryEffectOptions({
        effect: ({ setSelf }) => setSelf(Promise.resolve("foo")),
      })
    );
    queryEffect(mockRecoilAtomEffectParam({ setSelf: spy }));

    setTimeout(() => {
      expect(spy.mock.calls[0][0]).resolves.toEqual("foo");
      done();
    });
  });

  it("should query from backend when the effect initial runs", (done) => {
    mockedApolloClient.query.mockResolvedValue(
      mockApolloQueryResult({ data: "foo" })
    );

    const options = mockGraphQLQueryEffectOptions();
    const effect = graphQLQueryEffect(mockGraphQLQueryEffectOptions(options));
    effect(mockRecoilAtomEffectParam());

    setTimeout(() => {
      expect(mockedApolloClient.query).toHaveBeenCalled();
      done();
    });
  });

  it("should query from backend when the effect initial runs 1", (done) => {
    const errorToThrow = new Error("Async error message");
    mockedApolloClient.query.mockRejectedValue(errorToThrow);

    const effect = graphQLQueryEffect(
      mockGraphQLQueryEffectOptions({
        effect: ({ setSelf, error }) => {
          setSelf(error);
        },
      })
    );

    const spy = jest.fn();
    effect(mockRecoilAtomEffectParam({ setSelf: spy }));
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(errorToThrow);
      done();
    });
  });

  it("should refetch the query when the recoil state is reset", () => {
    mockedApolloClient.query.mockResolvedValue(mockApolloQueryResult());

    const effect = graphQLQueryEffect(mockGraphQLQueryEffectOptions());

    let callback: (...args: any[]) => void;

    effect(
      mockRecoilAtomEffectParam({
        onSet: (cb: (...args: any[]) => void) => {
          callback = cb;
        },
      })
    );

    setTimeout(() => {
      expect(mockedApolloClient.query).toHaveBeenCalledTimes(1);
      callback!(undefined, undefined, true);
      expect(mockedApolloClient.query).toHaveBeenCalledTimes(2);
    });
  });
  /*
  

  describe("graphQLSubscriptionEffect()", () => {
    it("should call effect() with the values from the fetchResult when the subscription is executed", () => {
      mockedApolloClient.subscribe.mockReturnValue({
        subscribe: (cb: (fetchResult: FetchResult) => void) => {
          cb(mockApolloFetchResult({ data: "foo" as any }));
        },
      } as any);

      const effectSpy = jest.fn();

      const subscriptionEffect = graphQLSubscriptionEffect(
        mockGraphQLSubscriptionEffectOptions({ effect: effectSpy })
      );
      subscriptionEffect(mockRecoilAtomEffectParam());

      expect(effectSpy).toHaveBeenCalledWith(
        expect.objectContaining({ response: { data: "foo" } })
      );
    });
  }); */
});
