import React from "react";

export default function TextPage(props) {
  return (
    <plaintext
      style={{ whiteSpace: "normal", minHeight: "600px", textAlign: "justify" }}
    >
      {props.text}
    </plaintext>
  );
}
