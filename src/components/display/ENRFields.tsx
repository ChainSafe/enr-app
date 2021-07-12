import React from "react";
import {toHexString} from "@chainsafe/ssz";
import {ENR} from "@chainsafe/discv5";

import NamedOutput from "./NamedOutput";

type DisplayValue = string | number;

function getDisplayValue(enr: ENR, key: string, value: Uint8Array): DisplayValue {
  if (key === "id") {
    return value.toString();
  } else if (key === "secp256k1") {
    return toHexString(enr.publicKey);
  } else if (["ip", "tcp", "udp", "ip6", "tcp6", "udp6"].includes(key)) {
    const field = enr[key as "ip" | "tcp" | "udp"];
    if (!field) {
      throw new Error("Field not found.");
    }
    return field;
  } else {
    // default to assuming binary data
    return toHexString(value);
  }
}

export default function ENRFields({enr}: {enr: ENR}): JSX.Element {
  const fields = Array.from(enr.entries())
    .map(([k, v]) => ({
      key: k,
      value: getDisplayValue(enr, k, v),
    }));
  if (!enr.signature) {
    throw new Error("Enr signature not found.");
  }
  fields.unshift({key: "signature", value: toHexString(enr.signature)}, {key: "seq", value: enr.seq.toString()});
  return (
    <>
      {
        fields.map(f => <NamedOutput key={f.key} name={f.key} value={f.value} />)
      }
    </>
  );
}


