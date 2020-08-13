import React from "react";
import {ENR} from "@chainsafe/discv5/lib/enr";
import {withAlert} from "react-alert";
import NamedOutput from "./display/NamedOutput";
import {toHexString} from "@chainsafe/ssz";

type Props = {
  alert: {error: Function};
};

type State = {
  enrString: string;
  decoded: ENR | undefined;
};

class ENRDecode extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      enrString: "",
      // enrString: "enr:-Ku4QJsxkOibTc9FXfBWYmcdMAGwH4bnOOFb4BlTHfMdx_f0WN-u4IUqZcQVP9iuEyoxipFs7-Qd_rH_0HfyOQitc7IBh2F0dG5ldHOIAAAAAAAAAACEZXRoMpD1pf1CAAAAAP__________gmlkgnY0gmlwhLAJM9iJc2VjcDI1NmsxoQL2RyM26TKZzqnUsyycHQB4jnyg6Wi79rwLXtaZXty06YN1ZHCCW8w",
      decoded: undefined,
    };
  }

  decode() {
    try {
      const {enrString} = this.state;
      const decoded = ENR.decodeTxt(enrString);
      console.log('decoded: ', decoded);
      this.setState({decoded});
    } catch(e) {
      this.handleError(e.message);
    }
  }

  handleError(errorMessage: string): void {
    this.props.alert.error(errorMessage);
  }

  setInput(enrString: string) {
    this.setState({enrString});
  }

  onUploadFile(file: Blob): void {
    if (file) {
      const reader = new FileReader();
      const handleError = this.handleError.bind(this);
      reader.readAsText(file);
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          this.setState({enrString: e.target.result.replace(/^\""*|\""*$/g,"")});
        }
      };
      reader.onerror = (e) => {
        handleError(e.message);
      };
    }
  }

  getDecodedElement(name: string, value) {
    const {decoded} = this.state;

    if (decoded) {
      let decodedValue;
      if (name === 'attnets') {
        decodedValue = toHexString(decoded.get('attnets'));
      } else if (name === 'eth2') {
        decodedValue = toHexString(decoded.get('eth2'));
      } else if (name === 'id') {
        decodedValue = value;
      } else if (name === 'secp256k1') {
        decodedValue = toHexString(decoded.publicKey);
      } else if (name === 'ip') {
        decodedValue = decoded.ip;
      } else if (name === 'tcp') {
        decodedValue = decoded.tcp;
      } else if (name === 'udp') {
        decodedValue = decoded.udp;
      } else if (name === 'ip6') {
        decodedValue = decoded.ip6;
      } else if (name === 'tcp6') {
        decodedValue = decoded.tcp6;
      } else if (name === 'udp6') {
        decodedValue = decoded.udp6;
      } else {
        // decodedValue = decode.decode(i);
      }
      return (<NamedOutput name={name} value={decodedValue} />);
    }
  }

  render() {
    const {decoded, enrString} = this.state;

    const decodedItems: JSX.Element[] = [];
    console.log(decoded);
    if (decoded) {
      const decoder = new TextDecoder("utf-8");
      decodedItems.push(<NamedOutput name={'signature'} value={toHexString(decoded.signature)} />);
      decodedItems.push(<NamedOutput name={'seq'} value={decoded.seq.toString()} />);
      decoded.forEach((i: Uint8Array, k: string) => {
        decodedItems.push(this.getDecodedElement(k, i));
      });
    }

    return (
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="column">
                <div>Upload a file to populate field below (optional)</div>
                <input
                  type="file"
                  onChange={(e) => e.target.files && this.onUploadFile(e.target.files[0])}
                />
              </div>
              <div className="column">
                <div className="subtitle is-4">
                  ENR To Decode
                </div>
                <textarea
                  value={enrString || ""}
                  onChange={(e) => this.setInput(e.target.value)}
                  className="textarea"
                  rows={5}
                />
                <br />
                <button
                  disabled={!enrString}
                  onClick={() => this.decode()}
                >Decode</button>
              </div>
            </div>
            <div className="column enr-output">
              <div className="subtitle is-5">Decoded ENR</div>
              {decodedItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(ENRDecode);
