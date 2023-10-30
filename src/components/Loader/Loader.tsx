import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="container">
      <svg className="circle-svg" height="200" width="200">
        <circle cx="100" cy="100" r="30"></circle>
      </svg>
    </div>
  );
};

export default Loader;
