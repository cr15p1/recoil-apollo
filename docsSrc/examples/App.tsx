// App.tsx
import React, { FC } from "react";
import { RecoilRoot } from "recoil";
import RecoilApollo from "recoil-apollo";

import Index from "./Index";
import apolloClient from "./lib/apolloClient";

const App: FC = () => (
  <RecoilRoot>
    <RecoilApollo client={apolloClient}>
      <Index />
    </RecoilApollo>
  </RecoilRoot>
);

export default App;
