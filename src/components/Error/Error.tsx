import React from "react";

interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return <div className="error">{error}</div>;
};

export default Error;
