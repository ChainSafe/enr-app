import type {ENR} from "@chainsafe/enr";
import {toString as uToString} from "uint8arrays";
import FieldRow from "./FieldRow";

function toHexString(value: Uint8Array): string {
  return `0x${uToString(value, "hex")}`;
}

type DisplayValue = string | number;

function formatNestedArray(value: unknown[]): string {
  return JSON.stringify(
    value.map((item) => {
      if (item instanceof Uint8Array) return toHexString(item);
      if (Array.isArray(item)) return formatNestedArray(item);
      return String(item);
    })
  );
}

function getDisplayValue(enr: ENR, key: string, value: Uint8Array | Uint8Array[]): DisplayValue {
  if (key === "id") {
    return uToString(value as Uint8Array);
  }
  if (key === "secp256k1") {
    return toHexString(enr.publicKey);
  }
  if (["ip", "tcp", "udp", "quic", "ip6", "tcp6", "udp6", "quic6"].includes(key)) {
    const field = enr[key as "ip" | "tcp" | "udp" | "quic"];
    if (field == null) {
      throw new Error("Field not found.");
    }
    return field;
  }
  if (Array.isArray(value)) {
    return formatNestedArray(value);
  }
  return toHexString(value);
}

export default function ENRFields({enr}: {enr: ENR}) {
  const fields = Array.from(enr.kvs.entries()).map(([k, v]) => ({
    key: k,
    value: getDisplayValue(enr, k, v),
  }));
  fields.unshift({key: "signature", value: toHexString(enr.signature)}, {key: "seq", value: enr.seq.toString()});

  return (
    <div>
      {fields.map((f, i) => (
        <FieldRow key={f.key} label={f.key} value={f.value} index={i} />
      ))}
    </div>
  );
}
