# [recoil-apollo](https://cr15p1.github.io)

recoil-apollo is a tool to modify a recoil state using the apollo client based on graphql queries, mutations and subscriptions.

## Setup

### Install

```sh
# yarn
yarn add recoil-apollo
# npm
npm install recoil-apollo

```

### Connect

<!---{{"code":{"file":"examples/App.tsx","language":"ts"}}}--->

## Usage

### types

<!---{{"code":{"file":"examples/types.ts","language":"ts"}}}--->

### Query

<!---{{"code":{"file":"../src/graphQLQueryEffect.types.ts", "language":"ts", "removeImports":true}}}--->

<!---{{"code":{"file":"examples/recoil/queryMessageIds.ts","language":"ts"}}}--->

### Mutation

<!---{{"code":{"file":"../src/graphQLMutationEffect.types.ts", "language":"ts", "removeImports":true}}}--->

<!---{{"code":{"file":"examples/recoil/createMessage.ts","language":"ts"}}}--->

### Subscription

<!---{{"code":{"file":"../src/graphQLSubscriptionEffect.types.ts", "language":"ts", "removeImports":true}}}--->

<!---{{"code":{"file":"examples/recoil/subscribeMessageIds.ts","language":"ts"}}}--->
