/* eslint-disable max-len, react/display-name */
import * as React from "react";

import pkg from "../../package.json";

export default function(): JSX.Element {
  return (
    <footer className='footer'>
      <div className='content has-text-centered'>
        Made with ❤️ by <a className='is-link has-text-danger is-family-code' href='https://chainsafe.io'>ChainSafe Systems</a><br/>
        and <a className='is-link has-text-danger is-family-code' href='https://github.com/ChainSafe/enr-app/graphs/contributors'>ETH 2.0 friends</a>
      </div>
      <div className='content has-text-centered is-small is-family-code'>
        <div>
          <a className='is-link has-text-grey'
            href='https://www.npmjs.com/package/@chainsafe/discv5'>
            @chainsafe/discv5 {pkg.dependencies["@chainsafe/discv5"]}
          </a>
        </div>
      </div>
    </footer>
  );
}
