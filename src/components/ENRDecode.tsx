import React from "react";
const { ENR } = require("@chainsafe/discv5/lib/enr");

type Props = {};
type State = {};

export default class ENRDecode extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('ENR: ', ENR);
    return <></>;
  }
}
