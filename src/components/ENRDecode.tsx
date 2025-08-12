import {ENR} from "@chainsafe/enr";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import toast from "react-hot-toast";

import ENRDerivedFields from "./ENRDerivedFields";
import ENRFields from "./ENRFields";

// const initialEnrString = "enr:-Mq4QL9et8Sxj48Lv4xUConiamSJ7MNKdnbjnUdqkr342kRtDsqnuOJ57xrYNjRxSMnyp5S7JLiKiySL6yLcZ1HMwo6GAZamqfBHh2F0dG5ldHOIYAAAAAAAAACEZXRoMpBU8t3jYAAAOP__________gmlkgnY0gmlwhF4VGsuEcXVpY4KA6IlzZWNwMjU2azGhA2rSAkViWUqgxvtIn44xq3onNAjgG68SRXTv1nmKpUsZiHN5bmNuZXRzAIN0Y3CCgOiDdWRwgoDp";

export default function ENRDecode(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [enrString, setEnrString] = useState<string>(searchParams.get("q") ?? "");
  const [decoded, setDecoded] = useState<ENR | undefined>(undefined);

  // biome-ignore lint/correctness/useExhaustiveDependencies: only trigger decode on initial load
  useEffect(() => {
    if (enrString) {
      decode();
    }
  }, []);

  function handleError(errorMessage: string): void {
    toast.error(errorMessage);
  }

  function onUploadFile(file: Blob): void {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        setEnrString(e.target.result.replace(/^"*|"*$/g, ""));
      }
    };
    reader.onerror = () => {
      handleError("Upload error");
    };
  }
  function decode(): void {
    try {
      const decoded = ENR.decodeTxt(enrString.trim());
      console.log("decoded: ", decoded);
      setSearchParams({ q: enrString });
      setDecoded(decoded);
    } catch (e) {
      handleError((e as Error).message);
    }
  }

  return (
    <div className="section" style={{flex: 1}}>
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="column">
              <div>Upload a file to populate field below (optional)</div>
              <input type="file" onChange={(e) => e.target.files?.[0] && onUploadFile(e.target.files[0])} />
            </div>
            <div className="column">
              <div className="subtitle is-4">ENR To Decode</div>
              <textarea
                value={enrString || ""}
                onChange={(e) => setEnrString(e.target.value)}
                className="textarea"
                rows={5}
              />
              <br />
              <button
                type="button"
                className="button is-primary is-fullwidth"
                disabled={!enrString}
                onClick={() => decode()}
              >
                Decode
              </button>
            </div>
          </div>
          <div className="column enr-output">
            <div className="subtitle is-4">Decoded ENR</div>
            {decoded && <ENRFields enr={decoded} />}
            {decoded && (
              <>
                <div className="subtitle is-4">Derived Fields</div>
                <ENRDerivedFields enr={decoded} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
