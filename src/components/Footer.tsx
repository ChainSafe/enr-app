import * as React from "react";

import pkg from "../../package.json";

export default function (): JSX.Element {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        &copy;{" "}
        <a className="is-link has-text-danger is-family-code" href="https://chainsafe.io">
          ChainSafe Systems
        </a>
        <br />
      </div>
      <div className="content has-text-centered is-small is-family-code">
        <div>
          <a className="is-link has-text-grey" href="https://www.npmjs.com/package/@chainsafe/enr">
            @chainsafe/enr {pkg.dependencies["@chainsafe/enr"]}
          </a>
        </div>
      </div>
    </footer>
  );
}
