import React from "react";

const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
    </select>
  );
};

export default LanguageSelector;
