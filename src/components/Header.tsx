/* eslint-disable max-len, react/display-name */
import * as React from "react";

export default function(): JSX.Element {
  return (
    <div className='section'>
      <div className='container'>
        <h1 className='title is-family-code'>
          ENR Viewer
        </h1>
        <p className='subtitle'>
          View ENRs (Ethereum Node Records) (<a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-778.md">EIP-778</a>)
        </p>
      </div>
    </div>
  );
}
