import React from "react";
import {AlertManager, withAlert} from "react-alert";
import {ENR} from "@chainsafe/discv5/lib/enr";

import ENRFields from "./display/ENRFields";

type Props = {
  alert: AlertManager;
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
      // eslint-disable-next-line max-len
      // enrString: "enr:-Ku4QJsxkOibTc9FXfBWYmcdMAGwH4bnOOFb4BlTHfMdx_f0WN-u4IUqZcQVP9iuEyoxipFs7-Qd_rH_0HfyOQitc7IBh2F0dG5ldHOIAAAAAAAAAACEZXRoMpD1pf1CAAAAAP__________gmlkgnY0gmlwhLAJM9iJc2VjcDI1NmsxoQL2RyM26TKZzqnUsyycHQB4jnyg6Wi79rwLXtaZXty06YN1ZHCCW8w",
      decoded: undefined,
    };
  }

  decode(): void {
    try {
      const {enrString} = this.state;
      const decoded = ENR.decodeTxt(enrString);
      // eslint-disable-next-line no-console
      console.log("decoded: ", decoded);
      this.setState({decoded});
    } catch(e) {
      this.handleError(e.message);
    }
  }

  handleError(errorMessage: string): void {
    this.props.alert.error(errorMessage);
  }

  setInput(enrString: string): void {
    this.setState({enrString});
  }

  onUploadFile(file: Blob): void {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        this.setState({enrString: e.target.result.replace(/^"*|"*$/g,"")});
      }
    };
    reader.onerror = () => {
      this.handleError("Upload error");
    };
  }

  render(): JSX.Element {
    const {decoded, enrString} = this.state;

    return (
      <div className="section" style={{flex: 1}}>
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="column">
                <div>Upload a file to populate field below (optional)</div>
                <input
                  type="file"
                  onChange={(e) => e.target.files && e.target.files[0] && this.onUploadFile(e.target.files[0])}
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
                  className="button is-primary is-fullwidth"
                  disabled={!enrString}
                  onClick={() => this.decode()}>
                Decode
                </button>
              </div>
            </div>
            <div className="column enr-output">
              <div className="subtitle is-5">Decoded ENR</div>
              {
                decoded && <ENRFields enr={decoded} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(ENRDecode);
