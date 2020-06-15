import React from "react";
import {ENR} from "@chainsafe/discv5/lib/enr";
import {withAlert} from "react-alert";
import NamedOutput from "./display/NamedOutput";

type Props = {
  alert: {error: Function};
};

type State = {
  enrString: string;
  decoded: object | undefined;
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
          this.setState({enrString: e.target.result});
        }
      };
      reader.onerror = (e) => {
        handleError(e.message);
      };
    }
  }

  render() {
    const {decoded, enrString} = this.state;

    const decodedItems: JSX.Element[] = [];
    console.log(decoded);
    if (decoded) {
      decodedItems.push(<NamedOutput name="Signature" value={decoded && decoded.signature} />);
      const decoder = new TextDecoder("utf-8");
      decoded.forEach((i: Uint8Array, k: string) => {
        decodedItems.push(
          <NamedOutput name={k} value={decoder.decode(i)} />
        );
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
                  accept=".json"
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
