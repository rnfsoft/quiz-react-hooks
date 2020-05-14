import React from "react";

const Progress = (props) => {
  return (
    <div>
      <h2>
        Quesiton {props.current} of {props.total}
      </h2>
    </div>
  );
};

export default Progress;
