import React from "react";

const ResultOutput = ({ result }) => {
  if (!result) return null;

  return (
    <div className="result">
      {result.status === "success" ? (
        <pre>Output: {result.output}</pre>
      ) : (
        <p style={{ color: "red" }}>{result.error}</p>
      )}
    </div>
  );
};

export default ResultOutput;
