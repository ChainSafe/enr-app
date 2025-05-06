import * as React from "react";

type Props = {
  name: string | undefined;
  value: string | number | undefined;
  textarea?: boolean;
};

export default function NamedOuput({name, value, textarea}: Props): JSX.Element {
  return (
    <div className="field has-addons">
      <div className="control">
        <button type="button" className="button is-static">
          {name}
        </button>
      </div>
      <div className="control is-expanded">
        {textarea ? (
          <textarea className="input" readOnly={true} value={value || ""} />
        ) : (
          <input className="input" type="text" readOnly={true} value={value || ""} />
        )}
      </div>
    </div>
  );
}
