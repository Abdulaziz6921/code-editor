import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";
import ResultOutput from "./components/ResultOutput";
import "./App.css";

const App = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  const handleRun = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });

      const data = await response.json();
      // console.log(data);
      setResult(data); // Setting the response data to display the result
    } catch (error) {
      setResult({ status: "error", error: "Failed to connect to the server" });
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>Online Code Editor</h1>
      <p>
        Choose a programming language, write your code, and see the results
        below.
      </p>
      <div className="select-run-container">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <button onClick={handleRun}>Run</button>
      </div>
      <CodeEditor language={language} code={code} setCode={setCode} />
      <ResultOutput result={result} />
    </div>
  );
};

export default App;
