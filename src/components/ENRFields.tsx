import type {ENR} from "@chainsafe/enr";
import React from "react";
import {toString as uToString} from "uint8arrays";

import NamedOutput from "./NamedOutput";

function toHexString(value: Uint8Array): string {
  return `0x${uToString(value, "hex")}`;
}

type DisplayValue = string | number;

function getDisplayValue(enr: ENR, key: string, value: Uint8Array): DisplayValue {
  if (key === "id") {
    return uToString(value);
  }

  if (key === "secp256k1") {
    return toHexString(enr.publicKey);
  }

  if (["ip", "tcp", "udp", "quic", "ip6", "tcp6", "udp6", "quic6"].includes(key)) {
    const field = enr[key as "ip" | "tcp" | "udp" | "quic"];
    if (!field) {
      throw new Error("Field not found.");
    }
    return field;
  }

  // default to assuming binary data
  return toHexString(value);
}

export default function ENRFields({enr}: {enr: ENR}): JSX.Element {
  const fields = Array.from(enr.kvs.entries()).map(([k, v]) => ({
    key: k,
    value: getDisplayValue(enr, k, v),
  }));
  fields.unshift({key: "signature", value: toHexString(enr.signature)}, {key: "seq", value: enr.seq.toString()});
  return (
    <>
      {fields.map((f) => (
        <NamedOutput key={f.key} name={f.key} value={f.value} />
      ))}
    </>
  );
}
