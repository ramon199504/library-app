import React from "react";
import { Link } from "react-router-dom";

export default function BookLabel(props) {
  return (
    <li>
      <Link to={`/view/${props.id}/1`}>{props.name}</Link>
    </li>
  );
}
