import React from 'react';
import {FaSpinner} from "react-icons/fa";

export default function Spinner (props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <span {...props}>
      <FaSpinner className="icon-loading"/>
    </span>
  );
}