import type {ENR} from "@chainsafe/enr";
import {useEffect, useState} from "react";
import FieldRow from "./FieldRow";

type DisplayValue = string | number;

async function getDerivedKVs(enr: ENR): Promise<{key: string; value: DisplayValue}[]> {
  const kvs: {key: string; value: DisplayValue}[] = [];
  kvs.push({key: "node id", value: enr.nodeId});
  kvs.push({key: "peer id", value: enr.peerId.toString()});
  const muTypes = ["tcp4", "tcp6", "udp4", "udp6", "quic4", "quic6"] as const;
  for (const muType of muTypes) {
    const mu = await enr.getFullMultiaddr(muType);
    if (mu) {
      kvs.push({key: `${muType} multiaddr`, value: mu.toString()});
    }
  }
  return kvs;
}

export default function ENRDerivedFields({enr}: {enr: ENR}) {
  const [fields, setFields] = useState<{key: string; value: DisplayValue}[] | null>(null);

  useEffect(() => {
    getDerivedKVs(enr).then(setFields);
  }, [enr]);

  if (!fields) {
    return <div className="py-4 text-center text-text-muted text-sm font-mono">Computing derived fields...</div>;
  }

  return (
    <div>
      {fields.map((f, i) => (
        <FieldRow key={f.key} label={f.key} value={f.value} index={i} />
      ))}
    </div>
  );
}
