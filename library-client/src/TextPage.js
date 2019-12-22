import React from "react";
import { useParams } from "react-router-dom";

export default function TextPage(props) {
  return <plaintext>{props.text}</plaintext>;
}
