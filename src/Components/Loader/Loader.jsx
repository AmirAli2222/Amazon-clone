import React from 'react'
import { ClockLoader } from "react-spinners";
function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <ClockLoader color="#febd69" />
    </div>
  );
}

export default Loader